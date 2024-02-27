import { lstatSync, existsSync } from "fs";

export const checkDirectoryExistsAndEmpty = (root: string): boolean => {
	try {
		if (existsSync(root)) {
			if (lstatSync(root).isDirectory()) {
				throw new Error("Directory name conflict ! Kindly provide another folder name");
			}
		}
		return true;
	} catch (error) {
		return false;
	}
};