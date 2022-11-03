function goto(url, name) {
	window.open(url, name);
}

const swalWithBootstrapButtons = Swal.mixin({
	customClass: {
		confirmButton: 'btn btn-success mr-2',
		denyButton: 'btn btn-danger ml-2'
	},
	buttonsStyling: false
});

(function ($) {
	'use strict';
	$(function () {
		$("[data-edit]").each(function (index, element) { // element == this
			$(this).click(function (e) {
				e.preventDefault();
				window.open(this.dataset.edit, "edit");
			});
		});

		$("[data-delete]").each(function (index, element) {
			$(this).click(function (e) {
				e.preventDefault();

				swalWithBootstrapButtons.fire({
					title: "Delete Blog",
					showDenyButton: true,
					showCancelButton: false,
					confirmButtonText: "Delete",
					denyButtonText: "Cancel"
				}).then((deleteBlog) => {
					if (deleteBlog.isConfirmed) { // get data
						const data = {
							blogId: this.dataset.delete
						}
						
						axios.delete("/blog/delete", { data: data }).then(res => {
							Swal.fire("Deleted", "", "success").then(finish => location.reload());
						}).catch(err => {
							Swal.fire("Failed!", "", "error");
							console.log("Delete media Error", err);
						});
					}
				});
			});
		});
	});
})(jQuery);
