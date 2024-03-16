import { Command, OptionValues } from "commander";
import inquirer from "inquirer";
import path from "path";

import packageJSON from "./package.json" with {type: "json"};
import { checkPackageManager } from "./helpers/checkPackageManager.js";
import { checkDirectoryExistsAndEmpty } from "./helpers/checkEmptyDirectory.js";
import { prefPrompts } from "./helpers/preferencePrompts.js";
import { getUserPreference } from "./helpers/getUserPreference.js";

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
	.option("-npm, --usenpm", "Use npm as a package manager.")
	.option("-yarn, --useyarn", "Use yarn as a package manager.")
	.option("-pnpm, --usepnpm", "Use pnpm as a package manager.")
	.option("-ts, --typescript", "Implement typescript for the project.")
	.option("-mvc, --usemvc", "Use MVC as a project architecture.")
	.option("-ddd, --useddd", "Use DDD as a project architecture.")
	.option("-sql, --usesql", "Use SQL as a database approach.")
	.option("-nosql, --usenosql", "Use NoSQL as a database approach.")
	.option("-pm, --postman", "Use postman for the api documentation.")
	.option("-sw, --swagger", "Use swagger for the api documentation.")
	.option("-gql, --graphql", "Use graphql for the communication.")
	.option("-esg, --esgoogle", "Implement google eslint configuration.")
	.option("-esa, --esairbnb", "Implement airbnb eslint configuration.")
	.option("-ess, --esstandard", "Implement standard eslint configuration.")
	.option("-jest, --usejest", "Implement jest as testing framework.")
	.option("-mocha, --usemocha", "Implement mocha as testing framework.")
	.option("-exVal, --useexval", "Implement express validator for validating api requests.")
	.option("-zod,--usezod", "Implement Zod for validating api requests.")
	.option("-joi, --usejoi", "Implement Joi for validating api requests.")
	.option("-wn, --winston", "Implement Winston as a logger mechanism of the application.")
	.option("-mn, --morgan", "Implement morgan as a logger mechanism of the application.")
	.option("-dkr, --docker", "Implement docker on the project.")
	.option("-np, --no-prettier", "Will not implement prettier in the project.")
	.option("-nes, --no-eslint", "Will not implement eslint in the project.")
	.option("-nh, --no-hooks", "Will not implement husky hooks in the project.")
	.option("-ng, --no-git", "Will not initate git in the project.")
	.option("-nc, --no-cors", "Will not implement cors in the project.")
	.option("-nt, --no-test", "Will not initiate testing in the project.")
	.option("-nd, --no-docs", "Will not initiate api documentation in the project.")
	.option("-nv, --no-val", "Will not implement validator in the project.")
	.option("-ndb, --no-db", "Will not implement database in the project.")
	.option("-nl, --no-log", "Will not implement logger in the project.")
	.option("-ndc, --no-docker", "Will not implement docker in the project.")
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
console.log({ userPref });
