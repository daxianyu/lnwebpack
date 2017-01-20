let tpl = require('./menu.tpl.html'),
    menus = require('./menuConfig');
avalon.component('cap-menu', {
    template: tpl,
    defaults: {
        current: '',
        menu: [],                //目录数据
        onReady: function () {
            this.menu = menus[this.userInfo.roles]
            var has = false;
            var self = this;
            avalon.each(this.menu, function (index, item) {
                if (item.children) {
                    has = false;
                    avalon.each(item.children, function (index, item) {
                        if (item.name == self.current) {
                            has = true;
                        }
                    });
                    if (has)item.expand = true;
                }
            });
        }
    }
})
