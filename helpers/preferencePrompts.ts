type prefPromptsType<T> = {
    [K in keyof T]: T[K] extends object ? prefPromptsType<T[K]> : T[K]
}


type prefPromptsTypeDef = {
    [key: string]: {
        type: string,
        name: string,
        choices?: string[],
        message: string
    }
}


export const prefPrompts: prefPromptsTypeDef = {
    scriptType: {
        type: 'list',
        name: 'scriptType',
        choices: ["js", "ts"],
        message: ''
    },
    arch: {
        type: "list",
        name: 'arch',
        choices: ["mvc", "ddd"],
        message: ''
    },
    db: {
        type: 'list',
        name: "db",
        choices: ["sql", 'nosql'],
        message: ''
    },
    api: {
        type: 'list',
        name: 'api',
        choices: ['rest', 'graphql'],
        message: ''
    },
    docs: {
        type: 'list',
        name: 'doc',
        choices: ['postman', 'swagger', 'none'],
        message: ''
    },
    eslint: {
        type: 'list',
        name: 'eslint',
        choices: ['google', 'airbnb', 'standard', 'none'],
        message: ''
    },
    test: {
        type: 'list',
        name: 'test',
        choices: ['jest', 'mocha', 'none'],
        message: ''
    },
    log: {
        type: 'list',
        name: 'log',
        choices: ['morgan', 'winston', 'none'],
        message: ''
    },
    val: {
        type: 'list',
        name: 'val',
        choices: ['express-validator', 'zod', 'joi', 'none'],
        message: ''
    },
    prettier: {
        type: 'confirm',
        name: 'pre',
        message: ''
    },
    docker: {
        type: 'confirm',
        name: 'docker',
        message: ''
    },
}