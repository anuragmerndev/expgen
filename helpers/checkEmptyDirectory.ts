import { lstatSync, existsSync, promises } from "fs";

export const checkDirectoryExistsAndEmpty = async (root: string): Promise<boolean> => {
	try {
		if (existsSync(root)) {
			const emptyDir = await isDirEmpty(root);
			if (lstatSync(root).isDirectory() && !emptyDir) {
				return true;
			}
		}
		return false;
	} catch (error) {
		return true;
	}
};


async function isDirEmpty(root: string) {
	const files = await promises.readdir(root);
	return files.length === 0;
}