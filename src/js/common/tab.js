/*
 * Tab 组件
 *
 * author: Mark
 * created: 2016/08/08
 */

define(['jquery'], function($) {
    var _curTab = null,
        _newTab = null;

    var _init = function(className, callbackList) {
        var adom = '.' + className + ' a';
        $(adom).click(function(event) {
            event.preventDefault();
            _newTab = $(this).attr('data-href');
            $.each($(adom), function(i, n) {
                var tab = $(n),
                    main = $(tab.attr('data-href'));
                if (tab.attr('data-href') === _newTab) {
                    tab.parent('li').addClass('active');
                    main.addClass('in');
                    if (callbackList) {
                        callbackList[i]();
                    }
                } else {
                    tab.parent('li').removeClass('active');
                    main.removeClass('in');
                }
            });
        });
    };

    return {
        init: function(className, callbackList) {
            _init(className, callbackList);
        }
    };
});