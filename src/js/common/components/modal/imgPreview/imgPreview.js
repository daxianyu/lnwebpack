define([
    'jquery',
    'lib/text!./imgPreview.tpl.html',
], function ($, tpl) {
    avalon.component('cap-img-preview', {
        template: tpl,
        defaults: {
            show: false,
            src: '',
            onReady: function () {
                if (this.vmId !== undefined) this.vmId = this.$id;
                var self = this;
                $('.modal-mask').click(function (e) {
                    if (self.show && $(e.target).closest('.modal-container')[0] != $(self.$element).find('.modal-container')[0]) {
                        self.show = false;
                    }
                });
                this.$watch('show', function (newVal, oldVal) {
                    var self = this;
                    if (newVal) {
                        var tempImg = document.createElement('img');
                        tempImg.setAttribute('src',self.src)
                        document.body.appendChild(tempImg);
                        var width = $(tempImg).outerWidth();
                        var height = $(tempImg).outerHeight();
                        if (width > 800) {
                            var oldWidth = width;
                            width = 800;
                            height = height*width/oldWidth
                        }
                        if (height > 600){
                            var oldHeight = height;
                            height = 600;
                            width = width*height/oldHeight
                        }
                        $(self.$element).find('.modal-container').css('width', width);
                        $(self.$element).find('.preview-img').css('width', width);
                        $(self.$element).find('.preview-img').css('height', height);
                        tempImg.remove();
                    }
                })
            }
        }
    })
});