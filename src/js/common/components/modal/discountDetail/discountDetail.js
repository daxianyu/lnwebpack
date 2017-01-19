define([
    'jquery',
    'lib/text!./discountDetail.tpl.html',
    'common/webapi'
], function ($, tpl, webapi) {
    avalon.component('cap-discount-detail-modal', {
        template: tpl,
        defaults: {
            show: false,
            onConfirm: null,
            discount: {
                id: '',
                name: '',
                rules: []
            },
            confirm: function () {
                if (this.onConfirm) {
                    this.onConfirm(this.discount);
                } else {
                    this.show = false;
                }
            },
            onReady: function () {
                if (this.vmId !== undefined) this.vmId = this.$id;
                var self = this;
            },
        }
    })
});