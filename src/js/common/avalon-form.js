/**
 * Created by dongwei on 16/10/8.
 */
    let utils = require('./utils'),
        ui  = require('./ui');
    var formConfig = {
        submitValues:{},
        fieldSet:{
        },
        setValues:function(values){
            if(avalon.isObject(values)){
                var self = this;
                avalon.each(values,function(key,val){
                    if(self.fieldSet[key]!=undefined){
                        if(self.fieldSet[key].vmId){
                            if(avalon.vmodels[self.fieldSet[key].vmId].setValue){
                                avalon.vmodels[self.fieldSet[key].vmId].setValue(val);
                            }else{
                                avalon.vmodels[self.fieldSet[key].vmId].value=val;
                            }
                        }else{
                            self.fieldSet[key]=val;
                        }
                    }
                });
            }
        },
        getValues:function(name){
            var self = this;
            if(name!==undefined){
                var value = '';
                if(self.fieldSet[name].vmId){
                    value=avalon.vmodels[self.fieldSet[name].vmId].value
                }else if(self.fieldSet[name].$model!==undefined){
                    value=self.fieldSet[name].$model;
                }else{
                    value=self.fieldSet[name]
                }
                return value;
            }
            var values = {};
            avalon.each(this.fieldSet,function(key,field){
                if(field!=null&&field.vmId){
                    values[key]=avalon.vmodels[field.vmId].value
                }else if(field!=null&&field.$model!==undefined){
                    values[key]=field.$model;
                }else if(field!=null){
                    values[key]=field;
                }
            });
            return values;
        },
    };
    module.exports = formConfig;