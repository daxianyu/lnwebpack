/*
 * UI通用模块
 *
 * author: Mark
 * created:　2016/8/8
 */
/* global require */

let template = require('./template');
let Spin = require('../lib/spin.min');

var _placeholderHandle = function () {
    if ('placeholder' in document.createElement('input')) { //如果浏览器原生支持placeholder
        return;
    }

    function target(e) {
        var ee = ee || window.event;
        return ee.target || ee.srcElement;
    }

    function _getEmptyHintEl(el) {
        var hintEl = el.hintEl;
        return hintEl && g(hintEl);
    }

    function blurFn(e) {
        var el = target(e);
        if (!el || el.tagName !== 'INPUT' && el.tagName !== 'TEXTAREA') {
            return; //IE下，onfocusin会在div等元素触发
        }
        var emptyHintEl = el.__emptyHintEl;
        if (emptyHintEl) {
            //clearTimeout(el.__placeholderTimer||0);
            //el.__placeholderTimer=setTimeout(function(){//在360浏览器下，autocomplete会先blur再change
            if (el.value) {
                emptyHintEl.style.display = 'none';
            } else {
                emptyHintEl.style.display = '';
            }
            //},600);
        }
    }

    function focusFn(e) {
        var el = target(e);
        if (!el || el.tagName !== 'INPUT' && el.tagName !== 'TEXTAREA') {
            return; //IE下，onfocusin会在div等元素触发
        }
        var emptyHintEl = el.__emptyHintEl;
        if (emptyHintEl) {
            //clearTimeout(el.__placeholderTimer||0);
            emptyHintEl.style.display = 'none';
        }
    }
    if (document.addEventListener) { //ie
        document.addEventListener('focus', focusFn, true);
        document.addEventListener('blur', blurFn, true);
    } else {
        document.attachEvent('onfocusin', focusFn);
        document.attachEvent('onfocusout', blurFn);
    }

    var elss = [document.getElementsByTagName('input'), document.getElementsByTagName('textarea')];
    for (var n = 0; n < 2; n++) {
        var els = elss[n];
        for (var i = 0; i < els.length; i++) {
            var el = els[i];
            var placeholder = el.getAttribute('placeholder'),
                emptyHintEl = el.__emptyHintEl;
            if (placeholder && !emptyHintEl) {
                emptyHintEl = document.createElement('strong');
                emptyHintEl.innerHTML = placeholder;
                emptyHintEl.className = 'placeholder';
                emptyHintEl.onclick = function (el) {
                    return function () {
                        try {
                            el.focus();
                        } catch (ex) { }
                    };
                } (el);
                if (el.value) {
                    emptyHintEl.style.display = 'none';
                }
                el.parentNode.insertBefore(emptyHintEl, el);
                el.__emptyHintEl = emptyHintEl;
            }
        }
    }
};

// 返回顶部
var _retunrTop = function () {
    var left = "",
        right = "";
    if ($(".container").length > 0) {
        left = $(".container").offset().left + $(".container").width() + 20 + "px";
    } else {
        right = "50px";
    }
    if (window.g_config === undefined || window.g_config.disableBackTop === undefined || window.g_config.disableBackTop) {
        if ($(document).scrollTop() <= 100) {
            $(".js-return-top").remove();
        } else {
            $(".js-return-top").remove();
            $("body").append('<div class="share-top js-return-top" style="bottom:120px;cursor:pointer;position:fixed;left:' + left + ';right:' + right + ';"></div>');
        }
    }
    $(document).delegate(".js-return-top", "click", function () {
        $(document).scrollTop(0);
    });
};



//消息提示窗口
var _tipHandler = function (msg, result, callback) {
    $(".J-Auth-Expired").remove();
    var icons = result == 'success' ? "share-icon-tip" : "share-icon-warning",
        tipContentDom = '<div class="small-error J-Auth-Expired"><i class="' + icons + '"></i> <span>' + msg + '</span></div>'; //提示内容控件

    $("body").append(tipContentDom);
    var width = parseInt($('.J-Auth-Expired').css("width")) + 1,
        height = parseInt($('.J-Auth-Expired').css("height")),
        marginLeft = -width / 2,
        marginTop = -height / 2 - 200;
    $(".J-Auth-Expired").css({
        height: height,
        marginLeft: marginLeft,
        marginTop: marginTop,
        width: width
    });
    setTimeout(function () {
        if (callback) {
            callback();
        } else {
            $('.J-Auth-Expired').remove();
        }
    }, 2000);
};


