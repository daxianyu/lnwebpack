let tpl = require('./topMenu.tpl.html'),
    menus = require('./config');
avalon.component('cap-top-menu', {
    template: tpl,
    defaults: {
        menu: [],                //目录数据
        onReady: function () {
            this.menu = menus[this.userInfo.roles]
        }
    }
})
