define([
    'jquery',
    'lib/text!./editRoute.tpl.html',
    'common/webapi',
],function($,tpl,webapi){
    avalon.component('cap-edit-route-modal',{
        template:tpl,
        defaults:{
            show:false,
            title:'新增路线',
            route:{
                id:'',
                agreementId:'',
                discountId:'',
                fromCode:'',
                from:'',
                goodsCategory:'',
                minWei:'',
                toCode:'',
                to:'',
                unitPrice:''
            },
            discountSelectConfig:{
                textField:'name',
                valueField:'id',
                vmId:null,
                value:'',
                enableFilter:true,
                placeholder:'请选择'
            },
            productSelectConfig:{
                textField:'name',
                valueField:'name',
                vmId:null,
                value:'',
                enableFilter:true,
                placeholder:'请选择'
            },
            fromCascaderConfig:{
                value:'',
                vmId:null,
            },
            toCascaderConfig:{
                value:'',
                vmId:null,
            },
            onConfirm:null,
            clear:function(){
                this.route = {
                    id:'',
                    agreementId:'',
                    discountId:'',
                    fromCode:'',
                    from:'',
                    goodsCategory:'',
                    minWei:'',
                    toCode:'',
                    to:'',
                    unitPrice:''
                }
            },
            confirm:function(){
                if (this.onConfirm) {
                    this.route.fromCode = this.fromCascaderConfig.value;
                    this.route.toCode = this.toCascaderConfig.value;
                    this.route.goodsCategory = this.productSelectConfig.value;
                    this.route.discountId = this.discountSelectConfig.value;
                    this.onConfirm(this.route);
                } else {
                    this.show = false;
                }
            },
            setIds:function(did,pid){
                this.discountSelectConfig.value = did;
                this.productSelectConfig.value = pid;
            },
            onReady:function(){
                if(this.vmId!==undefined)this.vmId=this.$id;
                var self = this;
                webapi.common.list('discounts',{page:1,pageSize:999},function(data){
                    avalon.vmodels[self.discountSelectConfig.vmId].setOptions(data.dataList)
                })
                webapi.common.list('allProducts',{},function(data){
                    avalon.vmodels[self.productSelectConfig.vmId].setOptions(data.root.children)
                })
                webapi.common.list('routeAddress',{},function(data){
                    avalon.vmodels[self.fromCascaderConfig.vmId].setOptions(data.children)
                    avalon.vmodels[self.toCascaderConfig.vmId].setOptions(data.children)
                })
            },
        }
    })
});