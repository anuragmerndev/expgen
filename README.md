# @devsphere/expgen

A npm package for Express which helps in scaffolding the application from scratch in less than a minute. The package is built for both SQL and NoSQL databases, following best practices in Node.js with TypeScript, including logging, multi-threading, GitHub hooks, and Dockerfile to make the project production-ready.


## Features

- Scaffolds an Express project with a widely used MVC project structure.
- Supports both SQL and NoSQL databases.
- Implements best practices for Node.js with TypeScript.
- Integrated logging with Winston.
- Provides options for linting, prettier, validation, GitHub hooks, and Docker integration.


## Clean Architecture Implementation

This project implements the principles of Clean Architecture as follows:

- Entities or schema are stored in the model folder.
- Services have access to models, ensuring separation of concerns.
- Controllers only have access to services, facilitating loose coupling.
- Routers have access to controllers, maintaining a clear separation of concerns.
- app.ts contains all the logic related to the Express app setup.
- Server clustering and related logic are handled in server.ts.


## Installation

You don't need to install anything! Simply use the following command to scaffold your project:

```bash
  npx @devsphere/expgen myproject
  cd my-project
  npm install
  mv .env.example .env //replace the env variables
```
The command will prompt you with questions regarding your project setup, including database choice, linting, prettier, logging, validation, GitHub hooks, and Docker integration.
## Usage

For SQL

```bash
  npm run prisma:generate //genrate prisma client to work with
  npm run prisma:migrate //create and migrate schema to your server
  npm run start:dev
```
For NoSQL

```bash
  //uncomment the code in server.ts
  npm run start:dev
```
### For running on production and using clustering

```bash
  npm run build
  npm run start:prod
```
## Contributing

Contributions are welcome! Feel free to pick any task from the future work section below and start working on it. For any questions or suggestions, please reach out on [anuragmerndeveloper@gmail.com](mailto:anuragmerndeveloper@gmail.com).


## License

This project is licensed under the [MIT](https://choosealicense.com/licenses/mit/) License - see the [LICENSE](https://github.com/anuragmerndev/expgen/blob/main/LICENSE) file for details.


## Future Work

- Adding GraphQL as an option.
- Adding Domain-Driven Design (DDD) as another architecture option.
- Integrating Swagger for API documentation.