//ie判断
var _ieVersion = function (callback) {
    /**
     * 对ie进行监测
     */
    var ieSize;
    var bowser = navigator.appName;
    var b_version = navigator.appVersion;
    // var version=b_version.split(";");
    // var trim_Version=version[1].replace(/[ ]/g,"");
    if (bowser === "Microsoft Internet Explorer" && b_version.indexOf("MSIE 6.0") > -1) {
        ieSize = 6;
    } else if (bowser === "Microsoft Internet Explorer" && b_version.indexOf("MSIE 7.0") > -1) {
        ieSize = 7;
    }
    if (ieSize < 8) {
        callback();
        return;
    }
};

//登录失效
var _loginFail = function () {

    var content = "<div class='pop-success'>登录失效，请重新登录<span class='btn btn-orange border-radius-20 btn-full J-Sign-In'>登录</span></div>";
    var data = {
        classname: "success-info",
        title: "",
        content: content,
        marginTop: "-150px",
        marginLeft: "-180px",
        height: "300px",
        width: "360px"
    };
    $("body").append(template("common/popup/dialog", data));
    $(".J-Sign-In").click(function () {
        $.cookie('Security-Token', null, {
            path: "/"
        });
        location.href = window.g_config.ssoHost + "/sso/sign/signin.html?next=" + encodeURI(location.href) + "&label=trade";
    });


};

var opts = {
    lines: 12 // The number of lines to draw
    , length: 7 // The length of each line
    , width: 4 // The line thickness
    , radius: 10 // The radius of the inner circle
    , scale: 1 // Scales overall size of the spinner
    , corners: 1 // Corner roundness (0..1)
    , color: '#333' // #rgb or #rrggbb or array of colors
    , opacity: 0.25 // Opacity of the lines
    , rotate: 0 // The rotation offset
    , direction: 1 // 1: clockwise, -1: counterclockwise
    , speed: 1 // Rounds per second
    , trail: 60 // Afterglow percentage
    , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
    , zIndex: 2e9 // The z-index (defaults to 2000000000)
    , className: 'spinner' // The CSS class to assign to the spinner
    , top: '45%' // Top position relative to parent
    , left: '50%' // Left position relative to parent
    , shadow: false // Whether to render a shadow
    , hwaccel: false // Whether to use hardware acceleration
    , position: 'fixed' // Element positioning
}
var loadingTarget = document.body;
var spin = new Spin(opts);
var loadingCount = 0;
var loadingTimer;

//隐藏Loading
var _hideLoading = function () {
    $("#maskDiv").remove();
    spin.spin();
    clearTimeout(loadingTimer)
};

//显示loading
var _showLoading = function () {
    var html = '<div id="maskDiv" style="position:fixed;top:0px;width:100%;height:100%;background:#333;opacity:0.2;z-index:9000;"></div>';
    $("body").append(html);
    spin.spin(loadingTarget);
};



