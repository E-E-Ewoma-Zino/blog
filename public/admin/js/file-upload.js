(function ($) {
	'use strict';
	$(function () {
		$('.file-upload-browse').on('click', function () {
			console.log("Clicked");
			var file = $(this).parent().parent().parent().find('.file-upload-default');
			file.trigger('click');
		});
		$('.file-upload-default').on('change', function () {
			$(this).parent().find('.form-control').val($(this).val().replace(/C:\\fakepath\\/i, ''));
		});
	});
})(jQuery);
