import fs from 'fs-extra';
import { execSync } from 'node:child_process'


import { upsertCreateDirectory } from "./upsertCreateDirectory.js";
import { copyFileToDir, resolvePath } from "./copyFileToDir.js";
import { createModule } from "./createModule.js";
import { StructureOptions } from "./getUserPreference.js";

export async function createProjectTemplate(currentDir: string, userPef: StructureOptions, projectDir: string): Promise<void> {
    try {
        const fixedFolders = ['controllers', 'middlewares', 'routes', 'utils', 'validators', "logging"];
        fixedFolders.forEach((folder) => {
            fs.copySync(resolvePath(currentDir, 'template', folder), resolvePath(projectDir, 'src', folder))
        })
        createModule(resolvePath(currentDir, 'template', 'main'), resolvePath(projectDir, "src"));

        const variable = ['docker', 'eslint', 'hooks']

        for (const [key, value] of Object.entries(userPef)) {
            if (value && variable.includes(key)) {
                createModule(resolvePath(currentDir, 'template', "extras", key), resolvePath(projectDir))
            }
        }

        createModule(resolvePath(currentDir, 'template', "extras", 'root'), resolvePath(projectDir))
        copyFileToDir(resolvePath(currentDir, 'template', "extras", 'gitignore'), resolvePath(projectDir, '.gitignore'))

        upsertCreateDirectory(resolvePath(projectDir, 'src', 'services'))
        
        if (userPef.db === 'sql') {
            upsertCreateDirectory(resolvePath(projectDir, 'prisma'))
            copyFileToDir(resolvePath(currentDir, 'template', "db", 'sql.ts'), resolvePath(projectDir, 'prisma', 'schema.prisma'))
            copyFileToDir(resolvePath(currentDir, 'template', "db", 'db.ts'), resolvePath(projectDir, 'prisma', 'index.ts'))
            
            copyFileToDir(resolvePath(currentDir, 'template', "services", "sql", 'user.services.ts'), resolvePath(projectDir, 'src', "services", 'user.services.ts'))
        }
        
        if (userPef.db === 'nosql') {
            copyFileToDir(resolvePath(currentDir, 'template', "services", "nosql", 'user.services.ts'), resolvePath(projectDir, 'src', "services", 'user.services.ts'))
            
            upsertCreateDirectory(resolvePath(projectDir, 'src', 'config'))
            copyFileToDir(resolvePath(currentDir, 'template', "db", 'nosql.ts'), resolvePath(projectDir, 'src', 'config', 'db.ts'))

            fs.copySync(resolvePath(currentDir, 'template', 'models'), resolvePath(projectDir, 'src', 'models'))
            fs.copySync(resolvePath(currentDir, 'template', 'types'), resolvePath(projectDir, 'src', 'types'))
        }

        if (userPef.git) {
            console.log('initializing git');
            execSync(`cd ${projectDir} && git init`);
        }

    } catch (err) {
        console.log(err);

        process.exit(1);
    }
}