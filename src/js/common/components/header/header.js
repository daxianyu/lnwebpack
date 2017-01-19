
let tpl = require('./header.tpl.html'),
	avalon = window.avalon;
avalon.component('cap-header', {
    template: tpl,
    defaults: {
        onReady: function() {}
    }

});