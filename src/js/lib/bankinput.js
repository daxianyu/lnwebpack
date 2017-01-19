/** 
× JQUERY 模拟淘宝控件银行帐号输入 
**/
define(['jquery'], function($) {
	// 输入框格式化 
	$.fn.bankInput = function(options) {
			var defaults = {
				min: 10, // 最少输入字数 
				max: 25, // 最多输入字数 
				deimiter: ' ', // 账号分隔符 
				onlyNumber: true, // 只能输入数字 
				copy: true // 允许复制 
			};
			var opts = $.extend({}, defaults, options);
			var obj = $(this);
			obj.css({
				imeMode: 'Disabled',
				borderWidth: '1px',
				color: '#000',
				fontFamly: 'Times New Roman'
			}).attr('maxlength', opts.max);

			if (obj.val() != '') obj.val(obj.val().replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1" + opts.deimiter));
			obj.bind('keyup', function(event) {
				var val = $(this).val();
				if ($(".J-Show-Bank").length === 0 && val != " " && !isNaN(val)) {
					var heightInput = parseInt(obj.css("height")),
						marginTop = "-" + (heightInput - 1) + "px",
						widthInput = parseInt(obj.css("width"));
					obj.before("<div class='J-Show-Bank'></div>");
					$(".J-Show-Bank").css({
						background: "#ffdebb",
						border: "1px solid #dbdbdb",
						height: heightInput,
						fontSize: "20px",
						lineHeight: heightInput+"px",
						paddingLeft: "10px",
						position: "absolute",
						marginTop: marginTop,
						width: widthInput
					});
				}
				if (opts.onlyNumber) {
					if (!(event.keyCode >= 48 && event.keyCode <= 57)) {
						this.value = this.value.replace(/\D/g, '');
					}
				}
				// this.value = this.value.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1" + opts.deimiter);
				$(".J-Show-Bank").html(this.value.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1" + opts.deimiter));
				if (val.length < 1) {
					$(".J-Show-Bank").remove();
				}
			}).bind('dragenter', function() {
				return false;
			}).bind('onpaste', function() {
				return !clipboardData.getData('text').match(/\D/);
			}).bind('blur', function() {
				// this.value = this.value.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1" + opts.deimiter);
				$(".J-Show-Bank").remove();
				if (this.value.length < opts.min) {
					// alert('最少输入' + opts.min + '位账号信息！');
					obj.focus();
				}
			})
		}
		// 列表显示格式化 
	$.fn.bankList = function(options) {
		var defaults = {
			deimiter: ' ' // 分隔符 
		};
		var opts = $.extend({}, defaults, options);
		return this.each(function() {
			$(this).text($(this).text().replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1" + opts.deimiter));
		})
	}
});