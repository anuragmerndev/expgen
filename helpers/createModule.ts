import { readdirSync, lstatSync } from 'fs';

import { copyFileToDir, resolvePath } from "./copyFileToDir.js";
import { upsertCreateDirectory } from "./upsertCreateDirectory.js";

export const createModule = (folder: string, dest: string) => {
    try {
        const allFilesInDir = readdirSync(folder);
        allFilesInDir.forEach((file) => {
            if (lstatSync(resolvePath(folder, file)).isDirectory()) {
                upsertCreateDirectory(resolvePath(dest, file))
                return createModule(resolvePath(folder, file), resolvePath(dest, file))
            } else {
                copyFileToDir(resolvePath(folder, file), resolvePath(dest, file));
            }
        })
        return;
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}