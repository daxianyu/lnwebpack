define([
    'jquery',
    'lib/text!./modal.tpl.html',
], function ($, tpl) {

    avalon.component('cap-modal', {
        template: tpl,
        defaults: {
            show: false,
            blurCloseable:true,
            onReady: function () {
                var self = this;
                $('.modal-mask').click( function (e) {
                    if (self.blurCloseable&&self.show&&$(e.target).closest('.modal-container')[0] != $(self.$element).find('.modal-container')[0]) {
                        self.show = false;
                    }
                });
            }
        }
    })
});
