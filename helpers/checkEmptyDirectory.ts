import { lstatSync, existsSync } from 'fs';

export const checkDirectoryExistsAndEmpty = (root: string): boolean => {
    try {
        if (!existsSync(root)) {}
        if (!lstatSync(root).isDirectory()) {}

        return true;
    } catch (error) {
        return false;
    }
}