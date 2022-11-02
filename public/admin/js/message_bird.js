// Message Bird js

// using messageBird
const messageBox = document.getElementById("messageBox");

// message sender
function messager({alert, message, progressBar, method, duration}) {
	const messageBird = document.createElement("div");
	const messageDiv = document.createElement("div");
	const progressBarSpan = document.createElement("span");

	progressBarSpan.style.width = "100%";
	progressBarSpan.style.backgroundColor = "#fff";
	progressBarSpan.style.height = "4px";
	progressBarSpan.style.zIndex = "4";
	progressBarSpan.style.position = "absolute";
	progressBarSpan.style.bottom = "0";
	progressBarSpan.style.left = "0";

	messageBird.style.overflow = "hidden";
	
	messageBird.setAttribute("data-bird", "messageBird");	
	
	messageBird.setAttribute("class", `alert alert-${alert}`);
	messageDiv.classList.add(`text-${alert}`);
	messageDiv.innerHTML = message;
	
	if (progressBar) messageBird.appendChild(progressBarSpan);
	messageBird.appendChild(messageDiv);
	messageBox.appendChild(messageBird);

	// animate progres bar
	const width = messageBox.clientWidth;
	progressBarSpan.animate([
		// keyframes
		{ transform: `translateX(0px)` },
		{ transform: `translateX(${width}px)` }
	], {
		// timing options
		duration: duration || 3000
	});
	// animate
	$("[data-bird=\"messageBird\"]").fadeIn(() => {
		setTimeout(() => {
			messageBird.remove();
			if (method) return method();
		}, duration || 3000);
	});
}