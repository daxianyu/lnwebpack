define([
],function(){
    var menus = {
        'owner':[{
            text:'待办事项',
            name:'todo',
            iconClass:'icon-info',
            url:'/html/todo/todo.html'
        },{
            text:'结算中心',
            name:'settlement',
            iconClass:'icon-credit',
            expand:false,
            children:[{
                text:'结算列表',
                name:'settlementList',
                url:'/html/owner/settlement/list.html'
            }]
        },{
            text:'企业中心',
            name:'enterprise',
            iconClass:'icon-package',
            expand:false,
            children:[
            //     {
            //     text:'协议管理',
            //     name:'agreementManage',
            //     url:'/html/owner/enterprise/agreementManage.html'
            // },
            {
                text:'组织机构管理',
                name:'organization',
                url:'/html/enterprise/organization.html'
            }]
        }],
        'logistic':[{
            text:'待办事项',
            name:'todo',
            iconClass:'icon-info',
            url:'/html/todo/todo.html'
        },{
            text:'结算中心',
            name:'settlement',
            iconClass:'icon-credit',
            expand:false,
            children:[{
                text:'结算列表',
                name:'settlementList',
                url:'/html/logistic/settlement/list.html'
            }]
        },{
            text:'路线与报价管理',
            name:'transport',
            iconClass:'icon-transport',
            expand:false,
            children:[{
                text:'路线管理',
                name:'routeManage',
                url:'/html/logistic/route/routemanage/routeManage.html'
            },{
                text:'运价管理',
                name:'priceManage',
                url:'/html/logistic/route/priceManage.html'
            },{
                text:'浮动报价政策',
                name:'discount',
                url:'/html/logistic/route/pricePolicyList.html'
            }
            // ,{
            //     text:'普通路线',
            //     name:'normalRoute',
            //     url:'/html/logistic/route/normalRoute.html'
            // },{
            //     text:'协议路线',
            //     name:'agreementRoute',
            //     url:'/html/logistic/route/agreementRoute.html'
            // }
            ]
        },{
            text:'运力资源管理',
            name:'resource',
            iconClass:'icon-vehicle',
            expand:false,
            children:[{
                text:'司机及车辆管理',
                name:'driverVehicleManage',
                url:'/html/logistic/resource/driverVehicleManage.html'
            },{
                text:'gps管理',
                name:'gpsManage',
                url:'/gps/gpsdevices'
            }]
        },{
            text:'企业中心',
            name:'enterprise',
            iconClass:'icon-package',
            expand:false,
            children:[{
                text:'组织机构管理',
                name:'organization',
                url:'/html/enterprise/organization.html'
            }]
        }],
        'platform':[{
            text:'待办事项',
            name:'todo',
            iconClass:'icon-info',
            url:'/html/todo/todo.html'
        },{
            text:'工单管理',
            name:'workOrderManage',
            iconClass:'icon-workOrder',
            expand:false,
            children:[{
                text:'询价工单',
                name:'inquiryWorkOrder',
                url:'/html/platform/workOrder/inquiryWorkOrder.html'
            },{
                text:'异常工单',
                name:'abnormalWorkOrder',
                url:'/support/list'
            }]
        },{
            text:'结算中心',
            name:'settlement',
            iconClass:'icon-credit',
            expand:false,
            children:[{
                text:'货主结算',
                name:'ownerSettlement',
                url:'/html/platform/settlement/ownerSettlement.html'
            },{
                text:'车队结算',
                name:'fleetSettlement',
                url:'/html/platform/settlement/fleetSettlement.html'
            }]
        },{
            text:'物流公司资源',
            name:'logisticResource',
            iconClass:'icon-switch',
            expand:false,
            children:[{
                text:'线路报价',
                name:'platformLogisticRoutePrice',
                url:'/html/platform/logisticResource/priceManage.html'
            },{
                text:'自定义装卸点',
                name:'platformLogisticDiyLocation',
                url:'/html/platform/logisticResource/diyLocation.html'
            }]
        },{
            text:'路线与报价管理',
            name:'transport',
            iconClass:'icon-transport',
            expand:false,
            children:[{
                text:'自营路线管理',
                name:'routeManage',
                url:'/html/logistic/route/routemanage/routeManage.html'
            },{
                text:'自营运价管理',
                name:'priceManage',
                url:'/html/logistic/route/priceManage.html'
            }]
        },{
            text:'运力资源管理',
            name:'resource',
            iconClass:'icon-vehicle',
            expand:false,
            children:[{
                text:'司机及车辆管理',
                name:'driverVehicleManage',
                url:'/html/logistic/resource/driverVehicleManage.html'
            },{
                text:'gps管理',
                name:'gpsManage',
                url:'/gps/gpsdevices'
            }]
        },
        // {
        //     text:'货运险管理',
        //     name:'insure',
        //     iconClass:'icon-insure',
        //     url:'/html/platform/insure/insure.html'
        // },
        // {
        //     text:'会员管理',
        //     name:'member',
        //     iconClass:'icon-members',
        //     expand:false,
        //     children:[{
        //         text:'货主会员',
        //         name:'ownerMember',
        //         url:'/html/platform/member/ownerMember.html'
        //     },{
        //         text:'物流公司',
        //         name:'logisticComMemeber',
        //         url:'/html/platform/member/logisticComMemeber.html'
        //     },{
        //         text:'司机会员',
        //         name:'driverMember',
        //         url:'/html/platform/member/driverMember.html'
        //     },{
        //         text:'会员协议管理',
        //         name:'memberAgreement',
        //         url:'/html/platform/member/memberAgreement.html'
        //     }]
        // },
        {
            text:'平台管理',
            name:'platformManage',
            iconClass:'icon-tie',
            expand:false,
            children:[{
                text:'组织机构管理',
                name:'organization',
                url:'/html/enterprise/organization.html'
            }]
        }]
    }

    return menus;
});