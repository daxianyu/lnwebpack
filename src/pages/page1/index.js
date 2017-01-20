/* globals window, console require $ */
window.onerror = function () {
    console.log(arguments);
    return true;
};

require('../../lib/style/scss/main.scss');
// import * as avalon from 'avalon2';

let avalon = window.avalon,
    html = require('./aa.html');
// $ = require('jquery');

require('./test.css');

$('#test').html(html);
require('../../components/datepicker/index');

require.ensure([], (require) => {
    require('../../components/datepicker2/index');
    console.log('3333333323');
});

console.log('avalone2 is resolved');
console.log('avalone2 is resolved');

console.log(avalon);

