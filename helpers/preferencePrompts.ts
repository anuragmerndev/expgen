export const prefPrompts = {
    db: {
        type: 'list',
        name: "db",
        choices: ["sql", 'nosql'],
        message: 'Which database model do you prefer ?'
    },
    eslint: {
        type: 'confirm',
        name: 'eslint',
        message: 'Would you like to have linting enabled ?'
    },
    prettier: {
        type: 'confirm',
        name: 'prettier',
        message: 'Do you want to implement prettier in your project ?',
    },
    log: {
        type: 'confirm',
        name: 'log',
        message: 'Would you like to use winston as logger ?'
    },
    val: {
        type: 'confirm',
        name: 'val',
        message: 'Would you like to use zod as validator ?'
    },
    hooks: {
        type: 'confirm',
        name: 'hooks',
        message: 'Would you like to use github hooks to your project ?'
    },
    docker: {
        type: 'confirm',
        name: 'docker',
        message: 'Do you want to integrate docker in your project ?'
    },
}