define([
  'jquery',
  'lib/text!./auditDiyLocation.tpl.html',
  'common/webapi'
], function ($, tpl, webapi) {
  avalon.component('cap-audit-diy-location-modal', {
    template: tpl,
    defaults: {
      show: false,
      title: '我的自定义',
      addr: {
        id:'',
        provinceName: '',
        cityName: '',
        districtName: '',
        name: '',
        address: '',
        createdDate: ''
      },
      auditData: {
        ok: '',
        msg: ''
      },
      setAddr: function (addr) {
        this.addr = addr;
      },
      clear: function () {
        this.addr = {
          id:'',
          provinceName: '',
          cityName: '',
          districtName: '',
          name: '',
          address: '',
          createdDate: ''
        }
        this.auditData = {
          ok: '',
          msg: ''
        }
      },
      onSuccess:null,
      onReady: function () {
        if (this.vmId !== undefined) this.vmId = this.$id;
      },
      audit: function (ok) {
        this.auditData.ok = ok;
        var self = this;
        webapi.route.auditDiyLocation(this.addr.id,this.auditData,function(data) {
          self.show = false;
          self.clear();
          if(self.onSuccess){
            self.onSuccess();
          }
        })
      }
    }
  })
});