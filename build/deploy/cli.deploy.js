let argv = require('yargs').argv;
const exec = require('child_process').exec;
let profile = argv._[0],
    sourcePath = argv._[1],
    distPath = argv._[2];
let cmdStr = 'aws --profile ' + profile + ' s3 sync ' + sourcePath + ' ' + distPath + ' --delete --exclude=".*"';
console.log('run commend: ' + cmdStr);
exec(cmdStr, function (err, stdout, stderr) {
    if (err) {
        console.error(err);
    }
    if (stderr) {
        console.log(stderr);
    }
    console.log('sync success to ' + distPath);
});