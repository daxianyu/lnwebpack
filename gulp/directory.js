/* globals require __dirname module */

var path = require('path'),
    programRoot = path.resolve(__dirname, '../'),
    dest = path.resolve(programRoot, 'dist'),
    modulesRoot = path.resolve(programRoot, 'dist/modules'),
    staticsRoot = path.resolve(programRoot, 'dist/statics'),
    nodeModule = path.resolve(programRoot, 'node_modules');

module.exports = {
    root: programRoot,
    dest: dest,
    modules: modulesRoot,
    statics: staticsRoot,
    nodeModules: nodeModule,
};
