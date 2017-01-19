/*TMODJS:{"version":3,"md5":"8167c6516623fb86ff710aef5088bc5d"}*/
template('common/popup/alert',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,classname=$data.classname,title=$data.title,content=$data.content,$out='';$out+='<div class="modal-mask"> <div class="modal-container ';
$out+=$escape(classname);
$out+='"> <div class="modal-header"> ';
$out+=$escape(title);
$out+=' <span class="close" data-op="close">x</span> </div> <div class="modal-body text-center font-14"> ';
$out+=$escape(content);
$out+=' </div> <div class="modal-footer"> <div class="col-row"> <div class="col-flow-10 col-offset-left-7"> <button type="button" class="btn btn-blue btn-block" data-op="confirm">确定</button> </div> </div> </div> </div> </div>';
return new String($out);
});