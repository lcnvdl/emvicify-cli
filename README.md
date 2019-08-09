# Emvicify CLI
Scaffolding tool for Emvicify

[![NPM Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]

## Installation
You can install the package from npm.
```bash
npm i --g @emvicify/cli
```

## Usage
```bash
mfy --help
```
or
```bash
mvcfy --help
```
or
```bash
emvicify --help
```

## Getting started
1. Run the command in your NPM Project folder
```bash
mfy here
```
2. Follow the wizard
3. Ready! Just use it :)

### Examples
> Add a new controller
```bash
mfy add:controller Users
```
or
```bash
mfy ac Users
```

> Add a new router
```bash
mfy add:router Auth
```
or
```bash
mfy ar Auth
```

> Add a new middleware
```bash
mfy add:middleware Authenticated
```
or
```bash
mfy am Authenticated
```

[npm-image]: https://img.shields.io/npm/v/@emvicify/cli.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@emvicify/cli
[travis-image]: https://img.shields.io/travis/lcnvdl/emvicify-cli/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/lcnvdl/emvicify-cli
