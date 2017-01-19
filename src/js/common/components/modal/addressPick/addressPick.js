define([
  'jquery',
  'lib/text!./addressPick.tpl.html',
  'common/webapi',
], function ($, tpl, webapi) {
  avalon.component('cap-address-pick-modal', {
    template: tpl,
    defaults: {
      show: false,
      title: '新增路线',
      tabCascader: {
        vmId:null,
        // options: [{
        //   name: '上海',
        //   code: '0001',
        //   children: [{
        //     name: '上海市',
        //     code: '0001',
        //     children: [{
        //       name: '浦东新区',
        //       code: '00011',
        //       children: [{
        //         name: '川沙镇',
        //         code: '000111',
        //       }, {
        //         name: '北蔡镇',
        //         code: '000112',
        //         children: []
        //       }]
        //     }, {
        //       name: '嘉定区',
        //       code: '00012',
        //       children: [{
        //         name: 'wpw自治镇',
        //         code: '000121',
        //         custom: true
        //       }, {
        //         name: 'wpw自治镇',
        //         code: '000121',
        //         custom: true
        //       }, {
        //         name: 'wpw自治镇',
        //         code: '000121',
        //         custom: true
        //       }, {
        //         name: 'wpw自治镇',
        //         code: '000121',
        //         custom: true
        //       }, {
        //         name: 'wpw自治镇',
        //         code: '000121',
        //         custom: true
        //       }, {
        //         name: 'wpw自治镇',
        //         code: '000121',
        //         custom: true
        //       }, {
        //         name: 'wpw自治镇',
        //         code: '000121',
        //         custom: true
        //       }, {
        //         name: 'wpw自治镇',
        //         code: '000121',
        //         custom: true
        //       }, {
        //         name: 'wpw自治镇',
        //         code: '000121',
        //         custom: true
        //       }, {
        //         name: 'wpw自治镇',
        //         code: '000121',
        //         custom: true
        //       }, {
        //         name: 'wpw自治镇',
        //         code: '000121',
        //         custom: true
        //       }, {
        //         name: 'wpw自治镇',
        //         code: '000121',
        //         custom: true
        //       }, {
        //         name: 'wpw自治镇',
        //         code: '000121',
        //         custom: true
        //       }, {
        //         name: 'wpw自治镇',
        //         code: '000121',
        //         custom: true
        //       }, {
        //         name: 'wpw自治镇',
        //         code: '000121',
        //         custom: true
        //       }, {
        //         name: 'wpw自治镇',
        //         code: '000121',
        //         custom: true
        //       }, {
        //         name: 'wpw自治镇',
        //         code: '000121',
        //         custom: true
        //       }]
        //     }, {
        //       name: 'wpw自治区',
        //       code: '00013',
        //       custom: true,
        //       children: []
        //     }]
        //   }]
        // }],
        // hotOptions: [{
        //   name: '上海市',
        //   code: '0001',
        //   codes: ['-1', '0001']
        // }, {
        //   name: '嘉定区',
        //   code: '00012',
        //   codes: ['-1', '0001', '0001']
        // }, {
        //   name: 'wpw自治镇',
        //   code: '000121',
        //   codes: ['-1', '0001', '0001', '00012'],
        //   custom: true
        // }],
      },
      onConfirm:null,
      reloadAddr:function() {
        var self = this;
        webapi.common.list('routeAddress',{},function(data) {
          avalon.vmodels[self.tabCascader.vmId].setOptions(data.children);
        })
        webapi.common.list('hotAddress',{},function(data) {
          avalon.vmodels[self.tabCascader.vmId].setHotOptions(data.children);
        })
      },
      onReady: function () {
        if (this.vmId !== undefined) this.vmId = this.$id;
        this.reloadAddr();
        var self = this;
        avalon.vmodels[this.tabCascader.vmId].setOnEnd(function(selectedOptions){
          self.show = false;
          if(self.onConfirm){
            self.onConfirm(selectedOptions);
          }
          avalon.vmodels[self.tabCascader.vmId].clear()
        })
      },
    }
  })
});