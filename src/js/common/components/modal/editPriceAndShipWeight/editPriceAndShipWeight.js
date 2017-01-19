define([
    'jquery',
    'lib/text!./editPriceAndShipWeight.tpl.html',
    'common/webapi',
    'common/ui',
    'common/avalon-validate'
], function ($, tpl, webapi, ui, validate) {
    var config = {
        template: tpl,
        defaults: {
            show: false,
            onConfirm: null,
            data: {
                unitPrice: '',
                shipmentWeight: ''
            },
            editPWValidate:{},
            floatNumberKeyPress: function (evt) {
                var theEvent = evt || window.event;
                var key = theEvent.keyCode || theEvent.which;
                if(key == 8 || key == 46){
                    return;
                }
                key = String.fromCharCode(key);
                var regex = /[0-9]|\./;
                if (!regex.test(key)) {
                    theEvent.returnValue = false;
                    if (theEvent.preventDefault) theEvent.preventDefault();
                }
            },
            confirm: function () {
                this.editPWValidate.onManual();
                var self = this;
                setTimeout(function() {
                    if(self.vreasons.length){
                        ui.toast('error','表单有误');
                    }else{
                        self.vreasons  = [];
                        if (self.onConfirm) {
                            self.onConfirm(self.data);
                        }
                    }
                }, 0);
            },
            onReady: function () {
                if (this.vmId !== undefined) this.vmId = this.$id;

                var self = this 
                this.$watch('show',function(newVal){
                    if(!newVal){
                        self.clearValidateErrors();
                    }
                })
            }
        }
    };
    config.defaults = avalon.mix(config.defaults, validate.getValidateConfig('editPWValidate'));
    avalon.component("cap-edit-price-ship-weight-modal", config);
});