/**
 * Created by dongwei on 16/10/8.
 */
let avalon = require('../lib/avalon');
Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
avalon.filters.time=function(time){
    if(!time)return '';
    var result = '';
    var now = new Date().getTime();
    var todayDate = new Date();
    var tomorrowDate = new Date(todayDate.getTime()+1000*60*60*24);
    var today = new Date(todayDate.getFullYear(),todayDate.getMonth(),todayDate.getDate()).getTime();
    var tomorrow = new Date(tomorrowDate.getFullYear(),tomorrowDate.getMonth(),tomorrowDate.getDate()).getTime();
    var yesterday = new Date(today-1000*60*60*24);
    var theDayAterTomorrow = new Date(tomorrow+1000*60*60*24);
    if(Math.abs(now-time)<3600000){
        result = Math.round(Math.abs(now-time)/60000);
        if(now-time>0){
            result+='分钟前'
        }else{
            result+='分钟后'
        }
    }else if(time>today&&time<tomorrow){
        result = Math.round(Math.abs(now-time)/1000/60/60);
        if(now-time>0){
            result+='小时前'
        }else{
            result+='小时后'
        }
    }else if(time>yesterday&&time<theDayAterTomorrow){
        if(now-time>0){
            result='昨天'
        }else{
            result='明天'
        }
    }else {
        var format = 'yyyy-MM-dd';
        result = new Date(time).format(format);
    }
    return result;
}
avalon.filters.capitalNumber=function(n){
    if(!n) return null;
    var fraction = ['角', '分'];
    var digit = [
        '零', '壹', '贰', '叁', '肆',
        '伍', '陆', '柒', '捌', '玖'
    ];
    var unit = [
        ['元', '万', '亿'],
        ['', '拾', '佰', '仟']
    ];
    var head = n < 0? '欠': '';
    n = Math.abs(n);
    var s = '';
    for (var i = 0; i < fraction.length; i++) {
        s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
    }
    s = s || '整';
    n = Math.floor(n);
    for (var i = 0; i < unit[0].length && n > 0; i++) {
        var p = '';
        for (var j = 0; j < unit[1].length && n > 0; j++) {
            p = digit[n % 10] + unit[1][j] + p;
            n = Math.floor(n / 10);
        }
        s = p.replace(/(零.)*零$/, '')
                .replace(/^$/, '零')
            + unit[0][i] + s;
    }
    return head + s.replace(/(零.)*零元/, '元')
            .replace(/(零.)+/g, '零')
            .replace(/^整$/, '零元整');
}

avalon.filters.integer=function(number,min,max){
    if(number=='') return number;
    var number = Number((number+'').replace(/\D/g, ''));
    if(min&&number<min){
        number = min;
    }
    if(max&&number>max){
        number=max;
    }
    return number;
}

avalon.filters.float=function(number){
    var number = (number+'').replace(/[^0-9^\.]/g, '')
    var number = (number+'').replace(/\.\./g, '.')
    return number;
}

avalon.filters.minus = function(list1,list2,field){
    if(list1 instanceof Array && list2 instanceof Array){
        var result = list1.slice();
        for (var i = list1.length-1; i >=0 ; i--) {
            var o1 = list1[i];
            for (var j = 0; j < list2.length; j++) {
                var o2 = list2[j];
                if(o1[field]==o2[field]){
                    result.splice(i,1);
                }
            }
        }
        return result;
    }else{
        return list1;
    }
}

avalon.filters['null'] = function(value){
    if(!value){
        value = ''
    }
    return value;
}
