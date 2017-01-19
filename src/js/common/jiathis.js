/*
 * jiathis 分享功能
 *
 * author: Mark
 * created:　2016/8/8
 */

define(['jquery'], function($) {

    var uid = '',
        api = 'http://www.jiathis.com/send/',
        domain = '';

    $(function($) {
        // $(document).delegate('.js-share', 'click', function(event) {
        $('.J-Share').click(function(event) {//防止冒泡
            // event.preventDefault();
            event.stopPropagation();
            var _this = $(this),
                webid = _this.data('webid'),
                url,
                title = _this.data('title') || document.title;
            if (_this.data('url')) {
                if(_this.data('url').indexOf("http") >= 0){
                    url = _this.data('url');
                }else{
                    url = domain + _this.data('url');
                }
            } else {
                url = location.href;
            }
            window.open(api + '?webid=' + webid + '&url=' + url + '&title=' + title + '&uid=' + uid);
        });
    });
});