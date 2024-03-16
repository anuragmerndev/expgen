import { OptionValues } from "commander";
import { prefOptions, prefPrompts, userPrefType } from "./preferencePrompts.js";
import inquirer from "inquirer";

async function getUserPreference(options: OptionValues) {
    const getPreference = [];

    if (!options.usenpm && !options.useyarn && !options.usepnpm) {
        getPreference.push(prefPrompts.packageManager);
    }
    if (!options.typescript) {
        getPreference.push(prefPrompts.typescript);
    }

    if (!options.usemvc && !options.useddd) {
        getPreference.push(prefPrompts.arch);
    }

    if (!options.usesql && !options.usenosql && options['db']) {
        getPreference.push(prefPrompts.db);
    }

    if (!options.postman && !options.swagger && options['docs']) {
        getPreference.push(prefPrompts.docs);
    }

    if (!options.esgoogle && !options.esairbnb && !options.esstandard && options['eslint']) {
        getPreference.push(prefPrompts.eslint);
    }

    if (!options.usegraphql) {
        getPreference.push(prefPrompts.api);
    }

    if (!options.usejest && !options.usemocha && options['test']) {
        getPreference.push(prefPrompts.test);
    }

    if (!options.useexval && !options.usezod && !options.usejoi && options['val']) {
        getPreference.push(prefPrompts.val);
    }

    if (!options.winston && !options.morgan && options['log']) {
        getPreference.push(prefPrompts.log);
    }

    if (!options.docker && !options['docker']) {
        getPreference.push(prefPrompts.docker);
    }

    if (options['hooks']) {
        getPreference.push(prefPrompts.hooks)
    }

    const userpreference = await inquirer.prompt(getPreference);
    const userPrefRough: object = { ...options, ...userpreference };

    const prefOptionPref = Object.keys(prefOptions);

    const finalFomat: any = {};

    prefOptionPref.forEach((prefKey) => {
        finalFomat[prefKey] = formatPreference(userPrefRough, prefOptions, prefKey)
    });

    return finalFomat;
}

function formatPreference(options: any, userPref: userPrefType, prefKeyName: string) {

    let finalPref;

    if (options[userPref[prefKeyName].defaultKey as string] === false || options[userPref[prefKeyName].defaultKey as string] === "none") {
        return finalPref = false
    }

    for (const [key, value] of Object.entries(options)) {
        if (key === prefKeyName || key === userPref[prefKeyName].defaultKey as string) {
            return finalPref = value;
        }

        for (const [prefKey, prefValue] of Object.entries(userPref[prefKeyName].options)) {
            if (key === prefKey) {
                return finalPref = prefValue;
            }
        }
    }
    return finalPref;
}

export { getUserPreference }