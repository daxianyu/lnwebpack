let tpl = require('./agreementDetail.tpl.html'),
    webapi = require('../../../../common/webapi'),
    paginator = require('../../../../common/paginator');
avalon.component('cap-agreement-detail-modal', {
    template: tpl,
    defaults: {
        show: false,
        title: 'CS123423',
        list: [],
        params: {
            page: 1,
            pageSize: 12
        },
        total: 0,
        pages: 0,
        init: function (aid) {
            var self = this;
            this.params.agreementId = aid
            webapi.common.list('items', this.params, function (data) {
                if (data.dataList) {
                    self.list.removeAll();
                    self.list.pushArray(data.dataList);
                    self.total = data.total;
                    self.pages = Math.ceil(self.total / self.params.pageSize);
                    paginator.init("pagination_agree_detail", self.params.page, self.pages, function (page) {
                        self.params.page = page;
                        webapi.common.list('items', self.params, function (data) {
                            self.list.removeAll();
                            self.list.pushArray(data.dataList);
                        })
                    });
                }
            })
        },
        onReady: function () {
            if (this.vmId !== undefined)this.vmId = this.$id;
        },
    }
})
