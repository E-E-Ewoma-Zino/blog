$(document).ready(function () {
	$("#register").hide();

	$(function () {
		$("#openRegister").click(function (e) {
			e.preventDefault();

			$("#login").fadeOut(300, function () {
				$("#register").fadeIn();
			});
		});

		$("#openLogin").click(function (e) {
			e.preventDefault();

			$("#register").fadeOut(300, function () {
				$("#login").fadeIn();
			});
		});

		$("form").submit(function (e) {
			e.preventDefault();

			const data = {}
			let button;

			for (let index = 0; index < this.length; index++) {
				const input = this[index];

				if (input.tagName === "BUTTON") {
					button = input;
					input.innerHTML = "Loading...";
					input.disabled = true;
				}

				if (input.tagName !== "INPUT") continue;

				data[input.name] = input.value;
			}

			try {
				axios.post(this.action, data).then(res => {
					messager({
						message: "Successful",
						alert: "success",
						method: () => location.reload()
					});
				}).catch(err => {
					button.disabled = false;
					button.innerHTML = "Submit";

					console.error("error", err);
					console.error("error", err.response);
					if (err.response) messager({
						message: err.response.data.message,
						alert: err.response.data.alert
					});
					else messager({
						message: err.message,
						alert: "danger"
					});
				});
			} catch (error) {
				button.disabled = false;
				button.innerHTML = "Submit";

				console.error("error", error);

				return messager({
					message: "Check Your Internet Connection or Reload Page",
					alert: "warning"
				});
			}
		});
	});

});

