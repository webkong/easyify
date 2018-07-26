![logo](./easyify.png)

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

easyify init <template> <projectName>

easyify list # View avialable templates 
easyify help  # View help
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
  vue: 'false' // is vue
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
  npm run server -- --type=h5 --project=test --env=dev --multi=true 
  npm run server:multi -- --type=h5 --project=test

  Options:

    -V, --version      output the version number
    -T, --type         type of project that will be operated. default:h5, [h5/vue]
    -P, --project      project name that will be operated.
    -E, --env          project compilation environment.default:dev, [prod/alpha/dev]
    -M, --multi        project compilation environment.default:false, [true/false]
    -h, --help         output usage information

  Commands:

    dll                dll bundle
    server             development mode -- sigle-page
    server:multi       development mode -- multi-page
    build              packaged project, env prod. -- sigle-page
    build:dev          packaged project, env dev. -- sigle-page
    build:alpha        packaged project, env alpha. -- sigle-page
    build:multi        packaged project, env prod. -- multi-page
    build:multi:dev    packaged project, env dev. -- multi-page
    build:multi:alpha  packaged project, env alpha. -- multi-page
    deploy:cli         deploy dist to s3. "npm run deploy:cli <profileName> <sourcePaht> <S3Path>"
    help [cmd]         display help for [cmd]

```
1. build dll file if necessary

```
npm run dll <options>

```
2. run server or build  

#### example
```bash
git clone <easyify repo path>
cd src
easyify init h5 h5-test
...
# open h5-test use your code tool
# edit config.js
# if need dll bundle
# npm run dll -- -P=h5-test -M=false -T=h5

npm run server -- -P=h5-test -T=h5

npm run build -- -P=h5-test -T=h5

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

