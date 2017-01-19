define([
  'jquery',
  'lib/text!./tagPicker.tpl.html'
], function ($, tpl) {
  avalon.component('cap-tag-picker', {
    template: tpl,
    defaults: {
      tagPickerShow:false,
      placeholder:'点击选择',
      items:[],
      pickedItems:[],
      textField:'name',
      valueField:'id',
      onReady: function () {
        if (this.vmId !== undefined) this.vmId = this.$id;
        var self = this;
        // $(document).click( function (e) {
        //     if (self.tagPickerShow&&$(e.target).closest('.tag-picker-container')[0] != self.$element) {
        //         self.tagPickerShow = false;
        //     }
        // });
      },
      showPicker:function() {
        this.tagPickerShow = true;
      },
      deleteTag:function(tag) {
        this.pickedItems.remove(tag)
      },
      itemClick:function(item) {
        this.pickedItems.push(item)
      },
      confirm:function() {
        this.tagPickerShow = false;
      },
      getItemValue: function (item) {
        if (typeof item == "string" || !item) return item;
        else return item[this.valueField]
      },
      getItemText: function (item) {
        if (typeof item == "string" || !item) return item;
        else return item[this.textField]
      },
      setOptions:function(options){
        if(options === null){
          return;
        }
        if(options instanceof Array){
          this.items = options;
        }else if(options instanceof Object){
          var items = [];
          avalon.each(options,function(key,val){
            items.push({value:key,text:val});
          });
          this.items = items;
        }
        return this.items;
      }
    }
  });

});