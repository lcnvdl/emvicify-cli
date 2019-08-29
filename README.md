# Emvicify CLI
Scaffolding tool for Emvicify

[![NPM Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]

[Wiki](https://github.com/lcnvdl/emvicify-cli/wiki)

## Installation
You can install the package from npm.
```bash
npm i --g @emvicify/cli
```

## Usage
For the complete command list, please go to the [Wiki - CLI Command List page](https://github.com/lcnvdl/emvicify-cli/wiki/CLI-Commands-List)
```bash
mfy --help
emvicify --help
```

## Getting started
1. Run the command in your NPM Project folder
```bash
mfy here
```
2. Follow the wizard
3. (Optional) Power emvicify with its [plugins](https://github.com/lcnvdl/emvicify-cli/wiki/Plugins)

Happy coding ;)

## CLI Commands Examples
For the complete command list, please go to the [Wiki - CLI Command List page](https://github.com/lcnvdl/emvicify-cli/wiki/CLI-Commands-List)

> Add a new controller *- it'll create an UsersController class*
```bash
mfy add:controller Users

or

mfy ac Users
```

> Add a new router *- it'll create an AuthRouter class*
```bash
mfy add:router Auth

or

mfy ar Auth
```

> Add a new service *- it'll create an UsersManagementService class*
```bash
mfy add:service UsersManagement

or

mfy as UsersManagement
```

> Add a new empty middleware *- it'll create an AuthMiddleware class*
```bash
mfy add:middleware Auth

or

mfy am Auth
```

> Add a new [Basic Authentication](https://en.wikipedia.org/wiki/Basic_access_authentication) middleware *(overriding all virtual methods for you to use it)*
```bash
mfy am --authentication basic --with-overrides Auth
```

[npm-image]: https://img.shields.io/npm/v/@emvicify/cli.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@emvicify/cli
[travis-image]: https://img.shields.io/travis/lcnvdl/emvicify-cli/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/lcnvdl/emvicify-cli
