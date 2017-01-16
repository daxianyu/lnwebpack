/* globals window, console require */
window.onerror = function () {
    console.log(arguments);
    return true;
};

require('jquery');
require('./test.css');
console.log('page1');
