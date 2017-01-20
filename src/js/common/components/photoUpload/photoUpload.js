let tpl = require('./photoUpload.tpl.html');
avalon.component('cap-photo-upload', {
    template: tpl,
    defaults: {
        filePath: '',
        fileChange: function (file) {
            console.log(file.name);
        },
        onReady: function () {
            if (this.vmId !== undefined)this.vmId = this.$id;
        }
    }
})
