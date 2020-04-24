# vue-pygeoapi-template

A generic Vue starter template for developing a UI for a pygeoapi instance (alternative for `f=html`). This does not contain any special CSS or styling, as it's meant as a starting point. Web content is mostly obtained through pygeoapi's `json` and `jsonld` data.

## Project setup

Requires:

- NodeJS 12+

```
npm install
```

Setup your `.env` file:

```sh
vi .env                 # modify for your pygeoapi instance

# You can specify additional env files by placing the following files in your project root:
.env                    # loaded in all cases
.env.local              # loaded in all cases, ignored by git
.env.[modeName]         # only loaded in specified mode
.env.[modeName].local   # only loaded in specified mode, ignored by git

# To build for specific modes 
npx vue-cli-service build --mode {modeName}
```

### Compiles and hot-reloads for development
```sh
# http://localhost:8080/ using .env (and .env.development if exists)
npm run serve

# OR for expanded command line functionality
npx vue-cli-service serve
npx vue-cli-service serve --mode {modeName}
```

### Compiles and minifies for production
```sh
# Outputs to /dist with default settings
npm run build

# If you have a specific environment config file you want to build with (ie. .env.production)
# Example:
npx vue-cli-service build --mode production
```

### Lints and fixes files
```sh
npm run lint
```

## Environment variables
See [Modes and Environment Variables](https://cli.vuejs.org/guide/mode-and-env.html#modes)

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
