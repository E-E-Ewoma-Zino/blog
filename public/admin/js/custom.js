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
							itemId: this.dataset.delete
						}

						axios.delete(this.dataset.deletePath, { data: data }).then(res => {
							Swal.fire("Deleted", "", "success").then(finish => location.reload());
						}).catch(err => {
							Swal.fire("Failed!", "", "error");
							console.log("Delete media Error", err);
						});
					}
				});
			});
		});

		if ($(".next-btn").length) {
			const nextBtn = document.querySelectorAll(".next-btn");
			const prevBtn = document.querySelectorAll(".prev-btn");

			const start = Number(location.search.substring(location.search.search(/start/) + 6, location.search.search(/stop/) -
				1));
			const stop = Number(location.search.substring(location.search.search(/stop/) + 5, location.search.length));

			for (let i = 0; i < nextBtn.length; i++) {
				const nex = nextBtn[i];
				const pre = prevBtn[i];

				if (start < 1) {
					pre.style.display = "none";
				} else {
					pre.style.display = "block";
				}

				if (stop > nex.dataset.maxlength - 1) {
					nex.style.display = "none"
				} else {
					nex.style.display = "block";
				}

				nex.href = `/admin/storage?start=${start + 20}&stop=${stop + 20}`;
				pre.href = `/admin/storage?start=${start - 20}&stop=${stop - 20}`;
			}

			const clipboard = document.querySelectorAll(".fa-copy");

			clipboard.forEach(clip => {
				clip.addEventListener("click", e => {
					/* Copy the text inside the text field */
					navigator.clipboard.writeText(e.currentTarget.dataset.url);

					/* Alert the copied text */
					messager({
						alert: "success",
						message: "Copyed"
					});
				});
			});
		}
	});
})(jQuery);
