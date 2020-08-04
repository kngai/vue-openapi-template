# vue-openapi-template

A generic Vue starter template for developing a UI that points to an openapi instance. This template is using [skeleton](https://github.com/pgrimard/Skeleton) as its initial styling. Web content is primarily obtained through openapi's `json` and `jsonld` data with a few exceptions of:
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
# You can specify additional env files in your project root:
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


## Static web hosting
By default, it builds and compiles with `mode: 'history'` in the Vue router for deployment to static web hosting services. Be sure to have proper NotFound redirects included for your web hosting services.

Netlify `_redirects` file:
```
# Netlify settings for single-page application
/*    /index.html   200
```

Apache `.htaccess` file with a subfolder:
```
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteBase /<subfolder>
RewriteRule ^<subfolder>/index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /<subfolder>/index.html [L]
</IfModule>
```
