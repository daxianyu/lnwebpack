var menus = {
    'owner': [{
        text: '我的订单',
        url: '/vehicledemands'
    }, {
        text: '管理工作台',
        children: [{
            text: '待办事项',
            url: '/html/todo/todo.html'
        }, {
            text: '我要下单',
            url: '/vehicledemands/require'
        }, {
            text: '结算中心',
            url: '/html/owner/settlement/list.html'
        }, {
            text: '企业中心',
            url: '/html/enterprise/organization.html'
        }]
    }, {
        text: '退出',
        url: '/logout'
    }],
    'logistic': [{
        text: '我的运单',
        url: '/vehicledemands/orders/'
    }, {
        text: '管理工作台',
        children: [{
            text: '待办事项',
            url: '/html/todo/todo.html'
        }, {
            text: '结算中心',
            url: '/html/logistic/settlement/list.html'
        }, {
            text: '运力资源管理',
            url: '/html/logistic/resource/driverVehicleManage.html'
        }, {
            text: '企业中心',
            url: '/html/enterprise/organization.html'
        }]
    }, {
        text: '退出',
        url: '/logout'
    }],
    'platform': [{
        text: '我的订单',
        url: '/vehicledemands'
    }, {
        text: '运单列表',
        url: '/vehicledemands/orders/'
    }, {
        text: '管理工作台',
        children: [{
            text: '待办事项',
            url: '/html/todo/todo.html'
        }, {
            text: '结算中心',
            url: '/html/platform/settlement/ownerSettlement.html'
        },
            {
                text: '路线及报价管理',
                url: '/html/logistic/route/routemanage/routeManage.html'
            },
            // {
            //   text:'货运险管理',
            //   url:'/html/platform/insure/insure.html'
            // },
            // {
            //   text:'会员管理',
            //   url:'/html/todo/todo.html'
            // },
            {
                text: '平台管理',
                url: '/html/enterprise/organization.html'
            }]
    }, {
        text: '退出',
        url: '/logout'
    }]
}

module.exports = menus;
