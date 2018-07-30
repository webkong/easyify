const program = require('commander')

program
  .version(require('../../package').version)
  .name('npm run')
  .description('egs: \n  npm run server -- --type=h5 --project=test --env=dev --multi=true \n  npm run server:multi -- --type=h5 --project=test')
  .usage('<command> -- <options>')
  .option('-P, --project', 'project name that will be operated.')
  .option('-E, --env', 'project compilation environment.default:dev, [prod/alpha/dev]')
  .option('-G, --gzip', 'build application use gizp compress')
  .command('dll', 'dll bundle')
  .command('server', 'development mode -- sigle-page')
  .command('server:multi', 'development mode -- multi-page')
  .command('build', 'packaged project, env prod. -- sigle-page')
  .command('build:multi', 'packaged project, env prod. -- multi-page')
  .command('deploy:cli', 'deploy dist to s3. "npm run deploy:cli <profileName> <sourcePaht> <S3Path>"')
  .parse(process.argv)