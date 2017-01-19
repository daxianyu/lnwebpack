define([
    'jquery',
    'lib/text!./previewRoute.tpl.html',
    'common/webapi'
],function($,tpl,webapi){
    avalon.component('cap-preview-route-modal',{
        template:tpl,
        defaults:{
            show:false,
            name:'橙伊云仓广东省内运输',
            list:[],
            showPreview:function(name,fromList,toList) {
                this.name = name;
                this.fromList = fromList;
                this.toList = toList;
                this.list = [];
                for (var i = 0; i < fromList.length; i++) {
                    var from = fromList[i];
                    for (var j = 0; j < toList.length; j++) {
                        var to = toList[j];
                        this.list.push({
                            from:from,
                            to:to
                        })
                    }
                }
                this.show = true;
            },
            onReady:function(){
                if(this.vmId!==undefined)this.vmId=this.$id;
            }
        }
    })
});