/* globals window, console require */
window.onerror = function () {
    console.log(arguments);
    return true;
};

require('../../lib/style/scss/main.scss');
// import * as avalon from 'avalon2';

// let avalon = require('avalon2');
require('./test.css');
// console.log(avalon);

require.ensure([], (require) => {
    let datapicker = require.ensure(['../../components/datepicker/index'], (require) => {
        console.log('324234');
        console.log(datapicker);
    });
    console.log(datapicker);
    console.log('avalone2 is resolved');
    console.log('avalone2 is resolved');
});


