#!/usr/bin/env node

const program = require('commander');
const exec = require('child_process').exec;
const fs = require('fs');
const hb = require('handlebars');
const paths = require('path');
const mkdirp = require('mkdirp');
const chalk = require('chalk');
const rimraf = require('rimraf');

program
    .version('1.0.0')
    .usage('[command] [options]')



program
    .command('generate [path] [type]')
    .alias('g')
    .description('generate new component')
    .action(function(path) {
        generateComponent(path)
    });


function generateComponent(path) {

    let current = process.cwd()
    let completePath = path.split('/')
    let name = completePath[completePath.length - 1]

    let component = {
        COMPONENT_NAME: upperCamelCase(name),
        COMPONENT_STYLES_URL: '',
        COMPONENT_TEMPLATE_URL: '',
        COMPONENT_FILE_NAME: name,
    };

    console.log('installing component')
    copyTmpFiles(name, () => {
        modifyComponentTs(name, component, () => {
            copyToProjectDir(name, completePath, () => {
                removeTmpFiles(name, () => {
                    console.log(chalk.yellow('sucessfully created'))
                })
            })
        })
    })
}

function copyTmpFiles(name, callback) {
    fs.mkdir(__dirname + `/tmp/${name}`, function(e) {
        if (!e || (e && e.code === 'EEXIST')) {
            fs.createReadStream(__dirname + '/blueprints/component/__path__/__name__.component.ts.__')
                .pipe(fs.createWriteStream(__dirname + `/tmp/${name}/${name}.component.ts`));
            fs.createReadStream(__dirname + '/blueprints/component/__path__/__name__.component.ios.css.__')
                .pipe(fs.createWriteStream(__dirname + `/tmp/${name}/${name}.component.ios.css`));
            fs.createReadStream(__dirname + '/blueprints/component/__path__/__name__.component.android.css.__')
                .pipe(fs.createWriteStream(__dirname + `/tmp/${name}/${name}.component.android.css`));
            fs.createReadStream(__dirname + '/blueprints/component/__path__/__name__.component.html.__')
                .pipe(fs.createWriteStream(__dirname + `/tmp/${name}/${name}.component.html`));
            callback(true)
        } else {
            console.log(e);
        }
    });
}


function modifyComponentTs(name, component, callback) {
    fs.readFile(__dirname + `/tmp/${name}/${name}.component.ts`, 'utf-8', function(err, content) {
        let source = hb.compile(content);
        let result = source(component);
        fs.writeFile(__dirname + `/tmp/${name}/${name}.component.ts`, result, 'utf-8', function(err) {
            if (err) throw err;
            callback()
        });
    });
}

function upperCamelCase(s) {
    return s
        .replace(s[0], s[0].toUpperCase())
        .replace(/(\-\w)/g, function(m) { return m[1].toUpperCase(); });
}

function copyToProjectDir(name, completePath, callback) {
    let current = process.cwd()
    let prefix = 'app'

    completePath.forEach((p) => {
        prefix += `/${p}`
    })

    mkdirp(current + `/${prefix}`, function(e) {

        if (!e || (e && e.code === 'EEXIST')) {
            fs.createReadStream(__dirname + `/tmp/${name}/${name}.component.ts`)
                .pipe(fs.createWriteStream(current + `/${prefix}/${name}.component.ts`));
            console.log(chalk.green(' create'), `${prefix}/${name}.component.ts`)

            fs.createReadStream(__dirname + `/tmp/${name}/${name}.component.ios.css`)
                .pipe(fs.createWriteStream(current + `/${prefix}/${name}.component.ios.css`));
            console.log(chalk.green(' create'), `${prefix}/${name}.component.ios.css`)

            fs.createReadStream(__dirname + `/tmp/${name}/${name}.component.android.css`)
                .pipe(fs.createWriteStream(current + `/${prefix}/${name}.component.android.css`));
            console.log(chalk.green(' create'), `${prefix}/${name}.component.android.css`)

            fs.createReadStream(__dirname + `/tmp/${name}/${name}.component.html`)
                .pipe(fs.createWriteStream(current + `/${prefix}/${name}.component.html`));
            console.log(chalk.green(' create'), `${prefix}/${name}.component.html`)

            callback(true)
        } else {
            console.log(e);
        }
    });
}

function removeTmpFiles(name, callback) {
    rimraf(__dirname + `/tmp/${name}`, function() {
        callback(true)
    })
}

program.parse(process.argv);