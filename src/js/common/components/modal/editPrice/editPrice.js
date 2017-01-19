define([
    'jquery',
    'lib/text!./editPrice.tpl.html',
    'common/webapi',
    'common/ui',
    'common/utils',
    'common/avalon-validate'
],function($,tpl,webapi,ui,utils,validate){
    var config = {
        template:tpl,
        defaults:{
            show:false,
            title:'',
            isNew:'false',
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
            tagPicker:{
                textField:'name',
                valueField:'code',
                vmId:null,
                placeholder:'请选择'
            },
            unitSelectConfig:{
                textField:'name',
                valueField:'name',
                vmId:null,
                value:'',
                placeholder:'请选择'
            },
            discountSelectConfig:{
                textField:'name',
                valueField:'id',
                vmId:null,
                value:'',
                placeholder:'请选择'
            },
            productSelectConfig:{
                textField:'name',
                valueField:'name',
                vmId:null,
                value:'',
                placeholder:'请选择'
            },
            dayConfig:{
                textField:'name',
                valueField:'value',
                items:[
                    {name:'一周',value:7},
                    {name:'一个月',value:30},
                    {name:'三个月',value:90},
                    {name:'六个月',value:180},
                    {name:'一年',value:365}
                ],
                vmId:null,
                value:'',
                placeholder:'请选择'
            },
            onSuccess:null,
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
            addPrice:function(){
                // this.price.priceQuotes.push({calCategory:'100',calCategoryText:'吨计',minWei:1,unitPrice:1,unit:'吨'});
                if(this.price.priceQuotes.length&&this.price.priceQuotes.length==3){
                    ui.toast('error','最多添加3条报价');
                    return;
                }

                if(!this.price.priceQuotes){
                    this.price.priceQuotes = [];
                }
                var pq = {
                    calCategory:'100',
                    minWei:1,
                    unitPrice:1,
                    unit:''
                }
                this.addPriceQuote(pq);
            },
            delPrice:function(index,option){
                $('#unit_select_'+index+this.$id).remove() //for ie firefox widget can't be removed correctly
                this.price.priceQuotes.remove(option);
            },
            submit:function(){
                var pickedItems = avalon.vmodels[this.tagPicker.vmId].pickedItems;
                if(!pickedItems.length){
                    ui.toast('error','请选择可运货物');
                    return 
                }
                if(!this.price.priceQuotes || this.price.priceQuotes.length==0){
                    ui.toast('error','至少包含一项报价');
                    return 
                }
                //validate
                this.editPriceValidate.onManual();
                var self = this;

                setTimeout(function() {
                    if(self.vreasons.length){
                        ui.toast('error','表单有误');
                    }else{
                        self.vreasons  = [];
                        var obj = {};
                        obj.id = self.price.id;
                        // obj.agreementId = self.price.agreementId;
                        obj.discountId = self.discountSelectConfig.value;
                        obj.days = self.dayConfig.value;

                        var priceQuotes = [];
                        for (var i = 0; i < self.price.priceQuotes.length; i++) {
                            var pq = self.price.priceQuotes[i];
                            priceQuotes.push({
                                calCategory:pq.unitSelectConfig.value,
                                minWei:pq.minWei,
                                unitPrice:pq.unitPrice
                            })
                        }
                        obj.priceQuotes = priceQuotes;

                        var strArr = [];
                        avalon.each(pickedItems,function(key,val){
                            strArr.push(val['code']);
                        });
                        obj.productCategorys = strArr;

                        webapi.common.edit('price',obj,function(data){
                            ui.toast("info","操作成功");
                            self.show = false;
                            if(self.onSuccess){
                                self.onSuccess();
                            }
                        });
                    }
                }, 0);
            },
            addPriceQuote:function(pq) {
                var self = this;
                var index = this.price.priceQuotes.length;
                pq.unitSelectConfig={
                    textField:'name',
                    valueField:'id',
                    items:[{id:'100',name:'吨计'},{id:'200',name:'柜计'},{id:'300',name:'整车计'}],
                    value:'',
                    vmId:null,
                    onChange:function(item) {
                        for (var i = 0; i < self.price.priceQuotes.length; i++) {
                            if(i!=index){
                                var p = self.price.priceQuotes[i];
                                if(p.unitSelectConfig.value == item.id){
                                    ui.toast('error',item.name+'报价已存在')
                                    avalon.vmodels[self.price.priceQuotes[index].unitSelectConfig.vmId].setValue(null);
                                    return;
                                }
                            }
                        }
                        switch (item.id) {
                            case '100':
                                self.price.priceQuotes[index].unit = '吨'
                                break;
                            case '200':
                                self.price.priceQuotes[index].unit = '柜'
                                break;
                            case '300':
                                self.price.priceQuotes[index].unit = '车'
                                break;
                            default:
                                break;
                        }
                    }
                }
                this.price.priceQuotes.push(pq)
            },
            getAddress:function(address){
                return utils.getAddress(address);
            },
            init:function(price,isNew){
                this.isNew = isNew;

                for (var i = 0; i < this.price.priceQuotes.length; i++) {//for ie firefox widget can't be removed correctly
                    $('#unit_select_'+i+this.$id).remove()
                }

                this.price.priceQuotes = [];
                this.price.id = price.id;
                this.price.agreementId = price.agreementId;
                this.price.groupName = price.groupName;
                this.price.fromAddress = price.fromAddress;
                this.price.toAddress = price.toAddress;
                var priceQuotes = [];
                var self = this;
                setTimeout(function() {
                    if(price.priceQuotes){
                        for (var i = 0; i < price.priceQuotes.length; i++) {
                            var index = i;
                            var pq = price.priceQuotes[i];
                            self.addPriceQuote(pq);
                        }
                    }
                    // this.price.priceQuotes = priceQuotes;
                    for (var i = 0; i < self.price.priceQuotes.length; i++) {
                        var p = self.price.priceQuotes[i];
                        avalon.vmodels[p.unitSelectConfig.vmId].setValue(p.calCategory);
                    }
                }, 0);
                
                if(price.productCategorys){
                    avalon.vmodels[this.tagPicker.vmId].pickedItems = price.productCategorys;
                }else{
                    avalon.vmodels[this.tagPicker.vmId].pickedItems = [];
                }

                avalon.vmodels[this.discountSelectConfig.vmId].setValue(price.discountId);
                avalon.vmodels[this.dayConfig.vmId].setValue(price.days);
                // this.discountSelectConfig.value = price.discountId;
                // this.dayConfig.value = price.days;
            },
            onReady:function(){
                if(this.vmId!==undefined)this.vmId=this.$id;
                var self = this;
                webapi.common.list('discounts',{page:1,pageSize:999},function(data){
                    avalon.vmodels[self.discountSelectConfig.vmId].setOptions(data.dataList);
                });
                webapi.common.list('allProducts',{},function(data){
                    avalon.vmodels[self.tagPicker.vmId].setOptions(data.root.children)
                });

                this.$watch('show',function(newVal){
                    if(!newVal){
                        self.clearValidateErrors();
                    }
                })
                // avalon.vmodels[self.unitSelectConfig.vmId].setOptions([{id:100,name:'吨计'},{id:200,name:'柜计'},{id:300,name:'整车计'}]);
            }
        }
    }
    config.defaults = avalon.mix(config.defaults, validate.getValidateConfig('editPriceValidate'));
    avalon.component("cap-edit-price-modal", config);
});