/* globals window, console require */
window.onerror = function () {
    console.log(arguments);
    return true;
};

// import * as avalon from 'avalon2';

let avalon = require('avalon2');
require('./test.css');
console.log(avalon);

