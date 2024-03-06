export const prefPrompts = {
    packageManager: {
        type: 'list',
        name: 'packageManager',
        choices: ["npm", "yarn", "pnpm"],
        message: 'Which package manager would you like to use ?'
    },
    scriptType: {
        type: 'list',
        name: 'scriptType',
        choices: ["js", "ts"],
        message: 'Do you want to use TypeScript ?'
    },
    arch: {
        type: "list",
        name: 'arch',
        choices: ["mvc", "ddd"],
        message: 'Which project achitecture do you prefer ?'
    },
    db: {
        type: 'list',
        name: "db",
        choices: ["sql", 'nosql', 'none'],
        message: 'Which database model do you prefer ?'
    },
    api: {
        type: 'list',
        name: 'api',
        choices: ['rest', 'graphql'],
        message: 'Which API architecture would you like to use ?'
    },
    docs: {
        type: 'list',
        name: 'doc',
        choices: ['postman', 'swagger', 'none'],
        message: 'Do you want to document apis ?'
    },
    eslint: {
        type: 'list',
        name: 'eslint',
        choices: ['google', 'airbnb', 'standard', 'none'],
        message: 'which linter style would you prefer ?'
    },
    test: {
        type: 'list',
        name: 'test',
        choices: ['jest', 'mocha', 'none'],
        message: 'which testing framework do you want ?'
    },
    log: {
        type: 'list',
        name: 'log',
        choices: ['morgan', 'winston', 'none'],
        message: 'which logger would you like to have ?'
    },
    val: {
        type: 'list',
        name: 'val',
        choices: ['express-validator', 'zod', 'joi', 'none'],
        message: 'which validator would you like to have ?'
    },
    prettier: {
        type: 'list',
        name: 'pre',
        choices: ["yes", "no"],
        message: 'Do you want to implement prettier in your project ?',
    },
    docker: {
        type: 'list',
        name: 'docker',
        choices: ["yes", "no"],
        message: 'Do you want to integrate docker in your project ?'
    },
}

export const prefOptions = {
    scriptType: ["scriptType", "typescript", "javascript"],
    architecture: ["arch", "useMVC", "useDDD"],
    database: ["db", "useSQL", "useNoSQL"],
    apiType: ["api", "useRest", "useGraphql"],
    testFramework: ["test", "useJest", "useMocha", "useExVal"],
    validator: ["val", "useExVal", "useZod", "useJoi"],
    logger: ["log", "winston", "morgan"],
    apiDocs: ["docs", "postman", "swagger"],
    docker: ["docker"],
    eslint: ["eslint", "esGoogle", "esAirbnb", "esStandard"],
    prettier: ["prettier"],
    hooks: ["hooks"],
    git: ["git"],
    cors: ["cors"],
}