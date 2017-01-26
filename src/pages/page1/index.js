/* globals window, console require $ */
window.onerror = function () {
    console.log(arguments);
    return true;
};

let req = require.context('../../components/datepicker', true, /\.js/);
console.log(req.keys());
// req('index.js');


// require('../../lib/style/scss/main.scss');
// import * as avalon from 'avalon2';

let avalon = window.avalon,
    html = require('./aa.html');
// $ = require('jquery');
require('../../lib/style/scss/base/_.normalize.css')
require('./xx.scss');

$('#test').html(html);
require('../../components/datepicker/index');

require.ensure([], (require) => {
    require('../../components/datepicker2/index');
    console.log('3333333323');
});

console.log('avalone2 is resolved');
console.log('avalone2 is resolved');

console.log(avalon);

