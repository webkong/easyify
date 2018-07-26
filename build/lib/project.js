/**
 * Created by wangsw on 08/05/2016.
 * @version 1.0.4
 */
let argv = require('yargs').argv;
console.log(argv);
const getArgv = (key) => {
    let value = argv[key];
    console.log(value)
    if (!argv[key]) return false;
    if (isArray(argv[key])) {
        value = value[value.length - 1]
        console.log(value)
    }
    console.log(value)
    console.log('----')
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

if (!project) {
    console.error('argv error')
}

const args = {
    type,
    project,
    multi,
    env
}
console.log(args);
module.exports = args