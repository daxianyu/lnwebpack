let tpl = require('./btnDropdown.tpl.html');
require('../../../lib/glDatePicker');
avalon.component('cap-date', {
    template: tpl,
    defaults: {
        classes: '',
        value: 0,
        text: '',
        format: 'yyyy-MM-dd',
        placeholder: '',
        dp: null,
        onChange: function () {
        },
        showDatePicker: function () {
            var self = this;
            self.dp.render();
        },
        onReady: function () {
            var self = this;
            if (this.vmId !== undefined)this.vmId = this.$id;
            setTimeout(function () {
                self.dp = $(self.$element).find('input').glDatePicker({
                    cssName: 'flatwhite',
                    pickerWidth: 250,
                    selectedDate: new Date(),
                    onClick: function (target, cell, datetime, data) {
                        self.value = datetime.getTime();
                        self.text = datetime.format(self.format);
                        if (self.onChange)self.onChange(self.value, self.text, datetime);
                    }
                }).glDatePicker(true);
            }, 1);
        },
        setValue: function (value) {
            this.value = value;
            var date = new Date(value)
            this.text = date.format(this.format);
        },
        reset: function () {
            this.value = 0;
            this.text = '';
        }
    }
});
