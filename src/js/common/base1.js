/**
 * Created by tangjianfeng on 2017/1/19.
 */

/* global require, module */

let services = require('./services'),
    utils = require('./utils'),
    ui = require('./ui'),
    global = require('./global'),
    template = require('./template'),
    paginatorCom = require('./paginator'),
    webapi = require('./webapi'),
    avalonCommon = require('./avalon-common'),
    Promise = require('../lib/bluebird.min');

require('./avalon-filter');
require('./avalon-validators');
require('./components/component');
// require('./directives/directives');

window.Promise = Promise;

//notification
document.addEventListener('DOMContentLoaded', function () {
    if (!("Notification" in window)) {
        ui.toast('当前浏览器不支持桌面通知');
        return;
    }

    if (Notification.permission !== "granted"){
        Notification.requestPermission();
    }
});

module.exports = {
    //模型引擎
    tpls: template,
    //当前域名
    // domain: location.protocol + "//" + location.host,
    /*
     *后台接口服务
     *
     * property: CODE_xxx
     * function: post, get
     */
    services: services,
    /*
     *账号
     */
    // account: account,
    /*
     *通用方法
     */
    utils: utils,

    /*
     *UI组件
     */
    ui: ui,
    //全局变量
    global:global,
    //
    // /*
    //  *组件
    //  */
    com: {
        paginator: paginatorCom
    },
    /*
     *接口
     */
    webapi: webapi,
    avalon:{
        init:avalonCommon.init
    }
};
