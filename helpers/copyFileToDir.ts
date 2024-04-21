import { copyFileSync } from "fs";
import { resolve } from 'path';

export const copyFileToDir = async (src: string, dest: string): Promise<void> => {
    try {
        copyFileSync(src, dest);
    } catch (error) {
        console.log({ error });
        process.exit(1)
    }
};

export const resolvePath = (...paths: string[]) => {
    try {
        return resolve(...paths);
    } catch {
        process.exit(1)
    }
}