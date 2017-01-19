/* globals window, console require */
window.onerror = function () {
    console.log(arguments);
    return true;
};

require('../../lib/style/scss/main.scss');
// import * as avalon from 'avalon2';

let avalon = require('avalon2');
require('./test.css');

require('../../components/datepicker/index');

// require.ensure([], (require) => {
//     console.log('3242343');
// });

require.ensure([], (require) => {
    require('../../components/datepicker2/index');
    console.log('3333333323');
});

console.log('avalone2 is resolved');
console.log('avalone2 is resolved');

console.log(avalon);

