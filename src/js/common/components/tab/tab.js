
let tpl = require('./tab.tpl.html');
avalon.component('cap-tab', {
    template: tpl,
    defaults: {
        options: [],
        value: null,
        onChange: null,
        type: "default",
        showCount:false,
        onReady: function () {
            if(this.vmId!==undefined)this.vmId=this.$id;
        },
        itemClick: function (value) {
            var oldValue = this.value;
            this.value = value;
            if (this.onChange && oldValue!=value){
                this.onChange(this.value)
            }
        }
    }
})