module.exports = {
    // ossHost: "http://211.152.46.44:20081",
    // memberHost: "http://211.152.46.35",
    ssoHost: "http://sso.test.1b2b.cn",
    tradeHost: "http://172.16.84.83:29050",

    /*
     * 警告框
     *
     * status   状态 success|info|error|waring
     * msg      信息
     */
    // alert: function(status, msg) {
    //     var messageDom = $('#message'),
    //         top = 0;
    //     className = 'message-success';
    //     switch (status) {
    //         case 'info':
    //             className = 'message-info';
    //             break;
    //         case 'waring':
    //             className = 'message-waring';
    //             break;
    //         case 'error':
    //             className = 'message-error';
    //             break;
    //         default:
    //             className = 'message-success';
    //             break;
    //     }
    //     if (messageDom.length === 0) {
    //         var data = {
    //             classname: className,
    //             message: msg,
    //             top: top
    //         };
    //         $('body').append(template("common/popup/message", data));
    //         $(".message-close").click(function() {
    //             $(this).parent().remove();
    //         });

    //         setTimeout(function() {
    //             messageDom = $('#message');
    //             messageDom.removeClass("message").addClass("message-out");
    //             setTimeout(function() {
    //                 messageDom.remove();
    //             }, 200);
    //         }, 3000);
    //     } else {
    //         messageDom.css('top', top);
    //         messageDom.attr('class', 'message ' + className);
    //         $('#message .message-content').text(msg);
    //     }
    // },
    /*
     * 警告框
     *
     * status   状态 success|error
     * msg      信息
     */
    toast: function (status, msg) {
        var toastDom = $('#toast'),
            top = 0,
            classname = 'success';
        switch (status) {
            case 'success':
                classname = 'success';
                break;
            case 'error':
                classname = 'error';
                break;
            default:
                classname = 'success';
                break;
        }
        if (toastDom.length === 0) {
            var data = {
                classname: classname,
                msg: msg,
            };
            toastDom = $(template("common/popup/toast", data))
            $('body').append(toastDom);
            toastDom.css('margin-left', -toastDom.outerWidth() / 2)
            toastDom.addClass('toast-enter');
            setTimeout(function () {
                toastDom.addClass("toast-leave").removeClass("toast-enter");
                setTimeout(function () {
                    toastDom.remove();
                }, 300);
            }, 3000);
        } else {
            toastDom.find('i').attr('class', 'icon-toast-' + classname);
            toastDom.find('.toast-msg').text(msg);
        }
    },
    /*
     * alert
     *
     * title 标题
     * content 内容
     * confirmCallback　确认后回调方法
     */
    alert: function (title, content, confirmCallback, classname) {
        var data = {
            classname: classname,
            title: title,
            content: content
        };
        var modal = $(template("common/popup/alert", data));
        $("body").append(modal);
        _ieVersion(function () {
            $(".J-Ie7").show();
        });
        $(modal).click(function (e) {
            if ($(e.target).closest('.modal-container')[0] != modal.find('.modal-container')[0]) {
                modal.remove();
            }
        })
        modal.find(".close, .btn").click(function () {
            var op = $(this).data('op');
            if (op === 'confirm' && confirmCallback) {
                confirmCallback();
            }
            modal.remove();
        });
    },
    /*
     * 确认框
     *
     * title 标题
     * content 内容
     * confirmCallback　确认后回调方法
     * cancelCallback 取消后回调方法
     */
    confirm: function (title, content, confirmCallback, cancelCallback, input, classname) {
        var data = {
            classname: classname,
            title: title,
            content: content,
            input: input
        };
        var modal = $(template("common/popup/confirm", data));
        $("body").append(modal);
        _ieVersion(function () {
            $(".J-Ie7").show();
        });
        modal.find(".close, .btn").click(function () {
            var op = $(this).data('op');
            if (op === 'confirm' && confirmCallback) {
                var data = modal.find('.data-input').val()
                confirmCallback(data);
            } else if (op === 'cancel' && cancelCallback) {
                cancelCallback();
            }
            modal.remove();
        });
    },
    /*
     * 处理文本输入框的placeholder
     */
    placeholder: function () {
        _placeholderHandle();
    },



    /*
     * 提示控制
     *
     * @param:
     *  msg - 提示消息
     *  result - 结果( success | warning )
     *  callback - 回调函数
     */
    tipHandler: function (msg, result, callback) {
        _tipHandler(msg, result, callback);
    },

    ieVersion: function (callback) {
        _ieVersion(callback);
    },

    // 登录失效
    loginFail: function () {
        _loginFail();
    },

    // 隐藏loading
    hideLoading: function () {
        loadingCount--;
        if(loadingCount == 0) {
            _hideLoading();
        }
    },

    // 显示loading
    showLoading: function () {
        if(loadingCount === 0) {
            _showLoading()
        }
        loadingCount++;
        clearTimeout(loadingTimer)
        loadingTimer = setTimeout(function(){
            _hideLoading();
        },10000);//超时
    }
}
