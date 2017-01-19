define([
    'jquery',
    'lib/text!./newPreferentialFee.tpl.html',
],function($,tpl){
    avalon.component('cap-new-preferential-fee-modal',{
        template:tpl,
        defaults:{
            show:false,
            onConfirm:null,
            fee:{
                feeName:'earlybirdFee',
                fee:'',
                feeRemark:''
            },
            confirm:function(){
                if(this.onConfirm){
                    this.onConfirm(this.fee);
                }
            },
            onReady:function(){
            }
        }
    })
});