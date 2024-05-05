import { OptionValues } from "commander";
import inquirer from "inquirer";

import { prefPrompts } from "./preferencePrompts.js";

export interface StructureOptions extends OptionValues {
    eslint: boolean,
    hooks: boolean,
    git: boolean,
    cors: boolean,
    test: boolean,
    docker: boolean,
    db: 'sql' | 'nosql',
    val: boolean,
    log: boolean,
}

async function getUserPreference(options: OptionValues) {
    const getPreference = [];

    if (!options.usesql && !options.usenosql) {
        getPreference.push(prefPrompts.db);
    }

    if (options['eslint']) {
        getPreference.push(prefPrompts.eslint);
    }

    if (!options.hasOwnProperty('val')) {
        getPreference.push(prefPrompts.val);
    }

    if (!options.hasOwnProperty('log')) {
        getPreference.push(prefPrompts.log);
    }

    if (options['docker']) {
        getPreference.push(prefPrompts.docker);
    }

    if (options['hooks']) {
        getPreference.push(prefPrompts.hooks)
    }


    const userpreference = await inquirer.prompt(getPreference);
    const userPrefData: StructureOptions = { ...options, ...userpreference };

    if (userPrefData["usesql"]) {
        userPrefData['db'] = 'sql';
        delete userPrefData["usesql"];
    }

    if (userPrefData["usenosql"]) {
        userPrefData['db'] = 'nosql';
        delete userPrefData["usenosql"];
    }

    return userPrefData;
}

export { getUserPreference }