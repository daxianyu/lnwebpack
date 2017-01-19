/*TMODJS:{"version":2,"md5":"0183162da349212ab94025fccbe28080"}*/
template('common/popup/message',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$string=$utils.$string,content=$data.content,$out='';$out+='<div id="message" class="message"> <div class="message-content"> <i class="icon-circle-exclamation"></i> <span class="content">';
$out+=$string(content);
$out+='</span> <span class="close">关闭提醒</span> </div> </div>';
return new String($out);
});