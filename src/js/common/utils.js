/*
 * 通用方法
 *
 * author: Mark
 * created:　2016/8/8
 */

if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(elt) {
        var len = this.length >>> 0;
        var from = Number(arguments[1]) || 0;
        from = (from < 0) ? Math.ceil(from) : Math.floor(from);
        if (from < 0)
            from += len;
        for (; from < len; from++) {
            if (from in this &&
                this[from] === elt)
                return from;
        }
        return -1;
    };
}

var _toQueryPair = function(key, value) {
    if (typeof value === 'undefined') {
        return key;
    }
    return key + '=' + encodeURIComponent(value === null ? '' : String(value));
};

module.exports = {
    //手机，邮箱验证正则式
    reMobileEmail: /^(1[34578]\d{9}|[a-zA-Z0-9_\.\-]+@(([a-zA-Z0-9])+\.)+([a-zA-Z0-9]{2,4}))$/,
    //手机
    reMobile: /^(1[34578]\d{9})$/,
    //电话号码
    reTel: /\d{3,4}-\d{7,8}(-\d{3,4})?$/,
    //邮件
    reEmail: /^[a-zA-Z0-9_\.\-]+@(([a-zA-Z0-9])+\.)+([a-zA-Z0-9]{2,4})$/,
    //金额
    reMoney: /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/,
    //密码验证
    payPassword: function(pwd) {
        var re = /^(?:([0-9])(?!\1{2})){1,12}$/,
            reN = /^1?2?3?4?5?6?7?8?9?$/;
        if (re.test(pwd)) {
            if (reN.test(pwd)) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    },
    //身份证号码验证
    isIdCardNo: function(num) {
        var len = num.length,
            re;
        if (len == 15) {
            re = new RegExp(/^(\d{6})()?(\d{2})(\d{2})(\d{2})(\d{2})(\w)$/);
        } else if (len == 18) {
            re = new RegExp(/^(\d{6})()?(\d{4})(\d{2})(\d{2})(\d{3})(\w)$/);
        } else {
            //alert("输入的数字位数不对。");
            return false;
        }
        var a = num.match(re);
        if (a != null)　　 {
            if (len == 15)　　 {
                var D = new Date("19" + a[3] + "/" + a[4] + "/" + a[5]);
                var B = D.getYear() == a[3] && (D.getMonth() + 1) == a[4] && D.getDate() == a[5];
            }
            else　　 {
                var D = new Date(a[3] + "/" + a[4] + "/" + a[5]);
                var B = D.getFullYear() == a[3] && (D.getMonth() + 1) == a[4] && D.getDate() == a[5];
            }
            if (!B) {
                //alert("输入的身份证号 "+ a[0] +" 里出生日期不对。");
                return false;
            }
        }
        if (!re.test(num)) {
            //alert("身份证最后一位只能是数字和字母。");
            return false;
        }
        return true;
    },
    /**
     * 字符串截取
     */
    subStr: function(str, length) {
        if (str.length > length) {
            return str.substr(0, parseInt(length)) + '...';
        }
        return str;
    },
    /*
     * 去掉前后空格
     */
    strTrim: function(s) {
        return s.replace(/(^\s+)|(\s+$)/g, "");
    },
    /*
     * 解析RUI参数
     * str: uri字符串
     */
    parseURIParams: function(str) {
        var params = {},
            e,
            a = /\+/g,
            r = /([^&=]+)=?([^&]*)/g,
            d = function(s) {
                return decodeURIComponent(s.replace(a, " "));
            };

        while ((e = r.exec(str))) {
            params[d(e[1])] = d(e[2]);
        }
        return params;
    },

    /*
     * 对像转成URI
     */
    objToQuery: function(obj) {
        var ret = [];
        for (var key in obj) {
            key = encodeURIComponent(key);
            var values = obj[key];
            if (values && values.constructor === Array) {
                var queryValues = [];
                for (var i = 0, len = values.length, value; i < len; i++) {
                    value = values[i];
                    queryValues.push(_toQueryPair(key, value));
                }
                ret = ret.concat(queryValues);
            } else {
                ret.push(_toQueryPair(key, values));
            }
        }
        return ret.join('&');
    },
    /*
     * 取当前路径的参数值
     * arg: 参数名
     */
    parseLocation: function(arg) {
        var uri = location.search;
        if (uri !== "") {
            var argsObj = this.parseURIParams(uri.substr(1));
            return argsObj[arg] || "";
        }
        return "";
    },

    /*
     * Timeago 相对时间美化  2011-05-06 12:30:22  ---> 三分钟之前
     */
    prettyDate: function(time) {
        var date = new Date((time || "").replace(/-/g, "/").replace(/[TZ]/g, " ")),
            diff = (((new Date()).getTime() - date.getTime()) / 1000),
            day_diff = Math.floor(diff / 86400);

        if (isNaN(day_diff) || day_diff < 0) {
            return;
        } else if (day_diff >= 31) {
            return time;
        }


        return day_diff === 0 && (
            diff < 60 && "刚刚" ||
            diff < 120 && "1分钟前" ||
            diff < 3600 && Math.floor(diff / 60) + "分钟前" ||
            diff < 7200 && "1个小时前" ||
            diff < 86400 && Math.floor(diff / 3600) + "小时前") ||
            day_diff === 1 && "昨天" ||
            day_diff < 7 && day_diff + "天前" ||
            day_diff < 31 && Math.ceil(day_diff / 7) + "周前";
    },

    /*
     *时间前后计算
     */
    getDateStr: function(AddDayCount) {
        var day = new Date();
        day.setDate(day.getDate() + AddDayCount); //获取AddDayCount天后的日期
        var y = day.getFullYear();
        var m = (day.getMonth() + 1) < 10 ? "0" + (day.getMonth() + 1) : (day.getMonth() + 1); //获取当前月份的日期，不足10补0
        var d = day.getDate() < 10 ? "0" + day.getDate() : day.getDate(); //获取当前几号，不足10补0
        return y + "-" + m + "-" + d;
    },

    formatDate: function(time, format){
        var t = new Date(time);
        var tf = function(i){return (i < 10 ? '0' : '') + i};
        return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){
            switch(a){
                case 'yyyy':
                    return tf(t.getFullYear());
                    break;
                case 'MM':
                    return tf(t.getMonth() + 1);
                    break;
                case 'mm':
                    return tf(t.getMinutes());
                    break;
                case 'dd':
                    return tf(t.getDate());
                    break;
                case 'HH':
                    return tf(t.getHours());
                    break;
                case 'ss':
                    return tf(t.getSeconds());
                    break;
            }
        })
    },
    /**
     * url跳转
     */
    locationUrl: function(url) {
        var w = window.open();
        return w.location = url;
    },
    /**
     * 计算总页数
     * total 记录总数
     * size 每页显示的记录个数
     */
    pageCount: function(total, size) {
        var count = Math.floor(total / size),
            vod = total % size;
        if (vod > 0) {
            count += 1;
        }
        return count;
    },
    /**
     * 金额格式化
     * money 数额
     * split 是否每3位添加一个分隔，通常是','，不分不要传
     */
    formatCurrency: function(money, split) {
        split = split || '';
        var num = money.toString().replace(/\$|\,/g, ''),
            sign;
        if (isNaN(num)) {
            num = "0";
        }
        sign = (num == (num = Math.abs(num)));
        num = Math.floor(num * 100 + 0.50000000001);
        cents = num % 100;
        num = Math.floor(num / 100).toString();
        if (cents < 10)
            cents = "0" + cents;
        for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
            num = num.substring(0, num.length - (4 * i + 3)) + split +
                num.substring(num.length - (4 * i + 3));
        return (((sign) ? '' : '-') + num + '.' + cents);
    },

    /**
     * 保留小数位
     */
    decimal: function(num, v) {
        var vv = Math.pow(10, v);
        return Math.round(num * vv) / vv;
    },
    /**
     * 链接中的Next参数
     */
    uriNext: function(def) {
        uriObj = this.parseURIParams(location.search.substr(1));
        return uriObj.next || (def || '');
    },

    //优化url，去掉url中不合法的token
    optimizeUrl: function(url) {
        var re = new RegExp("<[^>]*>", "gi");
        url = url.replace(re, "");
        return url;
    },

    //判断是否邮件
    isEmail: function(str) {
        return this.reEmail.test(str);
    },

    /*
     * 检查发布内容是否包含链接
     */
    checkContentUrl: function(content) {
        var matchStr = "fuwo";
        var flag = false;
        var indexResult;
        var re_http = new RegExp("(http[s]{0,1}|ftp)?(:)?(//)?[a-zA-Z0-9\\.\\-]+\\.([a-zA-Z]{2,4})(:\\d+)?(/[a-zA-Z0-9\\.\\-~!@#$%^&*+?:_/=<>]*)?", "gi");
        var pic_re = new RegExp(".+\.(png|PNG|jpg|JPG|bmp|gif|GIF)$");
        if (content.match(re_http) === null) {
            return true;
        } else {
            var result_http = content.match(re_http) === null ? '' : content.match(re_http).toString();
            var resultArray_http = [];
            resultArray_http = result_http.split(",");
            //http验证
            if (resultArray_http !== '') {
                for (var i = 0; i < resultArray_http.length; i++) {
                    resultArray_http[i] = this.optimizeUrl(resultArray_http[i]);
                    if (!pic_re.test(resultArray_http[i])) {
                        if (!this.isEmail(resultArray_http[i])) {
                            indexResult = resultArray_http[i].indexOf(matchStr) >= 0 ? true : false;
                            if (!indexResult) {
                                flag = true;
                                break;
                            }
                        }
                    }
                }
            }

            if (flag) {
                return false;
            }
            return true;
        }
    },

    //判断发布内容中是否有广告链接
    checkUrl: function(content) {
        if (this.checkContentUrl(content) === false) {
            alert("发布内容中包含非本站点链接，请检查您的发布内容！");
            return false;
        }
        return true;
    },


    //首字母大写
    ucFirst: function(word) {
        return word.substring(0, 1).toUpperCase() + word.substring(1);
    },

    //返回地址字符串
    // fromAddress": {
    //     "accuracy": 0,
    //     "address": "string",
    //     "alias": "string",
    //     "aliasCode": "string",
    //     "cityCode": "string",
    //     "cityName": "string",
    //     "code": "string",
    //     "districtCode": "string",
    //     "districtName": "string",
    //     "latitude": 0,
    //     "level": 0,
    //     "longitude": 0,
    //     "provinceCode": "string",
    //     "provinceName": "string",
    //     "townCode": "string",
    //     "townName": "string"
    // }
    getAddress:function(addressObj){
        if(!addressObj) return "";
        var address = "";
        var _province = addressObj.provinceName ? addressObj.provinceName : '';
        var _city = addressObj.cityName ? addressObj.cityName : '';
        var _district = addressObj.districtName ? addressObj.districtName : '';
        var _town = addressObj.townName ? addressObj.townName : '';
        var _alias = addressObj.alias ?  addressObj.alias : '';

        switch (addressObj.level){
            case 1:
                address += _province;
                break;
            case 2:
                address += _province + " " + _city;
                break;
            case 3:
                address += _province + " " + _city + " " + _district;
                break;
            case 4:
                address += _province + " " + _city + " " + _district + " " + _town;
                break;
            default:
                break;
        }
        address += _alias;
        return address;
    },

    /**
     * 修改网页tab上的小图标icon
     * @param src 要替换的icon图片路径
     */
    changeFavicon:function(src) {
        var link = document.createElement('link');
        var oldLink = $("[rel='icon']")[0];
        link.id = 'dynamic-favicon';
        link.rel = 'icon';
        link.href = src;

        var head = document.getElementsByTagName("head")[0];
        if (oldLink) {
            head.removeChild(oldLink);
        }
        head.appendChild(link);
    },

    /**
     * 是否显示有红点的favicon图标
     * @param b
     */
    showRedFavicon:function(b){
        if(b){
            this.changeFavicon('/static_web/images/favico2.ico');
        }else{
            this.changeFavicon('/static_web/images/favico.ico');
        }
    },


    newMsgFlag:false,
    /**
     * 初始化标题
     */
    initTitle:function(){
        var self = this;
        var isWindowFocus = true;

        var flashStep = 0;
        var normalTitle = document.title;
        function flashTitle(){
            console.log("==========flashTitle");
            if(isWindowFocus){
                document.title = normalTitle;
                return;
            }
            flashStep ++;
            if(flashStep == 3) {flashStep = 1;}
            if(flashStep == 2) {document.title="【您有新的消息】";}
            if(flashStep == 1) {document.title="【"+normalTitle+"】" ;}
            setTimeout(flashTitle,500);
        }
        //标题闪烁
        function doFlashTitle(){
            if(self.newMsgFlag){
                flashTitle();
            }
        }
        function focusin(){
            isWindowFocus = true;
            console.log('============focusin');
            doFlashTitle();
        }
        function focusout(){
            isWindowFocus = false;
            console.log('============focusout');
            doFlashTitle();
        }
        if('onfocusin' in document){//for IE
            document.onfocusin = focusin;
            document.onfocusout = focusout;
        }else{
            window.onblur = focusout;
            window.onfocus = focusin;
        }
    },
    notification:function(title,content) {
        if ("Notification" in window) {
            if (Notification.permission !== "granted")
                Notification.requestPermission();
            else {
                var notification = new Notification(title, {
                    icon: '/static_web/images/favico.ico',
                    body: content
                });

                notification.onclick = function () {
                    location.href = "/html/todo/todo.html";
                };

            }
        }
    },
    playSound:function(filename) {
        var dom = $('#play_sound');
        if(!dom.length){
            dom = $('<div id="play_sound"></div>')
            $(document.body).append(dom)
        }
        dom.html('<audio autoplay="autoplay"><source src="/static_web/audios/' + filename + '.mp3" type="audio/mpeg" /><source src="/static_web/audios/' + filename + '.ogg" type="audio/ogg" /><embed hidden="true" autostart="true" loop="false" src="/static_web/audios/' + filename +'.mp3" /></audio>')
    }
};
