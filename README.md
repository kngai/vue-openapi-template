# vue-pygeoapi-template

A generic Vue starter template for developing a UI that points to a pygeoapi instance (alternative for `f=html`). This does not contain any special CSS or styling, as it's meant as a starting point. Web content is primarily obtained through pygeoapi's `json` and `jsonld` data with a few exceptions of:
- version
- logo image

## Project setup

Requires:

- NodeJS 12+

```
npm install
```

### Compiles and hot-reloads for development
```sh
# http://localhost:8080/ using .env (and .env.development)
npm run serve

# OR for expanded command line functionality
npx vue-cli-service serve
npx vue-cli-service serve --mode {mode}
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

### Environment configuration
Edit your `.env` config to your production environment and edit your `.env.development` to your development environment.

```sh
# You can specify additional env files by placing the following files in your project root:
.env                  # loaded in all cases
.env.local            # loaded in all cases, ignored by git
.env.[mode]           # only loaded in specified mode (ie. npm run serve will load configs based on .env.development)
.env.[mode].local     # only loaded in specified mode, ignored by git

# To build for specific modes 
npx vue-cli-service build --mode {mode}
```

See [Modes and Environment Variables](https://cli.vuejs.org/guide/mode-and-env.html#modes)

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
