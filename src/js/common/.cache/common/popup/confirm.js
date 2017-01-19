/*TMODJS:{"version":4,"md5":"ad9b30af9c1337dd186952a021cf1f50"}*/
template('common/popup/confirm',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,classname=$data.classname,title=$data.title,input=$data.input,content=$data.content,$out='';$out+='<div class="modal-mask"> <div class="modal-container ';
$out+=$escape(classname);
$out+='"> <div class="modal-header"> ';
$out+=$escape(title);
$out+=' <span class="close" data-op="close">x</span> </div> ';
if(input){
$out+=' <div class="modal-body text-center"> <div class="form-row col-row"> <div class="col-flow-24"> <input type="text" class="form-input data-input"> </div> </div> </div> ';
}else{
$out+=' <div class="modal-body text-center font-14"> ';
$out+=$escape(content);
$out+=' </div> ';
}
$out+=' <div class="modal-footer"> <div class="col-row"> <div class="col-flow-14"> <button type="button" class="btn btn-blue btn-block" data-op="confirm">确定</button> </div> <div class="col-flow-10"> <button type="button" class="btn btn-red btn-block" data-op="cancel">取消</button> </div> </div> </div> </div> </div>';
return new String($out);
});