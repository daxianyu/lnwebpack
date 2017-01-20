/**
 * Created by dongwei on 16/10/8.
 */
let tpl = require('./select.tpl.html');
avalon.component('cap-select', {
    template: tpl,
    defaults: {
        classes: '',                                           //绑定class
        placeholder: '请输入',                                //为空时显示的文本
        dataSize: 6,
        valueField: 'value',
        textField: 'text',
        onChange: null,
        onClearFn: null,
        enableFilter: false,
        enableEdit: false,
        selectionsIsShow: false,
        selectionsContainerMouseup: false,
        disabledCls: 'inputselect-selection-disabled',
        noOptionsMsg: '没有选项',
        noResultMsg: '没有找到结果',
        disableSelect: false,
        items: [],
        level2Items: [],
        level3Items: [],
        level4Items: [],
        value: '',
        filterBy: '',
        isEdited: false,
        mutiLevel: false,
        enableLevelsClick: false,
        selectedItem1: {},
        selectedItem2: {},
        selectedItem3: {},
        onReady: function () {
            if (this.vmId !== undefined)this.vmId = this.$id;
            if (this.mutiLevel)this.enableEdit = false;
            var textInput = $(this.$element).find('.input-select-input');
            var selectionsContainer = $(this.$element).find('.select-selections-container');
            selectionsContainer.css('left', textInput.css('offsetLeft'));
            selectionsContainer.css('top', textInput.css('offsetTop') + textInput.css('offsetHeight'));
            if (!this.mutiLevel)selectionsContainer.css('width', textInput.css('width'));
            if (!this.dataSize)this.dataSize = 6;
            if (this.items.length == 0) {
                var disable = {disabled: true, noOptionsItm: true};
                if (this.textField)disable[this.textField] = this.noOptionsMsg;
                else disable.text = this.noOptionsMsg;
                this.items.push(disable);
            }
            if (this.mutiLevel) {
                this.$watch("selectedItem1", function (val) {
                    if (val.children && val.children.length > 0) {
                        this.level2Items = val.children;
                        this.level3Items = [];
                        this.level4Items = [];
                    } else {
                        this.level2Items = [];
                    }
                });
                this.$watch("selectedItem2", function (val) {
                    if (val.children && val.children.length > 0) {
                        this.level3Items = val.children;
                        this.level4Items = [];
                    } else {
                        this.level3Items = [];
                    }
                });
                this.$watch("selectedItem3", function (val) {
                    if (val.children && val.children.length > 0) {
                        this.level4Items = val.children;
                    } else {
                        this.level4Items = [];
                    }
                });
            }
            this.$watch("value", function (val) {
                if (this.isEdited)return;
                if (val == null)return;
                if (val !== 'undefined' && this.items) {
                    var self = this;
                    var text = '';
                    avalon.each(this.items, function (index, item) {
                        if (val == self.getItemValue(item)) {
                            text = self.getItemText(item);
                        }
                    });
                    this.filterBy = text;
                }
            });
        },
        isEmpty: function () {
            if (!this.enableFilter)return this.items.length <= 1;
            var is = true;
            var self = this;
            avalon.each(this.items, function (index, item) {
                if (item.disabled)return;
                if (!self.getItemText(item))return;
                if (self.getItemText(item).toString().toLowerCase().startsWith(self.filterBy.toString().toLowerCase())) {
                    is = false;
                }
            });
            return is;
        },
        filterFn: function (item) {
            if (item.noOptionsItm) {
                return this.isEmpty();
            }
            if (this.mutiLevel)return true;
            if (!this.enableFilter)return true;
            if (this.getItemText(item).toString().toLowerCase().startsWith(this.filterBy.toString().toLowerCase())) {
                return true
            }
            return false;
        },
        setOptions: function (options) {
            var disable = {disabled: true, noOptionsItm: true};
            if (this.textField)disable[this.textField] = this.noOptionsMsg;
            else disable.text = this.noOptionsMsg;
            if (options === null) {
                this.items = [disable];
                return this.items;
            }
            if (options instanceof Array) {
                options.push(disable);
                this.items = options;
            } else if (options instanceof Object) {
                var items = [];
                avalon.each(options, function (key, val) {
                    items.push({value: key, text: val});
                });
                items.push(disable);
                this.valueField = 'value';
                this.textField = 'text';
                this.items = items;
            }
            this.setHeight();
            this.setValue();
            return this.items;
        },
        setHeight: function () {
            var selectionsContainer = $(this.$element).find('.select-selections-container');
            if (!this.items) {
                this.disableSelect = true;
            } else {
                this.disableSelect = false;
                if (this.mutiLevel) {
                    selectionsContainer.css('height', 30 * this.dataSize + 1 + "px");
                    selectionsContainer.css('overflowY', "auto");
                } else if (this.items.length > this.dataSize) {
                    selectionsContainer.css('maxHeight', 30 * this.dataSize + 1 + "px");
                    selectionsContainer.css('overflowY', "auto");
                } else {
                    selectionsContainer.css('maxHeight', 30 * this.items.length + 1 + "px");
                }
            }
        },
        setValue: function (value) {
            if (value !== undefined)this.value = value;
            if (this.isEdited)return;
            if (this.value == null) {
                this.filterBy = '';
                return;
            }
            if (this.value !== 'undefined' && this.items && this.mutiLevel) {
                var self = this;
                var text = '';
                var result = false;
                var level = 1;
                var eachFn = function (items) {
                    avalon.each(items, function (index, item) {
                        if (result == true)return;
                        if (item.children && item.children instanceof Array) {
                            if (level == 1) {
                                self.selectedItem1 = item.$model;
                            } else if (level == 2) {
                                self.selectedItem2 = item.$model;
                            } else if (level == 3) {
                                self.selectedItem3 = item.$model;
                            }
                            level++;
                            eachFn(item.children);
                            level--;
                        }
                        if (self.value == self.getItemValue(item)) {
                            self.onSelectionClick(item, level);
                            result = true;
                        }
                    });
                }
                eachFn(this.items);
                self.selectedItem1 = {};
                self.selectedItem2 = {};
                self.selectedItem3 = {};
            } else if (this.value !== 'undefined' && this.items) {
                var self = this;
                var text = '';
                avalon.each(this.items, function (index, item) {
                    if (self.value == self.getItemValue(item)) {
                        text = self.getItemText(item);
                    }
                });
                this.filterBy = text;
            }
        },
        getItemByValue: function (value) {
            var self = this;
            var result = null;
            avalon.each(this.items, function (index, item) {
                if (value == self.getItemValue(item)) {
                    result = item.$model;
                }
            });
            return result;
        },
        onSelectionClick: function (item, level) {
            var textInput = $(this.$element).find('.input-select-input');
            if (item.disabled) {
                textInput.focus();
                return;
            }
            if (this.mutiLevel && !this.enableLevelsClick && item.children && item.children.length > 0) {
                textInput.focus();
                return;
            }
            textInput.focus();
            this.value = this.getItemValue(item);
            if (this.mutiLevel) {
                var text = '';
                var self = this;
                var items = [this.selectedItem1.$model, this.selectedItem2.$model, this.selectedItem3.$model];
                avalon.each(items, function (index, data) {
                    if (index < level - 1 && self.getItemText(data)) {
                        if (text != '')text += '/';
                        text += self.getItemText(data);
                    }
                });
                if (text != '')text += '/';
                text += self.getItemText(item.$model);
                this.filterBy = text;
            } else {
                this.filterBy = this.getItemText(item);
            }
            if (this.onChange && this.mutiLevel) {
                this.onChange(this.selectedItem1.$model, this.selectedItem2.$model, this.selectedItem3.$model, item.$model);
            } else if (this.onChange) {
                this.onChange(item);
            }
            this.showOptions(false)
        },
        onInputClick: function () {
            if (this.disableSelect)return;
            this.isEdited = false;
            this.showOptions();
        },
        onInputBlur: function () {
            this.isBlur = true;
            if (!this.selectionsContainerMouseup) {
                this.showOptions(false);
                if (!this.enableEdit) {
                    this.setValue(this.value)
                }
            }
        },
        onInputTextInput: function () {
            this.showOptions(true)
            if (this.enableEdit) {
                this.isEdited = true;
                this.value = this.filterBy;
            }
        },
        onClear: function () {
            this.value = '';
            this.filterBy = '';
            if (this.onClearFn)this.onClearFn();
        },
        getItemValue: function (item) {
            if (typeof item == "string")return item;
            else return item[this.valueField ? this.valueField : "value"]
        },
        getItemText: function (item) {
            if (typeof item == "string")return item;
            else return item[this.textField ? this.textField : "text"]
        },
        showOptions: function (isShow) {
            var selectionsContainer = $(this.$element).find('.select-selections-container');
            var level1 = $(this.$element).find('.select-selections-container.level1');
            var level2 = $(this.$element).find('.select-selections-container.level2');
            var level3 = $(this.$element).find('.select-selections-container.level3');
            var level4 = $(this.$element).find('.select-selections-container.level4');
            var input = $(this.$element).find('.input-select-input');
            if (isShow === undefined) {
                isShow = !this.selectionsIsShow;
            }
            this.selectionsIsShow = isShow;
            if (this.selectionsIsShow) {
                selectionsContainer.css('top', input.css('offsetTop') + input.css('offsetHeight'));
                if (!this.mutiLevel)selectionsContainer.css('width', input.css('width'));
                level2.css('left', level1.width() + 2);
                level3.css('left', level1.width() + 2 + level2.width() + 1);
                level4.css('left', level1.width() + 2 + level2.width() + 1 + level3.width() + 1);
            } else {
                this.selectedItem1 = {};
                this.selectedItem2 = {};
                this.selectedItem3 = {};
            }
        }
    }
})
avalon.filters.inputSelectFilter = function (datas, filterBy, noResultMsg, textField) {
    var getItemText = function (item) {
        if (typeof item == "string")return item;
        else return item[textField ? textField : "text"]
    }
    if (!filterBy)return datas;
    var results = [];
    avalon.each(datas, function (index, item) {
        if (!getItemText(item))return;
        if (getItemText(item).toString().toLowerCase().startsWith(filterBy.toString().toLowerCase())) {
            // console.log(item);
            results.push(item);
        }
        // results.push(item);
    });
    if (results.length == 0) {
        var disable = {disabled: true};
        if (textField)disable[textField] = noResultMsg;
        else disable.text = noResultMsg;
        results.push(disable);
    }
    return results;
}
