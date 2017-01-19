define([
    'jquery',
    'lib/text!./viewPrice.tpl.html',
    'common/webapi',
    'common/ui',
    'common/utils',
],function($,tpl,webapi,ui,utils){
    avalon.component('cap-view-price-modal',{
        template:tpl,
        defaults:{
            show:false,
            title:'查看报价',
            isView:true,//true - 查看; false - 审核
            price: {
                id:'',
                agreementId:'',
                groupName: "",
                priceRouteId:'',
                discountId:'',
                discountName:'',
                days:'',
                fromAddress: {
                },
                toAddress: {
                },
                priceQuotes: [
                ],
                productCategorys: [
                ]
            },
            msg:'',
            getAddress:function(address){
                return utils.getAddress(address);
            },
            init:function(price){
                // this.price = price;
                var self = this;
                avalon.each(price,function(key,val){
                    self.price[key] = val;
                });
            },
            submit:function(b){
                //审核
                var id = this.price.priceRouteId;
                var self = this;
                var msg = b ? '通过' : '不通过';
                ui.confirm('提示','是否确认' + msg + '?',function (data) {
                    webapi.route.auditPrice(id, {msg: this.msg, ok: b}, function () {
                        ui.toast('info', '操作成功');
                        self.show = false;
                        if (self.onConfirm) {
                            self.onConfirm();
                        }
                    });
                },function(){

                });
            },
            onReady:function(){
                if(this.vmId!==undefined)this.vmId=this.$id;
                var self = this;

                this.$watch('show',function(newVal,oldVal){
                    if(newVal){
                        setTimeout(function(){
                            var modalDom = self.$element.getElementsByClassName('modal-container')[0];
                            var modalHeight = $(modalDom).height();
                            var clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight: document.documentElement.clientHeight;
                            var m_top = (clientHeight - modalHeight)/2;
                            m_top = m_top > 0 ? m_top : 50;
                            console.log("clientHeight : " + clientHeight);
                            console.log("modalHeight : " + modalHeight);
                            console.log("m_top : " + m_top);
                            $(modalDom).css({'margin': m_top + 'px auto','max-height':(clientHeight-m_top*2)+'px','overflow-y':'auto','overflow-x':'hidden'});
                        },100);
                    }
                })
            }
        }
    })
});