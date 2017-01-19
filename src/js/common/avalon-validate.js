define([
    'common/utils',
    'common/ui'
], function (api, utils, ui) {
    return {
        getValidateConfig:function(validateName) {
            var validateConfig = {
                errorInputs: [],
                vreasons: [],
                clearValidateErrors:function(){
                    this.errorInputs = [];
                    this.vreasons = [];
                }
            };
            validateConfig[validateName]={
                validateAllInSubmit: false,
                onManual: avalon.noop,
                onSuccess: function (reasons,vmodel) {
                    if (vmodel.errorInputs.indexOf(this.id) > -1) vmodel.errorInputs.splice(vmodel.errorInputs.indexOf(this.id), 1);
                },
                onError: function (reasons,vmodel) {
                    if (vmodel.errorInputs.indexOf(this.id.toString()) === -1) vmodel.errorInputs.push(this.id.toString());
                },
                onValidateAll: function (reasons,vmodel) {
                    for (var i = 0; i < reasons.length; i++) {
                        var r = reasons[i];
                        if (vmodel.errorInputs.indexOf(r.element.id.toString()) === -1) vmodel.errorInputs.push(r.element.id.toString());
                    }

                    for (var j = vmodel.errorInputs.length - 1; j >= 0; j--) {
                        var id = vmodel.errorInputs[j];
                        var found = false;
                        for (var i = 0; i < reasons.length; i++) {
                            var r = reasons[i];
                            if (r.element.id.toString() == id) {
                                found = true
                            }
                        }
                        if (!found) {
                            vmodel.errorInputs.splice(j, 1)
                        }
                    }

                    vmodel.vreasons = reasons.concat();
                }
            }
            return validateConfig;
        }
    }
});