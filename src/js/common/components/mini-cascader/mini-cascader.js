let tpl = require('./mini-cascader.tpl.html');
avalon.component('cap-mini-cascader', {
    template: tpl,
    defaults: {
        classes: '',
        options: [],
        value: '',
        placeholder: '',
        searchable: true,
        valueField: 'code',
        textField: 'name',
        showMenu: false,
        menuLists: [],
        resultMenuLists: [],
        selectedOptions: [],
        resultOptions: [],
        searchInputs: {0: ''},
        hasResult: false,
        displayValue: '',
        setOptions: function (options) {
            this.options = options;
            this.clear();
        },
        onReady: function () {
            if (this.vmId !== undefined) this.vmId = this.$id;
            var self = this;
            document.addEventListener("click", function (e) {
                if ($(e.target).closest('.mini-cascader-wrapper')[0] != self.$element) {
                    self.showMenu = false;
                }
            });
        },
        toggle: function () {
            this.showMenu = !this.showMenu;
            if (this.showMenu) {
                this.selectedOptions = this.resultOptions.slice();
                this.menuLists = this.resultMenuLists.slice();
                this.searchInputs = {0: ''};
                this.setWidth();
            }
        },
        chooseOption: function (index, option) {
            if (this.menuLists[index]) {//已经有这列,删除这列后面所有列
                this.menuLists.splice(index + 1, this.menuLists.length - 1 - index);
                this.selectedOptions.splice(index + 1, this.selectedOptions.length - 1 - index);
            }
            this.selectedOptions[index] = option;
            if (option.children && option.children.length > 0) {
                this.menuLists.push(option.children);
                this.searchInputs[this.menuLists.length - 1] = '';
                this.searchInputs = avalon.mix({}, this.searchInputs)
                this.setWidth();
            } else {//没有children 结束
                this.setWidth();
                this.showMenu = false;
                this.hasResult = true;
                this.displayValue = this.displayRender(this.selectedOptions);
                this.value = this.resultFormat(this.selectedOptions);
                this.resultOptions = this.selectedOptions.slice();
                this.resultMenuLists = this.menuLists.slice();
            }
        },
        clear: function () {
            this.menuLists = [this.options];
            this.resultMenuLists = [this.options];
            this.searchInputs = {0: ''};
            this.selectedOptions = [];
            this.resultOptions = [];
            this.hasResult = false;
            this.displayValue = '';
            this.value = '';
        },
        displayRender: function (selectedOptions) {
            var result = '';
            for (var i = 0; i < selectedOptions.length; i++) {
                result += this.getItemText(selectedOptions[i]);
                if (i != selectedOptions.length - 1) {
                    result += '/';
                }
            }
            return result;
        },
        resultFormat: function (selectedOptions) {
            return this.getItemValue(selectedOptions[selectedOptions.length - 1])
        },
        getItemValue: function (item) {
            if (typeof item == "string" || !item) return item;
            else return item[this.valueField]
        },
        getItemText: function (item) {
            if (typeof item == "string" || !item) return item;
            else return item[this.textField]
        },
        setLocation: function (codes) {
            for (var i = 0; i < codes.length; i++) {
                var code = codes[i];
                if (this.menuLists[i]) {
                    for (var j = 0; j < this.menuLists[i].length; j++) {
                        var option = this.menuLists[i][j];
                        if (this.getItemValue(option) == code) {
                            this.chooseOption(i, option)
                        }
                    }
                }
            }
        },
        setWidth: function () {
            var lists = $(this.$element).find('.mini-cascader-menu .list');
            lists.each(function () {
                $(this).find('.mini-cascader-search-wrapper').css('width', $(this).width())
            });
        }
    }
});
avalon.filters.cascaderSearchFilter = function (list, input, textField) {
    if (!input || input === '') {
        return list;
    }
    var resultList = [];
    for (var i = 0; i < list.length; i++) {
        if (list[i][textField] && list[i][textField].indexOf(input) > -1) {
            resultList.push(list[i]);
        }
    }
    return resultList;
}
