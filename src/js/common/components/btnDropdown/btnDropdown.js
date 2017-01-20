let tpl = require('./btnDropdown.tpl.html');
avalon.component('cap-btn-dropdown', {
    template: tpl,
    defaults: {
        btnText: 'button',
        show: false,
        top: false,
        menus: [],
        color: 'blue',
        classes: '',
        onClick: null,
        onReady: function () {
            if (this.vmId !== undefined) this.vmId = this.$id;
            var self = this;
            $(document).click(function (e) {
                if (self.show && $(e.target).closest('.dropdown')[0] != self.$element) {
                    self.show = false;
                }
            });
        },
        toggleMenus: function () {
            this.show = !this.show;
        },
        menuClick: function (m) {
            this.show = false;
            if (this.onClick) {
                this.onClick(m);
            }
        },
    }
});
