import { writeFileSync } from 'fs';

import latestVersion from 'latest-version';
import { StructureOptions } from './getUserPreference.js';
import { resolvePath } from './copyFileToDir.js';

export const creatingPackages = async (userPref: StructureOptions, projectRoot: string, packageBase: string) => {
    try {
        const packageData: any = {
            name: packageBase,
            "version": "1.0.0",
            "main": "server.ts",
            "scripts": {
                "build": "tsc && tsc-alias",
                "start:dev": "cross-env NODE_ENV=development tsx watch src/server.ts",
            },
            dependencies: {
                express: (await latestVersion('express')),
                winston: await latestVersion('winston'),
                dotenv: await latestVersion('dotenv'),
                "cross-env": await latestVersion("cross-env")
            },
            devDependencies: {
                "@types/express": await latestVersion('@types/express'),
                "@types/node": await latestVersion('@types/node'),
                "tsc-alias": await latestVersion("tsc-alias"),
                "tsx": await latestVersion("tsx"),
                "typescript": await latestVersion("typescript"),
            }
        };

        if (userPref.cors) {
            packageData.dependencies['cors'] = await latestVersion('cors');
            packageData.devDependencies['@types/cors'] = await latestVersion('@types/cors');
        }

        if (userPref.eslint) {
            packageData.devDependencies = {
                ...packageData.devDependencies,
                "@typescript-eslint/eslint-plugin": "^7.7.0",
                "@typescript-eslint/parser": "^7.7.0",
                "eslint": "^8.57.0",
                "eslint-config-google": await latestVersion("eslint-config-google"),
                "eslint-config-prettier": await latestVersion("eslint-config-prettier"),
                "eslint-import-resolver-typescript": await latestVersion("eslint-import-resolver-typescript"),
                "eslint-plugin-extra": await latestVersion("eslint-plugin-extra"),
                "eslint-plugin-extra-rules": await latestVersion("eslint-plugin-extra-rules"),
                "eslint-plugin-import": await latestVersion("eslint-plugin-import"),
                "eslint-plugin-prettier": await latestVersion("eslint-plugin-prettier"),
                "eslint-plugin-sonarjs": await latestVersion("eslint-plugin-sonarjs"),
                "prettier": await latestVersion("prettier"),
            };

            packageData.scripts = {
                ...packageData.scripts,
                "format": "prettier --write \"src/**/*.ts\"",
                "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
            }
        };

        if (userPref.hooks) {
            packageData.devDependencies = {
                ...packageData.devDependencies,
                "husky": await latestVersion("husky"),
                "lint-staged": await latestVersion("lint-staged"),
                "@commitlint/cli": await latestVersion("@commitlint/cli"),
                "@commitlint/config-conventional": await latestVersion("@commitlint/config-conventional"),
            }

            packageData.scripts = {
                ...packageData.scripts,
                "prepare": "husky",
                "lint:commit": "commitlint --edit",
            }
        };

        if (userPref.val) {
            packageData.dependencies = {
                ...packageData.dependencies,
                "zod": "^3.22.4"
            }
        };

        if (userPref.db === 'sql') {
            packageData.dependencies['prisma'] = await latestVersion('prisma');
            packageData.scripts = {
                ...packageData.scripts,
                "start:prod": "cross-env NODE_ENV=production node dist/src/server.js",
                "prisma:generate": "prisma generate",
                "prisma:migrate": "prisma migrate",
            }
        }

        if (userPref.db === 'nosql') {
            packageData.dependencies['mongoose'] = await latestVersion('mongoose');
            packageData.scripts = {
                ...packageData.scripts,
                "start:prod": "cross-env NODE_ENV=production node dist/server.js",
            }
        }

        writeFileSync(resolvePath(projectRoot, 'package.json'), Buffer.from(JSON.stringify(packageData)));
        creatingEslint(userPref, projectRoot);
    } catch (error) {
        console.log({ error });
        process.exit(1);
    }
}

