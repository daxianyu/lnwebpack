define([
  'jquery',
  'lib/text!./tab-cascader.tpl.html'
], function ($, tpl) {
  avalon.component('cap-tab-cascader', {
    template: tpl,
    defaults: {
      classes: '',
      tabs:['省份','城市','区县','村镇'],
      hotTabName:'热门',
      currentLvl:0,  //<0hot >=0normal
      options: [],
      hotOptions:[],
      value: '',
      valueField: 'code',
      textField: 'name',
      specialField:'custom',
      selectedOptions: [],
      expanded:false,
      hasResult: false,
      onEnd:null,
      setOnEnd:function(cb) {
        this.onEnd = cb;
      },
      setOptions: function (options,hotOptions) {
        this.options = options;
        this.clear();
      },
      setHotOptions:function(ops) {
        this.hotOptions = ops;
      },
      onReady: function () {
        if (this.vmId !== undefined) this.vmId = this.$id;
      },
      changeCurrentLvl:function(lvl) {
        this.currentLvl = lvl;
      },
      chooseOption: function (lvl, option) {
        this.selectedOptions.splice(lvl, this.selectedOptions.length - lvl);
        this.selectedOptions.push(option);
        if (option.children && option.children.length > 0) {
          this.currentLvl ++;
        } else {//没有children 结束
          this.hasResult = true;
          this.value = this.resultFormat(this.selectedOptions);
          if(this.onEnd){
            this.onEnd(this.selectedOptions);
          }
        }
      },
      chooseHotOption:function(hotOP) {
        this.currentLvl=0;
        for (var i = 1; i < hotOP.codes.length; i++) {
          var code = hotOP.codes[i];
          var ops,op;
          if(i==1){
            ops = this.options;
          }else{
            ops = this.selectedOptions[i-2].children;
          }
          for (var j = 0; j < ops.length; j++) {
            op = ops[j];
            if(op.code==code){
              break;
            }
          }
          if(op){
             this.chooseOption(this.currentLvl,op);
          }
        }
        var curLvlOps;
        if(hotOP.codes.length==1){
          curLvlOps = this.options;
        }else{
          curLvlOps = this.selectedOptions[hotOP.codes.length-2].children;
        }
        var curOP
        for(var i = 0; i < curLvlOps.length; i++){
          curOP = curLvlOps[i];
          if(hotOP.code==curOP.code){
            break;
          }
        }
        this.chooseOption(this.currentLvl,curOP);
      },
      deleteOption:function(lvl) {
        this.selectedOptions.splice(lvl, this.selectedOptions.length - lvl);
        this.currentLvl = lvl;
      },
      clear:function() {
        this.currentLvl=0;
        this.value = '';
        this.selectedOptions = [];
        this.expanded=false;
        this.hasResult = false;
      },
      resultFormat: function (selectedOptions) {
        return this.getItemValue(selectedOptions[selectedOptions.length - 1])
      },
      expand:function() {
        this.expanded = !this.expanded;
      },
      getItemValue: function (item) {
        if (typeof item == "string" || !item) return item;
        else return item[this.valueField]
      },
      getItemText: function (item) {
        if (typeof item == "string" || !item) return item;
        else return item[this.textField]
      }
    }
  });
  avalon.filters.specialFilter = function (list,isSpecial,specialField) {
    var resultList = [];
    for (var i = 0; i < list.length; i++) {
      if (list[i][specialField]&&isSpecial) {
        resultList.push(list[i]);
      }else if(!list[i][specialField]&&!isSpecial){
        resultList.push(list[i]);
      }
    }
    if(resultList.length==0){
      return null;
    }
    return resultList;
  }
});