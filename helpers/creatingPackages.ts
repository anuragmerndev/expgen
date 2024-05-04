import { writeFileSync } from 'fs';

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
                "express": "^4.19.2",
                "winston": "^3.12.0",
                "dotenv": "^16.4.5",
                "cross-env": "^7.0.3"
            },
            devDependencies: {
                "@types/express": "~4.17.13",
                "@types/node": "~18.16.9",
                "tsc-alias": "^1.8.8",
                "tsx": "^4.7.1",
                "typescript": "^5.3.2"
            }
        };

        if (userPref.cors) {
            packageData.dependencies['cors'] =  "^2.8.5";
            packageData.devDependencies['@types/cors'] = "^2.8.17";
        }

        if (userPref.eslint) {
            packageData.devDependencies = {
                ...packageData.devDependencies,
                "@typescript-eslint/eslint-plugin": "^7.7.0",
                "@typescript-eslint/parser": "^7.7.0",
                "eslint": "^8.57.0",
                "eslint-config-google": "^0.14.0",
                "eslint-config-prettier": "^9.1.0",
                "eslint-import-resolver-typescript": "^3.6.1",
                "eslint-plugin-extra": "^0.1.0",
                "eslint-plugin-extra-rules": "^0.0.0-development",
                "eslint-plugin-import": "^2.29.1",
                "eslint-plugin-prettier": "^5.1.3",
                "eslint-plugin-sonarjs": "^0.24.0",
                "prettier": "^3.2.5",
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
                "husky": "^9.0.11",
                "lint-staged": "^15.2.2",
                "@commitlint/cli": "^19.2.1",
                "@commitlint/config-conventional": "^19.1.0",
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
            packageData.dependencies['prisma'] = "5.13.0";
            packageData.scripts = {
                ...packageData.scripts,
                "start:prod": "cross-env NODE_ENV=production node dist/src/server.js",
                "prisma:generate": "prisma generate",
                "prisma:migrate": "prisma migrate dev",
            }
        }

        if (userPref.db === 'nosql') {
            packageData.dependencies['mongoose'] = "^8.2.2";
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

const creatingEslint = async (userPref: StructureOptions, projectRoot: string,) => {
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