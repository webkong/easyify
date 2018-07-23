make work smart and easy.



```
npm i or yarn install
```

```
h5 单页应用和多页应用

npm run dev -- --project=web-sigle
npm run dev:multi -- --project=web-multi
npm run build -- --project=web-sigle
npm run build:multi -- --project=web-multi
```


```
vue 单页应用和多页应用

npm run dev:vue -- --project=vue-sigle
npm run dev:vue:multi -- --project=vue-multi
npm run build:vue -- --project=vue-sigle
npm run build:vue:multi -- --project=vue-multi
```


配置可用的全局变量

```
在 config 里面配置即可
```


发布prod

1. 生成dll

```
npm run dll -- --project=projectName

```
2. 执行对应的build命令



## deploy

### 1. 上传到aws s3

> 安装AWSCLI， 并配置相关证书
> [AWACLI官方文档](https://docs.aws.amazon.com/zh_cn/cli/latest/userguide/installing.html)

```bash
npm run deploy:cli <profileName> <sourcePath> <s3Path>
 
npm run deploy:cli cdn ./dist/vue-multi/ s3://shareit.cdn.app/w/test/

# run commend: aws --profile cdn s3 sync ./dist/vue-multi/ s3://shareit.cdn.app/w/test/ --delete --exclude=".*"
# sync success to s3://shareit.cdn.app/w/test/
```
