var handler = null;
var ctx = null;
avalon.directive('file', {
    parse: function (copy, src, binding) {
        copy[binding.name] = avalon.parseExpr(binding)
        copy.vmodel = '__vmodel__'
        copy.local = '__local__'

        var labelStr = '<label tabindex="-1" style="visibility: hidden; position: absolute; overflow: hidden; width: 0px; height: 0px; border: none; margin: 0px; padding: 0px;">upload</label>';
        var inputStr = '<input type="file">';
        var input = $(inputStr);
        var label = $(labelStr).append(input).appendTo($(src.dom).parent());
        $(src.dom).on('click', function () {
            input.click();
        })
        input.on('change', function (e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length)
                return;
            if (handler && ctx) {
                handler.call(ctx, files[0])
            }
        });
    },
    diff: function (copy, src, name) {
        handler = copy[name];
        ctx = copy.vmodel;
    },
    update: function (node, vnode, parent) {

    }
})
