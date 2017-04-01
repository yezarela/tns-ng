## Tns Ng

[![npm version](https://badge.fury.io/js/tns-ng.svg)](https://badge.fury.io/js/tns-ng)

Angular CLI for Nativescript. Generates component for Nativescript Angular projects

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [Generating Components and Services](#generating-components-and-services)
* [Contributing](#contributing)

## Installation

```bash
npm install -g tns-ng
```

## Usage

```bash
tng --help
```

### Generating Components and Services

```
tng generate|g [type] [name] 
```
You can use the `tng generate` (or just `tng g`) command to generate Nativescript Angular components:

```bash
tng generate component my-component
tng g component my-component # using the alias

# components support relative path generation
# if in the directory app/feature/ and you run
tng g component my-component
# your component will be generated in app/feature/my-component
# but if you were to run
tng g component feature/my-component
# your component will be generated in app/feature/my-component

# This will create four files:
__my-component__/__my-component__.component.html
__my-component__/__my-component__.component.ts
__my-component__/__my-component__.component.android.css
__my-component__/__my-component__.component.ios.css
```
You can find all possible types in the table below:

Scaffold  | Usage
---       | ---
Component | `tng g component my-component`
Service | `tng g service my-service`

## Contributing

Just fork and pull request :D