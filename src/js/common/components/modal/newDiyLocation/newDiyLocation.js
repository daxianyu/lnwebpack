define([
    'jquery',
    'lib/text!./newDiyLocation.tpl.html',
    'common/webapi',
    'common/ui'
],function($,tpl,webapi,ui){
    avalon.component('cap-new-diy-location-modal',{
        template:tpl,
        defaults:{
            show:false,
            title:'',
            isLong:true,
            typeConfig:{
                textField:'name',
                valueField:'id',
                items:[{name:'区县级',id:3},{name:'乡镇级',id:4}],
                vmId:null,
                value:'',
                placeholder:'请选择',
                onChange:function(item) {
                }
            },
            addressSet:{},
            locationConfig:{
                value:'',
                vmId:null,
            },
            location:{
                id:'',
                name:'',
                address:'',
                addressCode:'',
            },
            setLocation:function(location) {
                this.location = location;
                //set type set address code
                // if(location.districtCode){ //乡镇级
                //     avalon.vmodels[this.typeConfig.vmId].setValue(2)
                //     avalon.vmodels[this.locationConfig.vmId].setOptions(this.addressSet['2'])
                //     var codes = [location.provinceCode,location.cityCode,location.districtCode];
                //     avalon.vmodels[this.locationConfig.vmId].setLocation(codes);
                // }else{ //区级
                //     avalon.vmodels[this.typeConfig.vmId].setValue(1)
                //     avalon.vmodels[this.locationConfig.vmId].setOptions(this.addressSet['1'])
                //     var codes = [location.provinceCode,location.cityCode];
                //     avalon.vmodels[this.locationConfig.vmId].setLocation(codes);
                // }
                avalon.vmodels[this.typeConfig.vmId].setValue(Number(location.level))
                var codes = [location.provinceCode,location.cityCode,location.districtCode];
                avalon.vmodels[this.locationConfig.vmId].setLocation(codes);
            },
            onSuccess:null,
            onReady:function(){
                if(this.vmId!==undefined)this.vmId=this.$id;
                var self = this;
                // webapi.common.list('area',{startLevel:1,endLevel:2},function(data) {
                //     self.addressSet['1'] = data.children;
                // });
                // webapi.common.list('area',{startLevel:1,endLevel:3},function(data) {
                //     self.addressSet['2'] = data.children;
                // });
                // this.$watch("typeConfig.value",function(newVal,oldVal,name){
                //     avalon.vmodels[self.locationConfig.vmId].setOptions(self.addressSet[newVal])
                // })
                webapi.common.list('area',{startLevel:1,endLevel:3},function(data) {
                    avalon.vmodels[self.locationConfig.vmId].setOptions(data.children)
                });

                this.$watch('show',function(newVal) {
                    if(!newVal){
                        avalon.vmodels[this.locationConfig.vmId].clear();
                        avalon.vmodels[this.typeConfig.vmId].setValue(null)
                    }
                })
            },
            clear:function() {
                this.location = {
                    id:'',
                    name:'',
                    address:'',
                    addressCode:'',
                }
            },
            submit:function() {
                this.location.addressCode = this.locationConfig.value;
                this.location.level = this.typeConfig.value;
                var self =this;
                if(this.location.id){
                    webapi.common.edit('routeEntrepot',this.location,function(data) {
                        ui.toast('info','修改成功')
                        self.show = false;
                        self.clear()
                        if(self.onSuccess){
                            self.onSuccess(self.location);
                        }
                    })
                }else{
                    webapi.common.add('routeEntrepot',this.location,function(data) {
                        ui.toast('info','添加成功')
                        self.show = false;
                        self.clear();
                        if(self.onSuccess){
                            self.onSuccess(self.location);
                        }
                    })
                }
            }
        }
    })
});