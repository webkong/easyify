![logo](http://easyify.webkong.cn/_media/logo.png)

![CircleCI](https://img.shields.io/circleci/project/github/webkong/easyify.svg)[![npm package](https://img.shields.io/npm/v/easyify.svg)](https://www.npmjs.com/package/easyify)![npm](https://img.shields.io/npm/l/easyify.svg)![node](https://img.shields.io/node/v/easyify.svg)![webpack](https://img.shields.io/badge/webpack-4.16+-green.svg)


[document](http://easyify.webkong.cn)

>A compilation tools for FE, built with webpack4.x, compile faster and smart, make work easier.

### what is easyify

A tool built with webapck to solve problems in front-end engineering.
It support build Vue project and H5 project. React project is coming...

### Feature

* node 8.11+
* Webpack 4.16+
* Vue/H5 application
* Sigle-page/Multi-page application
* Multi-project in one repository
* Configurable environment variable
* Hot reload
* Gzip
* Dll bundle
* One-click deployment
* Flow

### Installation

```bash
clone && cd easyify
npm i #or yarn install
```

### Directory

```bash
├── README.md # readme
├── build  # build library
├── dist   # distribution folder
├── easyify.png # logo
├── jsconfig.json 
├── package-lock.json
├── package.json 
└── src # source code folder
```

### How to use

#### Create project

>You need `easyify-cli` to create a new project quickly.You can also build the project manually, but it must conform to the folder structure.

```bash
npm i -g easyify-cli

cd <easyifyPath>/src

easyify/ey init <template> <projectName>

# template list web / vuejs

easyify/ey list # View avialable templates
easyify/ey help  # View help

#ey is short name for easyify
```


### Config
change dirctory to project, `config.js` in this folder.
```javascript
{
  env: { // Environmental variable, can used by `process.env.NODE_ENV` `process.env.API`
      prod: {
          NODE_ENV: '"production"',
          API: ''
      },
      dev: {
          NODE_ENV: '"development"',
          API: ''
      },
      alpha: {
          NODE_ENV: '"production"',
          API: ''
      }
  },
  vendor:[
  ], // dll lib array
  vue: false // is vue
  multi: false
}
```

### Useage

#### Cmmand

```
npm run help
```

```
Usage: npm run <command> -- <options>

  egs: 
  npm run start -- --project=test
  npm run start:multi -- --project=test

  Options:

    -V, --version  output the version number
    -P, --project  project name that will be operated.
    -E, --env      project compilation environment.default:dev, [prod/alpha/dev]
    -G, --gzip     build application use gizp compress
    -h, --help     output usage information

  Commands:

    dll            dll bundle
    start         development mode -- sigle-page
    start:multi   development mode -- multi-page
    build          packaged project, env prod. -- sigle-page
    build:multi    packaged project, env prod. -- multi-page
    deploy:cli     deploy dist to s3. "npm run deploy:cli <profileName> <sourcePaht> <S3Path>"
    help [cmd]     display help for [cmd]

```

#### build dll file

```
npm run dll <options>
```

#### Dev

```
npm run start <options>
```
#### Build


```
npm run build  <options>
```

#### example

```bash
git clone <easyify repo path>
cd src
easyify/ey init web h5-test
...
# open h5-test use your code tool
# edit config.js if necessary
# if need dll bundle
# npm run dll -- -P=h5-test

npm run dll -- -P=h5-test

npm run start -- -P=h5-test

npm run build -- -P=h5-test

or

npm run build -- -P=h5-test -E=alpha

```



### Deploy

#### upload to aws s3

> install AWSCLI, Configuration and Credential Files
> [AWACLI document](https://docs.aws.amazon.com/cli/latest/userguide/cli-config-files.html)

```bash
npm run deploy:cli <profileName> <sourcePath> <s3Path>
 
npm run deploy:cli cdn ./dist/vue-multi/ s3://shareit.cdn.app/w/test/

# run commend: aws --profile cdn s3 sync ./dist/vue-multi/ s3://shareit.cdn.app/w/test/ --delete --exclude=".*"
# sync success to s3://shareit.cdn.app/w/test/
```

### Other

[easyify document](https://easyify.webkong.cn)

[easyify template](https://github.com/easyify)

[easyify-cli](https://github.com/webkong/easyify-cli)


### Update Logs

#### v1.1.3

* Unified configuration environment
* Streamlined commands

#### v1.1.6

* support flow types

#### v1.1.8

* fix build wrong path
* Adjust the built directory structure

### v1.1.10

* Fix dll packages error
* Use multi-core compression JavaScript