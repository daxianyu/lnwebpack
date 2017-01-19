define([
    'jquery',
    'lib/text!./chooseRoute.tpl.html',
    'common/webapi',
    'common/utils',
    'common/ui',
],function($,tpl,webapi,utils,ui){
    avalon.component('cap-choose-route-modal',{
        template:tpl,
        defaults:{
            show:false,
            title:'',
            tab:{
                options:[{text:'路线名',value:'100'},{text:'路线列表',value:'200'}],
                value:'100',
                type:'blueBottom',
                onChange:function(value){

                }
            },
            routeSelect:{
                valueField:'optionId',
                textField:'name',
                value:'',
                vmId:null,
                enableFilter:true,
                placeholder:'可输入线路名或装卸货地名称搜索',
                onChange:function(option){
                    this.addOption(option);
                    avalon.vmodels['routeSelect'].onClear();
                }
            },
            routeOptions:{
                routeList:[
                    // {
                    //     id:1,
                    //     groupName:'线路名1',
                    //     children:[
                    //         {
                    //             id:1,
                    //             fromAddress: {
                    //                 "provinceName": "天津市",
                    //                 "cityName": "天津市",
                    //                 "districtName": "塘沽区",
                    //                 "level": 3,
                    //             },
                    //             toAddress: {
                    //                 "provinceName": "天津市",
                    //                 "cityName": "天津市",
                    //                 "districtName": "汉沽区",
                    //                 "level": 3,
                    //             },
                    //             selected:false
                    //         }, {
                    //             id:2,
                    //             fromAddress: {
                    //                 "provinceName": "天津市2",
                    //                 "cityName": "天津市",
                    //                 "districtName": "塘沽区",
                    //                 "level": 3,
                    //             },
                    //             toAddress: {
                    //                 "provinceName": "天津市2",
                    //                 "cityName": "天津市",
                    //                 "districtName": "汉沽区",
                    //                 "level": 3,
                    //             },
                    //             selected:false
                    //         }, {
                    //             id:3,
                    //             fromAddress: {
                    //                 "provinceName": "天津市3",
                    //                 "cityName": "天津市",
                    //                 "districtName": "塘沽区",
                    //                 "level": 3,
                    //             },
                    //             toAddress: {
                    //                 "provinceName": "天津市3",
                    //                 "cityName": "天津市",
                    //                 "districtName": "汉沽区",
                    //                 "level": 3,
                    //             },
                    //             selected:false
                    //         }
                    //     ],
                    //     selected:false
                    // }
                ],
                activeIndex:0,
                selectedOptions:[],//选中列表
                allOptions:[],//所有选项列表(包含路线组、子路线)
            },
            showChildren:function(index){
                if(this.routeOptions.activeIndex != index){
                    this.routeOptions.activeIndex = index;
                }
            },
            selectItem:function(option){
                option.selected = !option.selected;//设置本身的select

                if(option.selected){
                    this.addOption(option);
                }else{
                    this.removeOption(option);
                }
            },
            deleteOption:function(option){
                option.selected = false;//设置本身的select

                // console.log("this.routeOptions.selectedOptions: " + JSON.stringify(this.routeOptions.selectedOptions));
                // console.log("this.routeOptions.routeList: " + JSON.stringify(this.routeOptions.routeList));

                this.removeOption(option);
            },
            //添加到已选列表
            addOption:function(option){
                //改变selectedOptions
                var arr = this.routeOptions.selectedOptions;
                if(!this.checkContain(option)){
                    arr.push(option);
                }

                //改变routeList中的selected状态
                avalon.each(this.routeOptions.routeList,function(key,val){
                    if(option.children){
                        if(val.id == option.id){
                            val.selected = true;
                        }
                    }else{
                        avalon.each(val.children,function(key2,val2){
                            if(val2.id == option.id){
                                val2.selected = true;
                            }
                        });
                    }
                });
            },
            //从已选列表中移除
            removeOption:function(option){
                var arr = this.routeOptions.selectedOptions;
                if(this.checkContain(option)){
                    //改变selectedOptions
                    var index = this.indexOfOptions(option);
                    arr.splice(index,1);

                    //改变routeList中的selected状态
                    avalon.each(this.routeOptions.routeList,function(key,val){
                         if(option.children){
                             if(val.id == option.id){
                                 val.selected = false;
                             }
                         }else{
                            avalon.each(val.children,function(key2,val2){
                               if(val2.id == option.id){
                                   val2.selected = false;
                               }
                            });
                         }
                    });
                }
            },
            //返回option在已选列表中的index
            indexOfOptions:function(option){
                var index = -1;
                if(option.children){
                    avalon.each(this.routeOptions.selectedOptions,function(key,val){
                        if(val.children && val.id == option.id){
                            index = key;
                        }
                    });
                }else{
                    avalon.each(this.routeOptions.selectedOptions,function(key,val){
                        if(!val.children && val.id == option.id){
                            index = key;
                        }
                    });
                }

                return index;
            },
            //检查option是否已在已选列表中
            checkContain:function(option){
                return this.indexOfOptions(option) != -1;
            },
            getItemText:function(item){
                if(item.children){
                    return item.groupName;
                }else{
                    if(item.fromAddress && item.toAddress){
                        return item.fromAddress.districtName + " 到 " + item.toAddress.districtName;
                    }else{
                        return '错误路线';
                    }
                }
            },
            getAddress:function(address){
                return utils.getAddress(address);
            },
            init:function(data){
                var self = this;
                this.routeOptions.allOptions = [];

                //对数据添加selected属性的监听
                var optionId = 0;
                avalon.each(data,function(key,val){
                    val.selected = false;
                    val.optionId = ++optionId;
                    val.name = val.groupName;//设置统一name,以便在搜索列表中筛选
                    self.routeOptions.allOptions.push(val);
                    avalon.each(val.children,function(key2,val2){
                        if(val2.fromAddress && val2.toAddress){
                            val2.selected = false;
                            val2.optionId = ++optionId;
                            val2.name = val2.fromAddress.districtName + ' 到 ' + val2.toAddress.districtName;
                            self.routeOptions.allOptions.push(val2);
                        }
                    });
                });
                avalon.vmodels['routeSelect'].setOptions(this.routeOptions.allOptions);

                this.routeOptions.routeList = data;
            },
            submit:function(){
                var self = this;
                var routeIds = [];
                avalon.each(this.routeOptions.selectedOptions,function(key,val){
                    if(val.children){
                        avalon.each(val.children,function(key2,val2){
                            routeIds.push(val2.id);
                        });
                    } else{
                        routeIds.push(val.id);
                    }
                });
                if(routeIds.length == 0){
                    ui.toast("error","请选择路线");
                    return;
                }
                var obj = {id:this.pageParams.id,transportRouteIds : routeIds};
                webapi.discount.applyRoutes(obj,function(data){
                    ui.toast("success","添加成功");
                    self.show = false;
                    if(self.onConfirm){
                        self.onConfirm();
                    }
                });
            },
            onReady:function(){
                if(this.vmId!==undefined)this.vmId=this.$id;

                // var self = this;
                // this.$watch("routeOptions.routeList.length", function (newVal, oldVal, name) {
                //     avalon.each(self.routeOptions.routeList,function(key,val){
                //         if(val.children){
                //             avalon.each(val.children,function(key2,val2){
                //                 val2.selected = false;
                //             });
                //         }
                //     });
                // })
            }
        }
    })
});