/**
 * Created by AaronKong on 16/10/13.
 */

let tpl = require('./fileInput.tpl.html'),
    ui = require('../../../common/ui');
avalon.component('cap-file-input', {
    template: tpl,
    defaults: {
        acceptStr: "image/png,image/jpg",//默认支持的图片格式
        imgUrl: "http://pic.sdodo.com/icon/3/coll.png",//
        value: "",
        onReady: function () {
            if (this.vmId !== undefined)this.vmId = this.$id;
        },
        change: function (event) {
            var mThis = this;
            var url = '/utility/fileUpload';
            window.g_config = window.g_config || {};
            if (window.g_config.serviceHost != undefined) {
                url = window.g_config.serviceHost == location.host ? url : "http://" + window.g_config.serviceHost + url;
            }
            var self = this;
            var file = event.target.files[0];
            var data = new FormData();
            data.append('file', file);
            $.ajax({
                url: url + '?name=' + file.name + '&type=' + file.type,
                type: 'POST',
                data: data,
                processData: false,
                contentType: false,
                error: function (data) {
                    ui.toast('error', data.msg);
                },
                success: function (data) {
                    console.log(data);
                    if (data.success) {
                        mThis.imgUrl = data.data.fileURL;
                        mThis.value = data.data.fileId;
                        if (self.onSuccess)self.onSuccess(data.data.fileId, data.data.fileURL);
                    } else {
                        ui.toast('error', data.msg);
                    }
                }
            });
        }
    }
});
