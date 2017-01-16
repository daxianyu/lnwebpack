/**
 * Created by tangjianfeng on 2017/1/16.
 */
/* global require module */
const fs = require('fs');

function getDir (dir) {
    let pkg, path;
    pkg = JSON.parse(fs.readFileSync(dir + '/package.json', 'utf-8'));
    path = pkg.main;
    return path
        ? dir + '/' + path
        : null;
}

module.exports.pwd = function (name) {
    let path, pkg, dependencies;
    const dir = this.dir;
    pkg = JSON.parse(fs.readFileSync(dir + '/package.json', 'utf-8'));
    dependencies = Object.assign(pkg.dependencies, pkg.devDependencies);
    path = dependencies[name]
        ? getDir(this.dir + '/node_modules/' + name)
        : null;
    return path;
};
