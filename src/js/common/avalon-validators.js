
let avalon = require('../lib/avalon');
avalon.validators.greater = {
    message: '',
    get: function (value, field, next) {
        var include = field.dom.getAttribute('greater-include') || true;
        include = JSON.parse(include)
        var ok;

        if(isNaN(field.data.greater)){
            if(include){
                ok = (value === '' || !$('#'+field.data.greater).val() || (Number(value) >= Number($('#'+field.data.greater).val())))
            }else{
                ok = (value === '' || !$('#'+field.data.greater).val() || (Number(value) > Number($('#'+field.data.greater).val())))
            }
        }else{
            if(include){
                ok = (value === '' || (Number(value) >= Number(field.data.greater)))
            }else{
                ok = (value === '' || (Number(value) > Number(field.data.greater)))
            }
        }
        next(ok)
        return value
    }
}
avalon.validators.less = {
    message: '',
    get: function (value, field, next) {
        if(isNaN(field.data.less)){
            var ok = (value === '' || !$('#'+field.data.less).val() || (Number(value) <= Number($('#'+field.data.less).val())))
            next(ok)
        }else{
            var ok = (value === '' || (Number(value) <= Number(field.data.less)))
            next(ok)
        }
        return value
    }
}