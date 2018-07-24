![logo](./easyify.png)

>A workflow for FE, make work smart and easy.

### Description

A tool built with webapck to solve problems with front-end project engineering.
It can support build Vue project and H5 project. React project is coming...

### Environment

>Node >=8.11.0 
>webpack ^4.16.1
>webpack-cli ^3.0.8

### Installation

```
clone && cd easyify
npm i or yarn install
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

```
npm run <commends> <options>
```

H5
```
// H5 single page
dev -- --project=web-sigle
build -- --project=web-sigle

//H5 multi pages
dev:multi -- --project=web-multi
build:multi -- --project=web-multi
```

Vue
```
// Vue single page
npm run dev:vue -- --project=vue-sigle
npm run build:vue -- --project=vue-sigle


// Vue multi pages
npm run dev:vue:multi -- --project=vue-multi
npm run build:vue:multi -- --project=vue-multi
```

### Config

```
API: '"http://api.com"'

const api = process.env.API;
```

### Useage

1. build dll file

```
npm run dll <options>

npm run dll-- --project=projectName

```
2. run build 


#### Deploy

#### upload to aws s3

> install AWSCLI, Configuration and Credential Files
> [AWACLI document](https://docs.aws.amazon.com/cli/latest/userguide/cli-config-files.html)

```bash
npm run deploy:cli <profileName> <sourcePath> <s3Path>
 
npm run deploy:cli cdn ./dist/vue-multi/ s3://shareit.cdn.app/w/test/

# run commend: aws --profile cdn s3 sync ./dist/vue-multi/ s3://shareit.cdn.app/w/test/ --delete --exclude=".*"
# sync success to s3://shareit.cdn.app/w/test/
```

