/*
 * 平台核心基础功能
 *
 * author: Mark
 * created:　2016/8/8
 */

define([
        'require',
        'jquery',
        'common/services',
        'common/utils',
        'common/ui',
        'common/global',
        'common/template',
        // 'common/validate.expand',
        // 'common/jiathis',
        'common/paginator',
        'common/webapi',
        // 'account/main',
        'common/avalon-common',
        'lib/bluebird.min',
        // 'lib/es6-promise-auto-min',
        'lib/avalon',
        'common/avalon-filter',
        'common/avalon-validators',
        'common/components/component',
        'common/directives/directives',
    ],
    function(
        require,
        $,
        services,
        utils,
        ui,
        global,
        template,
        // validateExpand,
        // jiathis,
        paginatorCom,
        webapi,
        // account,
        avalonCommon,
        Promise) {
            // es6promise.polyfill();
            window.Promise = Promise

            //notification
            document.addEventListener('DOMContentLoaded', function () {
                debugger;
                if (!("Notification" in window)) {
                    ui.toast('当前浏览器不支持桌面通知'); 
                    return;
                }

                if (Notification.permission !== "granted"){
                    Notification.requestPermission();
                }
            });

            return {
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
    }
);