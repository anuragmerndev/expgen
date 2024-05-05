export const constantData = {
    fixedFolders: ['controllers', 'middlewares', 'routes', 'utils', 'validators', "logging"],
    variableFolders: ['docker', 'eslint', 'hooks'],
    mainFolders: ['template', 'main'],
    template: 'template',
    src: 'src',
    variableArgs: ['template', "extras"],
    root: 'root',
    gitignore: 'gitignore',
    services: 'services',
    sql: {
        db: 'sql',
        root: ['prisma'],
        copyDir: [
            {
                source: ['template', "db", 'sql.ts'],
                destination: ['prisma', 'schema.prisma']
            },
            {
                source: ['template', "db", 'db.ts'],
                destination: ['prisma', 'index.ts']
            },
            {
                source: ['template', "services", "sql", 'user.services.ts'],
                destination: ['src', "services", 'user.services.ts']
            }
        ]
    },
    nosql: {
        db: 'nosql',
        root: ['src', 'config'],
        copyDir: [
            {
                source: ['template', "db", 'nosql.ts'],
                destination: ['src', 'config', 'db.ts']
            },
            {
                source: ['template', "services", "nosql", 'user.services.ts'],
                destination: ['src', "services", 'user.services.ts']
            }],
        copyFiles: [
            {
                source: ['template', 'models'],
                destination: ['src', 'models']
            },
            {
                source: ['template', 'types'],
                destination: ['src', 'types']
            }
        ]
    },
}