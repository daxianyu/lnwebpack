/*
 * 后台服务接口调用模块
 *
 * author: Mark
 * created:　2016/8/8
 */

let ui = require('./ui'),
    global = require('./global');
// 正在请求的接口
var requesting = '';

// 统一隐藏Loading
var _hideLoading = function() {
    ui.hideLoading();
};

// 统一显示loading
var _showLoading = function() {
    ui.showLoading();
};

// response 处理
var _rspHandle = function(rsp, callback, arg) {
    if (rsp.code) {
        if (callback) {
            callback(rsp.code, rsp.msg, rsp.data, arg, rsp);//rsp.data || {} if rsp.data=0 error
        }
    } else {
        ui.toast('error', '服务出现异常！');
    }
};

var _404 = function() {
    requesting = '';
    _hideLoading();
    ui.toast('error', '404：服务器没有响应！');
};

var _500 = function() {
    requesting = '';
    _hideLoading();
    ui.toast('error', '500：服务器出错！');
};

var _502 = function() {
    requesting = '';
    _hideLoading();
    ui.toast('error', '502：服务器出错！');
};

var _504 = function() {
    requesting = '';
    _hideLoading();
    ui.toast('error', '504：服务器超时！');
};

var _302 = function() {
    requesting = '';
    _hideLoading();
    ui.toast('error', '302：接口发生了跳转！');
};

var _401 = function(loginOn401) {
    location.href="/logout"
};

var _requestAlert = function() {
    // ui.toast('waring', '正在处理上一个请求！');
};

