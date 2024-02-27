import { Command } from "commander";
import inquirer from "inquirer";
import path from "path";

import packageJSON from "./package.json";
import { checkPackageManager } from "./helpers/checkPackageManager";
import { checkDirectoryExistsAndEmpty } from "./helpers/checkEmptyDirectory";

let projectDirectoryName: string = "";
let resolvedPathName: string = "";
let projectBaseName: string = "";

const program: Command = new Command(packageJSON.name)
	.version(packageJSON.version)
	.argument("<project-directory>")
	.usage("<project-directory> [options]")
	.action((name) => {
		projectDirectoryName = name;
	})
	.option("-npm, --useNpm", "Use npm as a package manager.")
	.option("-yarn, --useYarn", "Use yarn as a package manager.")
	.option("-pnpm, --usePnpm", "Use pnpm as a package manager.")
	.option("-ts, --typescript", "Implement typescript for the project.")
	.option("-js, --javascript", "Implement javascript for the project.")
	.option("-mvc", "Use MVC as a project architecture.")
	.option("-ddd", "Use DDD as a project architecture.")
	.option("-sql", "Use SQL as a database approach.")
	.option("-nosql", "Use NoSQL as a database approach.")
	.option("-pm, --postman", "Use postman for the api documentation.")
	.option("-sw, --swagger", "Use swagger for the api documentation.")
	.option("-rs, --useRest", "Use rest for the communication.")
	.option("-gql, --useGraphql", "Use graphql for the communication.")
	.option("-esg, --esGoogle", "Implement google eslint configuration.")
	.option("-esa, --esAirbnb", "Implement airbnb eslint configuration.")
	.option("-ess, --esStandard", "Implement standard eslint configuration.")
	.option("-jest, --useJest", "Implement jest as testing framework.")
	.option("-mocha, --useMocha", "Implement mocha as testing framework.")
	.option("-exVal", "Implement express validator for validating api requests.")
	.option("-zod", "Implement Zod for validating api requests.")
	.option("-joi", "Implement Joi for validating api requests.")
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
	.option("-nv, --no-val", "Will not implement validator documentation in the project.")
	.parse(process.argv);

const options = program.opts();

console.log(options);
console.log(checkPackageManager());

if (typeof projectDirectoryName === "string") {
	projectDirectoryName = projectDirectoryName.trim();
}

(async () => {
	if (!projectDirectoryName) {
		const { projectDir } = await inquirer.prompt([{
			type: "input",
			name: "projectDir",
			message: "Kindly provide the project directory name",
		}]);

		if (!(projectDir && typeof projectDir === "string")) {
			console.log("Please specify the project directory:");
			process.exit(1);
		}
		projectDirectoryName = projectDir;
	}

	resolvedPathName = path.resolve(projectDirectoryName);
	projectBaseName = path.basename(projectDirectoryName);
})();

const checkIfDirectoryExists = checkDirectoryExistsAndEmpty(resolvedPathName);

console.log({ checkIfDirectoryExists });
