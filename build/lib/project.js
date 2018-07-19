/**
 * Created by wangsw on 08/05/2016.
 * @version 1.0.4
 */
let argv = require('yargs').argv;

let type = argv.type || 'sigle'; // 'sigle' 单页 'multi' 多页
let project = argv.project || 'demo';
let targetDir = argv.target || project;
let env = argv.env || '';

module.exports ={
    type,
    project,
    targetDir,
    env
}