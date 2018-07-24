const {
    project
} = require('../lib/project');

const conf = require('../../src/' + project + '/config.js');
console.log(conf);
module.exports = conf.env || {
    prod: {
        NODE_ENV: '"production"'
    },
    dev: {
        NODE_ENV: '"development"'
    },
    alpha: {
        NODE_ENV: '"production"'
    }
}