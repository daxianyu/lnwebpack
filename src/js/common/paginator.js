/*
 * 分页组件
 *
 * author: Mark
 * created: 2016/8/8
 */

var _dom,
    _domId,
    _html = '',
    _offset = 2,
    _page = 0,
    _pages = 0,
    _start = 0,
    _end = 0,
    _callback,
    i = 0;

var _caculatePage = function() {
    _start = 0;
    _end = 0;

    if (_pages > 10) {
        //开始页
        if (_page > 4) {
            _start = _page - _offset;
        }

        //结束页
        if (_pages > 7 && _page < (_pages - 4)) {
            _end = _page + _offset;
        }
    }
};

var _generateHtml = function() {
    if (_page === 0 || _pages <= 1) {
        return '';
    }

    s = [];
    s.push('<nav><ul class="pagination">');

    if (_page === 1) {
        s.push('<li class="disabled"><a href="javascript:void(0);" aria-label="上一页"><span aria-hidden="true">&laquo;</span>上一页</a></li>');
    } else {
        s.push('<li data-page="' + (_page - 1) + '" class="js-page"><a href="javascript:void(0);" aria-label="上一页"><span aria-hidden="true">&laquo;</span>上一页</a></li>');
    }

    if (_start > 0) {
        s.push('<li data-page="1" class="' + (1 === _page ? 'active' : 'js-page') + '"><a href="javascript:void(0);">1</a></li>');
        s.push('<li><a href="javascript:void(0);" class="none-border"><em>...</em></a></li>');
    } else {
        for (i = 1; i < _page; i++) {
            s.push('<li class="' + (i === _page ? 'active' : 'js-page') + '" data-page="' + i + '"><a href="javascript:void(0);">' + i + '</a></li>');
        }
    }

    if (_start > 0 && _end > 0) {
        for (i = _start; i < (_end + 1); i++) {
            s.push('<li class="' + (i === _page ? 'active' : 'js-page') + '" data-page="' + i + '"><a href="javascript:void(0);">' + i + '</a></li>');
        }
    } else if (_start === 0 && _end > 0) {
        for (i = _page; i < 7; i++) {
            s.push('<li class="' + (i === _page ? 'active' : 'js-page') + '" data-page="' + i + '"><a href="javascript:void(0);">' + i + '</a></li>');
        }
    }

    if (_end > 0) {
        s.push('<li><a href="javascript:void(0);" class="none-border"><em>...</em></a></li>');
        s.push('<li data-page="' + _pages + '" class="js-page"><a href="javascript:void(0);">' + _pages + '</a></li>');
    } else {
        var temp = _page;
        if (_start > 0) {
            temp = _start;
        }
        for (i = temp; i <= _pages; i++) {
            s.push('<li class="' + (i === _page ? 'active' : 'js-page') + '" data-page="' + i + '"><a href="javascript:void(0);">' + i + '</a></li>');
        }
    }

    if (_page === _pages) {
        s.push('<li class="disabled"><a href="javascript:void(0);" aria-label="下一页">下一页<span aria-hidden="true">&raquo;</span></a></li>');
    } else {
        s.push('<li data-page="' + (_page + 1) + '" class="js-page"><a href="javascript:void(0);" aria-label="下一页">下一页<span aria-hidden="true">&raquo;</span></a></li>');
    }

    s.push('<li class="pagination-jump">跳转到 <input class="J-Jump" type="text"> 页</li>');

    s.push('</ul></nav>');
    return s.join('\n');
};

var _construct = function(pages) {
    _caculatePage();
    _dom.html(_generateHtml());

    $('#' + _domId + ' .js-page').click(function(event) {
        event.preventDefault();
        var page = parseInt($(this).data('page'));
        _callback(page);
        _page = page;
        _construct(pages);
    });
    $('#' + _domId + ' .J-Jump').keypress(function(event) {
        if(event.keyCode == 13){
            event.preventDefault();
            var page = parseInt($(this).val());
            if(page > pages){
                return;
            }
            _callback(page);
            _page = page;
            _construct(pages);
        }
    });
};

var _init = function(domId, page, pages, callback) {
    _domId = domId;
    _dom = $('#' + _domId);
    if (_dom.length !== 1 || callback === undefined) {
        return;
    }
    _callback = callback || function() {};
    _page = Math.max(1, page);
    _pages = Math.max(_page, pages);
    _construct(pages);
};

module.exports = {
    init: function(domId, page, pages, callback) {
        _init(domId, parseInt(page), parseInt(pages), callback);
    }
};