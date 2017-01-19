/**
 * Created by dongwei on 16/10/8.
 */
let paginator = require('./paginator'),
    services = require('./services'),
    ui = require('./ui');
var tableConfig = {
    tableUrl: '', //列表查询请求url
    datas: [], //列表数据
    total: 50, //数据总条数
    pages: 0, //总页数
    tableParams: { //查询条件
        page: 1, //页码
        pageSize: 10 //每页条数
    },
    options: { //查询配置
        add: false //换页时当前数据不清除,默认为清除
    },
    showPagination: false, //分页空间显示标记
    loadFlag: 0, //数据加载标记:0未加载,1加载中,2加载完成
    refreshCallback: null, //刷新后回调函数
    currentMouseOverItem: -1, //当前鼠标停留项index
    selected: [], //被选中项
    refresh: function(page, callback, options) {
        var self = this;
        if (options) this.options = options;
        if (page !== undefined && page !== null) {
            this.tableParams.page = page;
        }
        if (this.tableUrl) {
            self.loadFlag = 1;
            if(self.selected.length>0)self.selected.removeAll();
            var params = {};
            avalon.mix(params, this.tableParams, this.params);
            services.get(this.tableUrl, params, function(code, msg, data, arg, rsp) {
                if (code === services.CODE_SUCC) {
                    if (!data || !data.dataList || data.dataList.length == 0) {
                        self.datas = [];
                        self.total = 0;
                        self.tableParams.page = 1;//列表没有数据时,默认回到第一页
                    } else if (data && self.options.add) {
                        self.datas.pushArray(data.dataList);
                        self.total = data.total;
                    } else if (data && !self.options.add) {
                        self.datas.removeAll();
                        self.datas.pushArray(data.dataList);
                        self.total = data.total;
                    }
                    self.initPaginator();
                    self.loadFlag = 2;
                    if (self.refreshCallback) self.refreshCallback(data);
                    if (callback) callback(data);
                } else {
                    ui.toast('error', msg);
                }
            });
        }
    },
    initPaginator: function() {
        var pages = Math.ceil(vm.total / vm.tableParams.pageSize);
        vm.pages = pages;
        paginator.init("pagination", vm.tableParams.page, pages, function(page) {
            vm.tableParams.page = page;
            vm.refresh();
        });
        if (pages > 1) {
            vm.showPagination = true;
            $('#pagination').show();
        } else {
            vm.showPagination = false;
            $('#pagination').hide();
        }
    },
    selectAll: function() {
        if (this.selected.length == this.datas.length) {
            console.log(this.selected)

            this.selected.removeAll();
        } else {
            var self = this;
            avalon.each(this.datas, function(index, data) {
                avalon.Array.ensure(self.selected, data.id);
            });
        }
    },
    getItemById:function(id){
        var item = null;
        avalon.each(this.datas,function(index,data){
            if(data.id==id)item = data;
        })
        return item
    }
};
module.exports = {
    config: tableConfig,
    ready: function(vm) {
        vm.$watch('tableParams.page', vm.initPaginator);
        vm.$watch('total', vm.initPaginator);
        vm.$watch('param.pageSize', vm.initPaginator);
    }
}