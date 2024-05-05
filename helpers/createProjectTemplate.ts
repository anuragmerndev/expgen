import fs from 'fs-extra';
import { execSync } from 'node:child_process'


import { upsertCreateDirectory } from "./upsertCreateDirectory.js";
import { copyFileToDir, resolvePath } from "./copyFileToDir.js";
import { createModule } from "./createModule.js";
import { StructureOptions } from "./getUserPreference.js";
import { constantData } from './constants.js';

export async function createProjectTemplate(currentDir: string, userPef: StructureOptions, projectDir: string): Promise<void> {
    try {
        constantData.fixedFolders.forEach((folder) => {
            fs.copySync(resolvePath(currentDir, constantData.template, folder), resolvePath(projectDir, constantData.src, folder))
        })
        createModule(resolvePath(currentDir, ...constantData.mainFolders), resolvePath(projectDir, constantData.src));


        for (const [key, value] of Object.entries(userPef)) {
            if (value && constantData.variableFolders.includes(key)) {
                createModule(resolvePath(currentDir, ...constantData.variableArgs, key), resolvePath(projectDir))
            }
        }

        createModule(resolvePath(currentDir, ...constantData.variableArgs, constantData.root), resolvePath(projectDir))
        copyFileToDir(resolvePath(currentDir, ...constantData.variableArgs, constantData.gitignore), resolvePath(projectDir, `.${constantData.gitignore}`))

        upsertCreateDirectory(resolvePath(projectDir, constantData.src, constantData.services))

        if (userPef.db === constantData.sql.db) {
            upsertCreateDirectory(resolvePath(projectDir, ...constantData.sql.root))

            for (let i = 0; i < constantData.sql.copyDir.length; i++) {
                const element = constantData.sql.copyDir[i];
                copyFileToDir(resolvePath(currentDir, ...element.source), resolvePath(projectDir, ...element.destination));

            }
        }

        if (userPef.db === constantData.nosql.db) {
            upsertCreateDirectory(resolvePath(projectDir, ...constantData.nosql.root))

            for (let i = 0; i < constantData.nosql.copyDir.length; i++) {
                const element = constantData.nosql.copyDir[i];
                copyFileToDir(resolvePath(currentDir, ...element.source), resolvePath(projectDir, ...element.destination));
            }

            for (let i = 0; i < constantData.nosql.copyFiles.length; i++) {
                const element = constantData.nosql.copyFiles[i];
                fs.copySync(resolvePath(currentDir, ...element.source), resolvePath(projectDir, ...element.destination))
            }
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