/**
 * Created by dongwei on 16/10/8.
 */

let table = require('./avalon-table'),
    formConfig = require('./avalon-form'),
    // webapi = require('./webapi'),
    ui = require('./ui'),
    utils = require('./utils');

var commonConfig = {
    $id: 'app',
    domReady: true,
    userInfo: {}, //个人信息
    requiredParams: [], //必传参数
    errorParamsUrl: null, //参数缺失跳转页面
    pageParams: {}, //传参
    loginOn401: true, //401是否跳转登录
    todoNum:0,//待办事项
    hasNewMsg:false,//是否有新消息
    readyLoad: function () {

    },

    transformParams: function (obj) {
        return JSON.stringify(obj);
    },
    toErrorParamsPage: function () {
        if (this.errorParamsUrl) {
            window.open(this.errorParamsUrl, "_self");
        }
    },
    // getTodoCount:function(){
    //     var self = this;
    //     webapi.common.getTodoCount(function(data){
    //         self.todoNum = data;
    //     })
    // },
    // getUserInfo:function(){
    //     var self = this;
    //     webapi.common.getUserInfo(function(data){
    //         if(data.name){
    //             self.userInfo.name = data.name;
    //         }else{
    //             self.userInfo.name = data.loginName;
    //         }
    //     })
    // }
};
$.fn.scrollUnique = function () {
    return $(this).each(function () {
        var eventType = 'mousewheel';
        if (document.mozHidden !== undefined) {
            eventType = 'DOMMouseScroll';
        }
        $(this).on(eventType, function (event) {
            // 一些数据
            var scrollTop = this.scrollTop,
                scrollHeight = this.scrollHeight,
                height = this.clientHeight;

            var delta = (event.originalEvent.wheelDelta) ? event.originalEvent.wheelDelta : -(event.originalEvent.detail || 0);

            if ((delta > 0 && scrollTop <= delta) || (delta < 0 && scrollHeight - height - scrollTop <= -1 * delta)) {
                // IE浏览器下滚动会跨越边界直接影响父级滚动，因此，临界时候手动边界滚动定位
                this.scrollTop = delta > 0 ? 0 : scrollHeight;
                // 向上滚 || 向下滚
                event.preventDefault();
            }
        });
    });
};
module.exports =  {
    init: function (config) {
        // avalon.config({
        //     debug: false
        // })
        if (!avalon) return;
        config = avalon.mix({}, commonConfig, config);
        if (config.tableUrl != undefined) config = avalon.mix({}, table.config, config);
        if (config.fieldSet != undefined) config = avalon.mix({}, formConfig, config);

        // avalon.log(config);
        var vm = avalon.define(config);
        window.vm = vm;
        var paramsStr = window.location.search;
        if (paramsStr) {
            vm.pageParams = JSON.parse(decodeURI(paramsStr.substr(1, paramsStr.length)));
        }
        if (vm.requiredParams.length > 0) {
            avalon.each(vm.requiredParams, function (index, rp) {
                if (typeof rp == 'string' && vm.pageParams[rp] === undefined) {
                    vm.toErrorParamsPage();
                }
            });
        }
        // $.cookie('Security-Token', '%7B%22loginName%22%3A%22use13588888889%22%2C%22roles%22%3A%22logistic%22%2C%22system%22%3A%22witch%22%2C%22ticket%22%3A%220hmmqyIUFOE0FJWoXYcjkCeoSZ9SE04xyafihDblwBAs8KiK1kwIMk4vVGL2Cu%252FJuULgpxCKWz8EnSWljx0fWA%253D%253D%22%7D', {
        //     path: "/"
        // });
        /* @cookie comment */
        // document.cookie ='Security-Token=%7B%22loginName%22%3A%22captain1000004%22%2C%22roles%22%3A%22owner%22%2C%22system%22%3A%22captain%22%2C%22ticket%22%3A%22Ec7QySBlWbB5nLf9%252F%252FkEyOZEwegI6hrs11lEEBabvkmrdFpmuoB146vHvQ58YCiLukMHWjNvsccPxxYR9GoRBQ%253D%253D%22%7D'
        // /*  */
        // var securityToken = $.cookie("Security-Token");
        // if (securityToken == null) {
        //     securityToken = "";
        // }
        // if (securityToken == "") {
        //     //跳转登录页
        //     location.href='/logout';
        //     // location.href='http://dev.captain.useonline.cn/login';
        // } else {
        //     vm.userInfo = JSON.parse(securityToken);
        //     if(!vm.userInfo.roles){
        //         ui.alert('系统错误','系统升级，请重新登录!',function() {
        //             location.href='/logout';
        //         });
        //     }
        //     else if(vm.userInfo.roles!='logistic'&&vm.userInfo.roles!='owner'&&vm.userInfo.roles!='platform'){
        //         ui.alert('权限错误','当前用户角色暂未开放管理控制台!');
        //     }else{
        //         vm.getTodoCount();
        //         vm.getUserInfo();
        //         setTimeout(function(){
        //             vm.readyLoad.call(vm);
        //         },0);
        //     }
        // }

        vm.readyLoad.call(vm);

        if (config.tableUrl != undefined) table.ready(vm);
        // window.vm = vm;
        avalon.scan(document.body);
        // vm.readyLoad.call(vm)


        //处理favicon显示
        utils.showRedFavicon(false);//默认无红点

        //处理网页title标题
        utils.initTitle();

        vm.$watch('hasNewMsg',function(newVal){
            utils.showRedFavicon(newVal);
            utils.newMsgFlag = newVal;
        });

        return vm;
    }
}
