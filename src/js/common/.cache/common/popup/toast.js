/*TMODJS:{"version":1,"md5":"b1083473e0ab7e1633ce9256e94c1cbd"}*/
template('common/popup/toast',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,classname=$data.classname,msg=$data.msg,$out='';$out+='<div id="toast" class="toast"> <i class="icon-toast-';
$out+=$escape(classname);
$out+='"></i> <span class="toast-msg">';
$out+=$escape(msg);
$out+='</span> </div>';
return new String($out);
});