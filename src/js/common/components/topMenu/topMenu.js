define([
    'jquery',
    'lib/text!./topMenu.tpl.html',
    './config'
],function($,tpl,menus){
    avalon.component('cap-top-menu',{
        template:tpl,
        defaults:{
            menu:[],                //目录数据
            onReady:function(){
                this.menu = menus[this.userInfo.roles]
            }
        }
    })
});