const path = require('path');
const {
    project
} = require('../lib/project');
const projectDir = path.resolve(__dirname, '../../src/' + project);
const userConf = require(projectDir + '/config.js');

const config = {
    env: {
        prod: {
            NODE_ENV: '"production"'
        },
        dev: {
            NODE_ENV: '"development"'
        },
        alpha: {
            NODE_ENV: '"production"'
        }
    },
    vendor:[],
    ...userConf
};
module.exports = config;