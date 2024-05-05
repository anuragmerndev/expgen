import { existsSync, mkdirSync } from "fs";
import { resolvePath } from "./copyFileToDir.js";

export const upsertCreateDirectory = async (...projectPath: string[]): Promise<void> => {
    try {
        const projectDir = resolvePath(...projectPath);
        if (!existsSync(projectDir)) {
            mkdirSync(projectDir);
        } else {}
        return;
    } catch (err) {
        console.log({ err });
        process.exit(1)
    }
};