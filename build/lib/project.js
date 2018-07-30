/**
 * Created by wangsw on 08/05/2016.
 * @version 1.0.4
 */
const argv = require('yargs').argv;
// const config = require('../config/index');

const getArgv = (key) => {
    let value = argv[key];
    if (!argv[key]) return false;
    if (isArray(argv[key])) {
        value = value[value.length - 1]
    }
    return value
}
const isArray = (arg) => {
    if (typeof arg === 'object') {
        return Object.prototype.toString.call(arg) === '[object Array]';
    }
    return false;
}

let multi = getArgv('M') || getArgv('multi') || 'false';
let type = getArgv('T') || getArgv('type') || 'h5';
let project = getArgv('P') || getArgv('project') || null;
let env = getArgv('E') || getArgv('env') || ''; // 环境
let gzip = getArgv('G') || getArgv('gzip') || 'false'; // 环境

if (!project) {
    console.error('argv error')
}

const args = {
    type,
    project,
    multi,
    env,
    gzip
}
module.exports = args