export const creatingEslint = async (userPref: StructureOptions, projectRoot: string,) => {
    try {
        const eslintOption = {
            "parser": "@typescript-eslint/parser",
            "parserOptions": {
                "project": "tsconfig.json",
                "sourceType": "module"
            },
            "extends": [
                "eslint:recommended",
                "plugin:prettier/recommended",
                "plugin:sonarjs/recommended",

                "plugin:import/recommended",
                "plugin:import/typescript",

                "plugin:@typescript-eslint/eslint-recommended",
                "plugin:@typescript-eslint/recommended",

                "plugin:import/recommended",
                "plugin:import/typescript"
            ],
            "root": true,
            "env": {
                "node": true,
                "jest": true,
                "es6": true
            },
            "ignorePatterns": [".eslintrc.js"],
            "rules": {
                "@typescript-eslint/interface-name-prefix": "off",
                "@typescript-eslint/explicit-function-return-type": "off",
                "@typescript-eslint/explicit-module-boundary-types": "off",
                "@typescript-eslint/no-explicit-any": "off",
                "@typescript-eslint/no-unused-vars": ["error", {
                    "argsIgnorePattern": "^_"
                }],

                "no-console": "off",
                "quotes": ["error", "single"],
                "semi": ["error", "always"],
                "object-curly-spacing": "off",
                "indent": ["error", 4],
                "new-cap": "off",
                "max-len": [
                    "error",
                    {
                        "code": 90,
                        "comments": 120
                    }
                ],

                "global-require": "error",
                "handle-callback-err": ["error", "^(err|error)$"],
                "no-buffer-constructor": "error",
                "no-mixed-requires": ["error", { "grouping": true, "allowCall": true }],
                "no-path-concat": "error",

                "import/extensions": "off",
                "import/prefer-default-export": "off",
                "import/no-default-export": "error",
                "import/no-extraneous-dependencies": [
                    "error",
                    { "devDependencies": true }
                ],

                "prettier/prettier": ["error", { "endOfLine": "auto" }],
                "require-jsdoc": "off",
                "linebreak-style": "off",

                "import/no-unresolved": "error",
                "import/order": [
                    "error",
                    {}
                ]
            },
            "plugins": [
                "@typescript-eslint/eslint-plugin",
                "eslint-plugin-prettier",
                "prettier",
                "import"
            ],
            "settings": {
                "import/resolver": {
                    "node": {
                        "extensions": [".js", ".jsx", ".ts", ".tsx"]
                    },
                    "typescript": {
                        "project": "./tsconfig.json"
                    }
                }
            }
        };

        const tsConfigOptions = {
            "compilerOptions": {
                "outDir": "./dist",
                "esModuleInterop": true,
                "forceConsistentCasingInFileNames": true,
                "strict": true,
                "resolveJsonModule": true,
                "skipLibCheck": true,
                "paths": {
                }
            },
            "exclude": ["**/*.test.ts"]
        }

        if (userPref.db === 'nosql') {
            eslintOption.rules['import/order'] = [
                "error",
                {
                    "groups": [
                        "builtin",
                        "external",
                        "internal",
                        "sibling",
                        "parent",
                        "index",
                        "unknown"
                    ],
                    "pathGroups": [
                        {
                            "pattern": "@config/*",
                            "group": "internal",
                            "position": "before"
                        },
                        {
                            "pattern": "@middlewares/*",
                            "group": "internal",
                            "position": "before"
                        },
                        {
                            "pattern": "@models/*",
                            "group": "internal",
                            "position": "before"
                        },
                        {
                            "pattern": "@services/*",
                            "group": "internal",
                            "position": "after"
                        },
                        {
                            "pattern": "@controller/*",
                            "group": "internal",
                            "position": "after"
                        },
                        {
                            "pattern": "@routes/*",
                            "group": "internal",
                            "position": "after"
                        },
                        {
                            "pattern": "@utils/*",
                            "group": "internal",
                            "position": "after"
                        },
                        {
                            "pattern": "@projTypes/*",
                            "group": "internal",
                            "position": "after"
                        },
                        {
                            "pattern": "@src/*",
                            "group": "internal",
                            "position": "after"
                        }
                    ],
                    "pathGroupsExcludedImportTypes": ["builtin"],
                    "distinctGroup": true,
                    "newlines-between": "always",
                    "alphabetize": {
                        "order": "asc",
                        "caseInsensitive": true
                    }
                }
            ]

            tsConfigOptions.compilerOptions.paths = {
                "@config/*": ["./src/config/*"],
                "@controllers/*": ["./src/controllers/*"],
                "@middlewares/*": ["./src/middlewares/*"],
                "@validators/*": ["./src/validators/*"],
                "@routes/*": ["./src/routes/*"],
                "@models/*": ["./src/models/*"],
                "@services/*": ["./src/services/*"],
                "@logger/*": ["./src/logging/*"],
                "@utils/*": ["./src/utils/*"],
                "@projTypes/*": ["./src/types/*"]
            }
        }

        if (userPref.db === 'sql') {
            eslintOption.rules['import/order'] = [
                "error",
                {
                    "groups": [
                        "builtin",
                        "external",
                        "internal",
                        "sibling",
                        "parent",
                        "index",
                        "unknown"
                    ],
                    "pathGroups": [
                        {
                            "pattern": "@db/*",
                            "group": "internal",
                            "position": "before"
                        },
                        {
                            "pattern": "@middlewares/*",
                            "group": "internal",
                            "position": "before"
                        },
                        {
                            "pattern": "@validators/*",
                            "group": "internal",
                            "position": "before"
                        },
                        {
                            "pattern": "@services/*",
                            "group": "internal",
                            "position": "after"
                        },
                        {
                            "pattern": "@controller/*",
                            "group": "internal",
                            "position": "after"
                        },
                        {
                            "pattern": "@routes/*",
                            "group": "internal",
                            "position": "after"
                        },
                        {
                            "pattern": "@utils/*",
                            "group": "internal",
                            "position": "after"
                        },
                        {
                            "pattern": "@src/*",
                            "group": "internal",
                            "position": "after"
                        }
                    ],
                    "pathGroupsExcludedImportTypes": ["builtin"],
                    "distinctGroup": true,
                    "newlines-between": "always",
                    "alphabetize": {
                        "order": "asc",
                        "caseInsensitive": true
                    }
                }
            ];

            tsConfigOptions.compilerOptions.paths = {
                "@db/*": ["./prisma/*"],
                "@controllers/*": ["./src/controllers/*"],
                "@middlewares/*": ["./src/middlewares/*"],
                "@validators/*": ["./src/validators/*"],
                "@routes/*": ["./src/routes/*"],
                "@services/*": ["./src/services/*"],
                "@logger/*": ["./src/logging/*"],
                "@utils/*": ["./src/utils/*"],
            }
        }

        writeFileSync(resolvePath(projectRoot, '.eslintrc'), Buffer.from(JSON.stringify(eslintOption)));
        writeFileSync(resolvePath(projectRoot, 'tsconfig.json'), Buffer.from(JSON.stringify(tsConfigOptions)));
    } catch (error) {
        console.log({ error });
        process.exit(1);
    }
}