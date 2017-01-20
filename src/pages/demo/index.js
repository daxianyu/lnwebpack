/*global require console */

require('../../sass/common/base.scss');
let base = require('../../js/common/base1'),
    config = {
        showDropdown: true,
        drops: ['菜单1', '菜单2'],
        btnDropdown: {
            top: false,
            btnText: '下拉组件',
            color: 'red',
            menus: [{name: '呵呵'}, {name: '哈哈'}],
            onClick: function (menus) {
                console.log('呵呵');
            },
        },
        newRouteModal: {
            show: false,
        },
        tab: {
            options: [{text: '待办', value: '100'}, {text: '通知', value: '200'}],
            value: '100',
            onChange: function (value) {
                console.log('value: ' + value);
            },
        },
        productSelectConfig: {
            textField: 'name',
            valueField: 'name',
            vmId: null,
            value: '',
            placeholder: '请选择',
        },
        tagPicker: {
            vmId: null,
            items: [{name: '铜杆', id: 1}, {name: '铜杆1', id: 2}, {name: '铜杆2', id: 3}, {name: '铜杆3', id: 4}]
        },
        addressModal: {
            show: false,
            title: '新增起运地',
        },
        tabCascader: {
            options: [{
                name: '上海',
                code: '0001',
                children: [{
                    name: '上海市',
                    code: '0001',
                    children: [{
                        name: '浦东新区',
                        code: '00011',
                        children: [{
                            name: '川沙镇',
                            code: '000111',
                        }, {
                            name: '北蔡镇',
                            code: '000112',
                            children: [],
                        }],
                    }, {
                        name: '嘉定区',
                        code: '00012',
                        children: [{
                            name: 'wpw自治镇',
                            code: '000121',
                            custom: true
                        }, {
                            name: 'wpw自治镇',
                            code: '000121',
                            custom: true
                        }, {
                            name: 'wpw自治镇',
                            code: '000121',
                            custom: true
                        }, {
                            name: 'wpw自治镇',
                            code: '000121',
                            custom: true
                        }, {
                            name: 'wpw自治镇',
                            code: '000121',
                            custom: true
                        }, {
                            name: 'wpw自治镇',
                            code: '000121',
                            custom: true
                        }, {
                            name: 'wpw自治镇',
                            code: '000121',
                            custom: true
                        }, {
                            name: 'wpw自治镇',
                            code: '000121',
                            custom: true
                        }, {
                            name: 'wpw自治镇',
                            code: '000121',
                            custom: true
                        }, {
                            name: 'wpw自治镇',
                            code: '000121',
                            custom: true
                        }, {
                            name: 'wpw自治镇',
                            code: '000121',
                            custom: true
                        }, {
                            name: 'wpw自治镇',
                            code: '000121',
                            custom: true
                        }, {
                            name: 'wpw自治镇',
                            code: '000121',
                            custom: true
                        }, {
                            name: 'wpw自治镇',
                            code: '000121',
                            custom: true
                        }, {
                            name: 'wpw自治镇',
                            code: '000121',
                            custom: true
                        }, {
                            name: 'wpw自治镇',
                            code: '000121',
                            custom: true
                        }, {
                            name: 'wpw自治镇',
                            code: '000121',
                            custom: true
                        }]
                    }, {
                        name: 'wpw自治区',
                        code: '00013',
                        custom: true,
                        children: []
                    }]
                }]
            }],
            hotOptions: [{
                name: '上海市',
                code: '0001',
                codes: ['-1', '0001']
            }, {
                name: '嘉定区',
                code: '00012',
                codes: ['-1', '0001', '0001']
            }, {
                name: 'wpw自治镇',
                code: '000121',
                codes: ['-1', '0001', '0001', '00012'],
                custom: true
            }]
        },
        checked: false,
        confirm: function () {
            base.ui.confirm('我是标题', '我是内容', function (data) {
                console.log('confirm');
            }, function () {
                console.log('cancel');
            });
        },
        file: function (file) {
            // body
        },
        readyLoad: function () {
        }
    },
    vm = base.avalon.init(config);

console.log(vm);
base.ui.toast('success', 'Fuck!');
