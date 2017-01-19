
let services = require('../services'),
    ui = require('../ui');
var urlMap = {
    goods:'goods/list',
}

module.exports = {
    add: function(module, params, callback) {
        services.post(urlMap[module], params, function(code, msg, data) {
            if (code === services.CODE_SUCC) {
                if (callback) {
                    callback(data);
                }
            } else {
                ui.toast('error', msg);
            }
        });
    },
    remove: function(module, id, callback) {
        services.remove(urlMap[module] + '/' + id , {}, function(code, msg, data) {
            if (code === services.CODE_SUCC) {
                if (callback) {
                    callback(data);
                }
            } else {
                ui.toast('error', msg);
            }
        });
    },
    get: function(module, id, callback) {
        services.get(urlMap[module] + '/' + id, {}, function(code, msg, data) {
            if (code === services.CODE_SUCC) {
                if (callback) {
                    callback(data);
                }
            } else {
                ui.toast('error', msg);
            }
        });
    },
    edit: function(module, params, callback) {
        var id = params.id;
        services.put(urlMap[module] + '/' + id, params, function(code, msg, data) {
            if (code === services.CODE_SUCC) {
                if (callback) {
                    callback(data);
                }
            } else {
                ui.toast('error', msg);
            }
        });
    },
    list:function(module,params,callback){
        services.get(urlMap[module], params, function(code, msg, data) {
            if (code === services.CODE_SUCC) {
                if (callback) {
                    callback(data);
                }
            } else {
                ui.toast('error', msg);
            }
        });
    },
}