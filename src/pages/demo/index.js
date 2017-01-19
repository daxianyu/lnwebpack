/*global require console */

require('../../sass/common/base.scss');
let base = require('../../js/common/base1'),
    config = {
        name: 'daXianYu',
        tab: {
            options: [{text: '待办', value: '100'}, {text: '通知', value: '200'}],
            value: '100',
            onChange: function (value) {

            },
        },
        readyLoad: function () {
            console.log('hello');
        },
    },
    vm = base.avalon.init(config);

console.log(vm);
base.ui.toast('success', 'Fuck!');
