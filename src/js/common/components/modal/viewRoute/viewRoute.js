define([
    'jquery',
    'lib/text!./viewRoute.tpl.html',
    'common/webapi'
],function($,tpl,webapi){
    avalon.component('cap-view-route-modal',{
        template:tpl,
        defaults:{
            show:false,
            title:'橙伊云仓广东省内运输',
            desc:'起运地',
            addresses:[],
            setAddresses:function(addresses) {
                this.addresses = addresses;
            },
            onReady:function(){
                if(this.vmId!==undefined)this.vmId=this.$id;
            },
            hasPreviousSame:function(index,field){
                if(index==0){
                    return false;
                }
                if(this.addresses[index][field]==this.addresses[index-1][field]){
                    return true;
                }else{
                    return false;
                }
            },
            rowspanCount:function(index,field) {
                var rowspan = 1
                for(var i = index+1;i<this.addresses.length;i++){
                    if(this.addresses[index][field]==this.addresses[i][field]){
                        rowspan++;
                        continue;
                    }else{
                        break;
                    }
                }
                return rowspan;
            }
        }
    })
});