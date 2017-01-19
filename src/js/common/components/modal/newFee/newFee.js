define([
    'jquery',
    'lib/text!./newFee.tpl.html',
    'common/apis/settlementApi',
    'common/avalon-validate',
    'common/ui'
],function($,tpl,settlementApi,validate,ui){
    var config = {
        template:tpl,
        defaults:{
            show:false,
            onConfirm:null,
            fee:{
                fee:'',
                feeRemark:'',
                feeName:'',
                feeNameText:''
            },
            feeCategory:{
                value:'',
                filterBy:'',
                textField:'feeNameText',
                valueField:'feeName',
                vmId:null,
                placeholder:'选择费用类型',
            },
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
            setFeeCategory:function(options) {
                avalon.vmodels[this.feeCategory.vmId].setOptions(options);
            },
            clear:function() {
                this.fee={
                    fee:'',
                    feeRemark:'',
                    feeName:'',
                    feeNameText:''
                }
            },
            hide:function() {
                this.show = false;
                this.clear();
            },
            confirm:function(){
                this.newFeeValidate.onManual();
                var self = this;
                setTimeout(function() {
                    if(self.vreasons.length){
                        ui.toast('error','表单有误');
                    }else{
                        self.vreasons  = [];
                        if(self.onConfirm){
                            self.fee.feeName = self.feeCategory.value;
                            self.fee.feeNameText = self.feeCategory.filterBy
                            self.onConfirm(self.fee);
                        }
                    }
                }, 0);
            },
            onReady:function(){
                if(this.vmId!==undefined)this.vmId=this.$id;

                var self = this 
                this.$watch('show',function(newVal){
                    if(!newVal){
                        self.clearValidateErrors();
                    }
                })
            },
        }
    }
    config.defaults = avalon.mix(config.defaults, validate.getValidateConfig('newFeeValidate'));
    avalon.component("cap-new-fee-modal", config);
});