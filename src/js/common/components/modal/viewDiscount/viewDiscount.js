define([
    'jquery',
    'lib/text!./viewDiscount.tpl.html',
    'common/webapi',
],function($,tpl,webapi){
    avalon.component('cap-view-discount-modal',{
        template:tpl,
        defaults:{
            show:false,
            title:'浮动优惠政策',
            discount:{
                name:'',
                description:'',
                rules:[]
            },
            init:function(discountId) {
                var self = this;
                webapi.common.get('discounts',discountId,function(data){
                    self.discount = data;
                });
            },
            onReady:function(){
                if(this.vmId!==undefined)this.vmId=this.$id;
            }
        }
    })
});