export const prefPrompts = {
    packageManager: {
        type: 'list',
        name: 'packageManager',
        choices: ["npm", "yarn", "pnpm"],
        message: 'Which package manager would you like to use ?'
    },
    typescript: {
        type: 'confirm',
        name: 'typescript',
        message: 'Do you want to use TypeScript ?'
    },
    arch: {
        type: "list",
        name: 'architecture',
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
        type: 'confirm',
        name: 'graphql',
        message: 'Would you like to use graphql ?'
    },
    docs: {
        type: 'list',
        name: 'docs',
        choices: ['postman', 'swagger', 'none'],
        message: 'Do you want to document apis ?'
    },
    eslint: {
        type: 'list',
        name: 'eslint',
        choices: ['google', 'airbnb', 'standard', 'none'],
        message: 'which eslint style would you prefer ?'
    },
    prettier: {
        type: 'confirm',
        name: 'prettier',
        message: 'Do you want to implement prettier in your project ?',
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

export interface userPrefType {
    [key: string]: {
        options: {
            [key: string]: string
        },
        defaultKey: string | boolean
    }
}

export const prefOptions: userPrefType = {
    packageManager: {
        options: {
            usenpm: "npm",
            useyarn: "yarn",
            usepnpm: "pnpm",
        },
        defaultKey: false
    },
    typescript: {
        options: {
            typescript: "typescript"
        },
        defaultKey: false
    },
    architecture: {
        options: {
            usemvc: "mvc",
            useddd: "ddd",
        },
        defaultKey: false
    },
    database: {
        options: {
            usesql: "sql",
            usenosql: "nosql"
        },
        defaultKey: "db"
    },
    apidocs: {
        options: {
            postman: "postman",
            swagger: "swagger"
        },
        defaultKey: "docs"
    },
    eslint: {
        options: {
            esgoogle: "google",
            esairbnb: "airbnb",
            esstandard: "standard",
        },
        defaultKey: "eslint"
    },
    testing: {
        options: {
            usejest: "jest",
            usemocha: "mocha",
        },
        defaultKey: "test"
    },
    validator: {
        options: {
            useexval: "expressVal",
            usezod: "zod",
            usejoi: "joi",
        },
        defaultKey: "val"
    },
    logger: {
        options: {
            winston: "winston",
            morgan: "morgan",
        },
        defaultKey: "log"
    },
    prettier: {
        options: {
            prettier: "prettier"
        },
        defaultKey: false
    },
    hooks: {
        options: {
            hooks: "hooks"
        },
        defaultKey: false
    },
    graphql: {
        options: {
            graphql: "graphql"
        },
        defaultKey: false
    },
    docker: {
        options: {
            docker: "docker"
        },
        defaultKey: false
    },
};