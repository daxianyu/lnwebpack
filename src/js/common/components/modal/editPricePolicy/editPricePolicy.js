define([
    'jquery',
    'lib/text!./editPricePolicy.tpl.html',
    'common/webapi',
    'common/ui',
    'common/avalon-validate',
], function ($, tpl, webapi,ui,validate) {
    var config = {
        template: tpl,
        defaults: {
            show: false,
            onConfirm: null,
            title:'新增报价政策',
            discount: {
                id: '',
                name: '',
                rules: [{
                    start: '',
                    end: '',
                    ratio: '', 
                }]
            },
            addRule:function(){
                this.discount.rules.push({
                    start: '',
                    end: '',
                    ratio: '', 
                });
            },
            confirm: function () {
                if(!this.discount.rules.length){
                    ui.toast('error','至少填写一条优惠政策');
                    return;
                }
                this.newDiscountValidate.onManual();
                var self = this;
                setTimeout(function() {
                    if(self.vreasons.length){
                        ui.toast('error','表单有误');
                    }else{
                        self.vreasons  = [];
                        if (self.onConfirm) {
                            self.onConfirm(self.discount);
                        } else {
                            self.show = false;
                        }
                    }
                }, 0);
            },
            clear:function() {
                this.discount = {
                    id: '',
                    name: '',
                    rules: [{
                        start: '',
                        end: '',
                        ratio: '', 
                    }]
                }
                this.errorInputs = [];
                this.vreasons = []
            },
            floatNumberKeyPress:function(evt) {
                var theEvent = evt || window.event;
                var key = theEvent.keyCode || theEvent.which;
                if(key == 8 || key == 46){
                    return;
                }
                key = String.fromCharCode( key );
                var regex = /[0-9]|\./;
                if( !regex.test(key) ) {
                    theEvent.returnValue = false;
                    if(theEvent.preventDefault) theEvent.preventDefault();
                }
            },
            maxFormt:function(e,max) {
                if(Number(e.target.value)>max){
                    e.target.value = max
                }
            },
            onReady: function () {
                if(this.vmId!==undefined)this.vmId=this.$id;
                var self = this;
                this.$watch('discount.rules.length',function(newVal,oldVal,name){
                    setTimeout(function() {
                        $('#scroll_new_policy_'+self.$id).scrollTop($('#scroll_new_policy_'+self.$id)[0].scrollHeight)
                    }, 0);
                })
                this.$watch('show',function(newVal){
                    if(!newVal){
                        self.clearValidateErrors();
                    }
                })
            },
        }
    }
    config.defaults = avalon.mix(config.defaults, validate.getValidateConfig('newDiscountValidate'));
    avalon.component("cap-edit-price-policy-modal", config);
});