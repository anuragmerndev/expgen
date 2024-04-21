import { Command, OptionValues } from "commander";
import inquirer from "inquirer";
import path from "node:path";
import { fileURLToPath } from "node:url";
import validateName from 'validate-npm-package-name';

import packageJSON from "./package.json" with {type: "json"};
import { checkDirectoryExistsAndEmpty } from "./helpers/checkEmptyDirectory.js";
import { getUserPreference } from "./helpers/getUserPreference.js";
import { createProjectTemplate } from "./helpers/createProjectTemplate.js";
import { creatingPackages } from "./helpers/creatingPackages.js";
import { upsertCreateDirectory } from "./helpers/upsertCreateDirectory.js";
import { resolvePath } from "./helpers/copyFileToDir.js";

let projectDirectoryName: string = "";
let resolvedPathName: string = "";
let projectBaseName: string = "";

const program: Command = new Command(packageJSON.name)
	.version(packageJSON.version)
	.argument("[project-directory]")
	.usage("<project-directory> [options]")
	.action((name) => {
		projectDirectoryName = name;
	})
	.option("-sql, --usesql", "Use SQL as a database approach.")
	.option("-nosql, --usenosql", "Use NoSQL as a database approach.")
	.option("-vl,--val", "Implement Zod for validating api requests.")
	.option("-nes, --no-eslint", "Will not implement eslint in the project.")
	.option("-nh, --no-hooks", "Will not implement husky hooks in the project.")
	.option("-ng, --no-git", "Will not initate git in the project.")
	.option("-nc, --no-cors", "Will not implement cors in the project.")
	.option("-nv, --no-val", "Will not implement validator in the project.")
	.option("-nd, --no-docker", "Will not implement docker in the project.")
	.parse(process.argv);


if (typeof projectDirectoryName === "string") {
	projectDirectoryName = projectDirectoryName.trim();
}

if (!projectDirectoryName) {
	const { projectDir } = await inquirer.prompt([{
		type: "input",
		name: "projectDir",
		message: "Kindly provide the project directory name",
		default: 'genxp-project'
	}]);

	if (!(projectDir && typeof projectDir === "string")) {
		console.log("Please specify the project directory:");
		process.exit(1);
	}

	const validName = validateName(projectDir);

	if (!validName.validForNewPackages) {
		console.log("invalid Package Name", validName.warnings);
		process.exit(1);
	}
	projectDirectoryName = projectDir;
}

resolvedPathName = path.resolve(projectDirectoryName);
projectBaseName = path.basename(projectDirectoryName);

const checkIfDirectoryExists = await checkDirectoryExistsAndEmpty(resolvedPathName);

if (checkIfDirectoryExists) {
	console.log("Directory name conflict, directory is not empty !! Kindly provide another directory name");
	process.exit(1);
}


const options: OptionValues = program.opts();

const userPref = await getUserPreference(options);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const startTime = Date.now();
upsertCreateDirectory(resolvedPathName);
upsertCreateDirectory(resolvedPathName, "src");
await creatingPackages(userPref, resolvedPathName, projectBaseName);
await createProjectTemplate(__dirname, userPref, resolvedPathName);
const finishTime = Date.now();
console.log(finishTime - startTime, 'ms overall time');