module.exports = {

    HOST: 'http://www.bearychat.com',

    //服务器返回码对应信息
    CODE_SUCC: '000000', //成功
    CODE_ERROR: '10001', //失败
    CODE_PARAM_ERR: '10002', //参数错误
    CODE_VERIFI_ERROR: "10012", //验证码错误

    /*
     * HTTP POST 请求
     *
     * api      接口url
     * data     数据
     * callback 回调方法
     */
    post: function(api, data, callback, headers, host, arg, async) {
        var reqSlug = api+JSON.stringify(data);
        if (requesting === reqSlug) {
            _requestAlert();
            return;
        }

        // var securityToken = localStorage.getItem("Security-Token");
        // var securityToken = $.cookie("Security-Token");
        // if (securityToken == "" || securityToken == null) {
        //     securityToken = localStorage.getItem("Security-Token");
        // }

        var url = api;
        window.g_config = window.g_config || {};
        if (host) {
            url = host == location.host ? url : "http://" + host + url;
        } else if (window.g_config.serviceHost != undefined) {
            url = window.g_config.serviceHost == location.host ? url : "http://" + window.g_config.serviceHost + url;
        }
        if (url !== '') {
            requesting = reqSlug;
            _showLoading();
            //                 var securityToken = $.cookie(global.tokenCookie);
            //                 var ticket;
            //                 if(securityToken)ticket = JSON.parse(securityToken).ticket;
            //                 else{
            // //              		url = window.location.href;
            // //                  window.open('http://'+window.g_config.ssoHost+"#/login?url="+url,'_self');
            // //                  return;
            //                 }
            $.ajax({
                cache: false,
                url: url,
                dataType: 'json',
                type: 'POST',
                async: async === undefined ? true : async,
                data: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    // 'Security-Token': encodeURIComponent(securityToken)
                },
                success: function(rsp) {
                    requesting = '';
                    _hideLoading();
                    _rspHandle(rsp, callback, arg);
                },
                error: function() {
                    requesting = '';
                    _hideLoading();
                },
                statusCode: {
                    404: function() {
                        _404();
                    },
                    500: function() {
                        _500();
                    },
                    504: function() {
                        _504();
                    },
                    302: function() {
                        _302();
                    },
                    401: function() {
                        var loginOn401 = arg ? (arg.loginOn401 === undefined ? true : arg.loginOn401) : true;
                        _401(loginOn401);
                    }
                }
            });
        }

    },

    /*
     * HTTP PUT 请求
     *
     * api      接口url
     * data     数据
     * callback 回调方法
     */
    put: function(api, data, callback, headers, host, arg, async) {
        var reqSlug = api+JSON.stringify(data);
        if (requesting === reqSlug) {
            _requestAlert();
            return;
        }

        var securityToken = localStorage.getItem("Security-Token");
        var securityToken = $.cookie("Security-Token");
        if (securityToken == "" || securityToken == null) {
            securityToken = localStorage.getItem("Security-Token");
        }

        var url = api;
        window.g_config = window.g_config || {};
        if (host) {
            url = host == location.host ? url : "http://" + host + url;
        } else if (window.g_config.serviceHost != undefined) {
            url = window.g_config.serviceHost == location.host ? url : "http://" + window.g_config.serviceHost + url;
        }

        if (url !== '') {
            requesting = reqSlug;
            _showLoading();
            //                 var securityToken = $.cookie(global.tokenCookie);
            //                 var ticket;
            //                 if(securityToken)ticket = JSON.parse(securityToken).ticket;
            //                 else{
            // //              		url = window.location.href;
            // //                  window.open('http://'+window.g_config.ssoHost+"#/login?url="+url,'_self');
            // //                  return;
            //                 }
            $.ajax({
                cache: false,
                url: url,
                dataType: 'json',
                type: 'PUT',
                async: async === undefined ? true : async,
                data: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Security-Token': encodeURIComponent(securityToken)
                },
                success: function(rsp) {
                    requesting = '';
                    _hideLoading();
                    _rspHandle(rsp, callback, arg);
                },
                error: function() {
                    requesting = '';
                    _hideLoading();
                },
                statusCode: {
                    404: function() {
                        _404();
                    },
                    500: function() {
                        _500();
                    },
                    502: function() {
                        _502();
                    },
                    504: function() {
                        _504();
                    },
                    302: function() {
                        _302();
                    },
                    401: function() {
                        var loginOn401 = arg ? (arg.loginOn401 === undefined ? true : arg.loginOn401) : true;
                        _401(loginOn401);
                    }
                }
            });
        }

    },



    /*
     * HTTP GET 请求
     *
     * api      接口url
     * data     数据
     * callback 回调方法
     */
    get: function(api, data, callback, headers, host, arg, async) {
        var reqSlug = api+JSON.stringify(data);
        if (requesting === reqSlug) {
            _requestAlert();
            return;
        }
        var securityToken = localStorage.getItem("Security-Token");
        var securityToken = $.cookie("Security-Token");
        if (securityToken == "" || securityToken == null) {
            securityToken = localStorage.getItem("Security-Token");
        }

        var url = api;
        window.g_config = window.g_config || {};
        if (host) {
            url = host == location.host ? url : "http://" + host + url;
        } else if (window.g_config.serviceHost != undefined) {
            url = window.g_config.serviceHost == location.host ? url : "http://" + window.g_config.serviceHost + url;
        }
        if (url !== '') {
            requesting = reqSlug;
            // _showLoading();
            //                 var securityToken = $.cookie(global.tokenCookie);
            //                 var ticket;
            //                 if(securityToken)ticket = JSON.parse(securityToken).ticket;
            //                 else{
            // //              		url = window.location.href;
            // //                  window.open('http://'+window.g_config.ssoHost+"#/login?url="+url,'_self');
            // //                  return;
            //                 }
            $.ajax({
                cache: false,
                url: url,
                dataType: 'json',
                type: 'GET',
                async: async === undefined ? true : async,
                data: data,
                headers: {
                    'Content-Type': 'text/plain',
                    'Security-Token': encodeURIComponent(securityToken)
                },
                // xhrFields: window.g_config.serviceHost == undefined || window.g_config.serviceHost == location.host ? "" : {
                //     "withCredentials": true
                // },
                success: function(rsp) {
                    requesting = '';
                    //$('.loading').remove();
                    // _hideLoading();
                    _rspHandle(rsp, callback, arg);
                },
                error: function(rsp) {
                    requesting = '';
                    //$('.loading').remove();
                    // _hideLoading();
                },
                statusCode: {
                    404: function() {
                        _404();
                    },
                    500: function() {
                        _500();
                    },
                    504: function() {
                        _504();
                    },
                    302: function() {
                        _302();
                    },
                    401: function() {
                        var loginOn401 = arg ? (arg.loginOn401 === undefined ? true : arg.loginOn401) : true;
                        _401(loginOn401);
                    }
                }
            });
        }
    },
    /*
     * HTTP DELETE 请求
     *
     * api      接口url
     * data     数据
     * callback 回调方法
     */
    remove: function(api, data, callback, headers, host, arg, async) {
        var reqSlug = api+JSON.stringify(data);
        if (requesting === reqSlug) {
            _requestAlert();
            return;
        }
        var securityToken = localStorage.getItem("Security-Token");
        var securityToken = $.cookie("Security-Token");
        if (securityToken == "" || securityToken == null) {
            securityToken = localStorage.getItem("Security-Token");
        }

        var url = api;
        window.g_config = window.g_config || {};
        if (host) {
            url = host == location.host ? url : "http://" + host + url;
        } else if (window.g_config.serviceHost != undefined) {
            url = window.g_config.serviceHost == location.host ? url : "http://" + window.g_config.serviceHost + url;
        }
        if (url !== '') {
            requesting = reqSlug;
            _showLoading();
            //                 var securityToken = $.cookie(global.tokenCookie);
            //                 var ticket;
            //                 if(securityToken)ticket = JSON.parse(securityToken).ticket;
            //                 else{
            // //              		url = window.location.href;
            // //                  window.open('http://'+window.g_config.ssoHost+"#/login?url="+url,'_self');
            // //                  return;
            //                 }
            $.ajax({
                cache: false,
                url: url,
                dataType: 'json',
                type: 'DELETE',
                async: async === undefined ? true : async,
                data: data,
                headers: {
                    'Content-Type': 'text/plain',
                    'Security-Token': encodeURIComponent(securityToken)
                },
                success: function(rsp) {
                    requesting = '';
                    //$('.loading').remove();
                    _hideLoading();
                    _rspHandle(rsp, callback, arg);
                },
                error: function() {
                    requesting = '';
                    //$('.loading').remove();
                    _hideLoading();
                },
                statusCode: {
                    404: function() {
                        _404();
                    },
                    500: function() {
                        _500();
                    },
                    504: function() {
                        _504();
                    },
                    302: function() {
                        _302();
                    },
                    401: function() {
                        var loginOn401 = arg ? (arg.loginOn401 === undefined ? true : arg.loginOn401) : true;
                        _401(loginOn401);
                    }
                }
            });
        }
    }
};