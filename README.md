# Sitra Elamantapatesti

[Production app](https://elamantapatesti.sitra.fi/)
[Staging app](https://sitra-elamantapatesti.herokuapp.com/)

## Development server

Run `npm run dev` for a dev server. The app will automatically open in browser, if not navigate to `http://localhost:5000/`. The app will automatically reload if you change any of the source files.

There are more specific commands to run the server, which can be found in `package.json`.

## Database setup

You'll need a working database to run the app.
- Make sure you have a MongoDB process running.
    - If you don't have MongoDB, [install](https://www.mongodb.com/).
- Copy .env.example -> .env, this contains database URLs for local, staging and production environments.
- Run `npm run sync` to initialize/sync database.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive | pipe | service | class | module`.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

There are more specific commands to build the app, which can be found in `package.json`.

## Deployment

Every commit to the master branch gets automatically deployed to the staging app in Heroku.
Production deployment is made with `Promote to production` button in Heroku pipeline.

## Project structure

```
.
├── e2e
├── dist                # Compiled files
│   ├── public
│   └── server
├── src                 # Source files
│   ├── client          
│   |   ├── app         # Angular app files
│   |   ├── assets      # Static assets
│   |   ├── styles      # Global styles
│   |   └── ...
│   └── server         
│       ├── controllers # Server app logic
│       ├── helpers     # Helper tools
│       ├── models      # Mongoose models
│       └── ...
├── .angular-cli.json   # Angular-CLI configurations
├── proxy.conf.json     # Proxy rules for ng serve
└── ...
```

## Running unit tests

> Tests not implemented

Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

> Tests not implemented

Run `npm run e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Monthly reports

Run `npm run reports` and gather all the data from `results` folder.

## Further help

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.1.

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
