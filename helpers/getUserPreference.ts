import { OptionValues } from "commander";
import { prefOptions, prefPrompts } from "./preferencePrompts.js";
import inquirer from "inquirer";

async function getUserPreference(options: OptionValues) {
    const getPreference = [];
    if (!options.useNpm && !options.useYarn && !options.usePnpm) {
        getPreference.push(prefPrompts.packageManager);
    }
    if (!options.typescript && !options.javascript) {
        getPreference.push(prefPrompts.scriptType);
    }

    if (!options.useMVC && !options.useDDD) {
        getPreference.push(prefPrompts.arch);
    }

    if (!options.useSQL && !options.useNoSQL && !options['no-db']) {
        getPreference.push(prefPrompts.db);
    }
    if (!options.postman && !options.swagger && options['no-docs']) {
        getPreference.push(prefPrompts.docs);
    }
    if (!options.esGoogle && !options.esAirbnb && !options.esStandard && !options['no-eslint']) {
        getPreference.push(prefPrompts.eslint);
    }
    if (!options.useRest && !options.useGraphql) {
        getPreference.push(prefPrompts.api);
    }
    if (!options.useJest && !options.useMocha && !options['no-test']) {
        getPreference.push(prefPrompts.test);
    }
    if (!options.useExVal && !options.useZod && !options.useJoi && !options['no-val']) {
        getPreference.push(prefPrompts.val);
    }
    if (!options.winston && !options.morgan && !options['no-log']) {
        getPreference.push(prefPrompts.log);
    }
    if (!options.docker && !options['no-doc']) {
        getPreference.push(prefPrompts.docker);
    }

    console.log(Object.keys(prefPrompts));
    
    const userpreference = await inquirer.prompt(getPreference);
    const userPrefRough = { ...userpreference, ...options };

    const userPreferenceFormatted = {};
    for (let i = 0; i < Object.keys(userPrefRough).length; i++) {
        const element = Object.keys(userPrefRough)[i];
    }
}

export { getUserPreference }