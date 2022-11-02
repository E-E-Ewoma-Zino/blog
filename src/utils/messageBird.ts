// this is the script for the message bird notification

class MessageBird {
	fly: Array<Object> = [];

	kill() {
		setTimeout(() => {
			this.fly.shift();
		}, 13000);
	}

	message(alert: String, message: String) {
		this.fly.push({
			alert: alert,
			message: message
		});

		this.kill();
	}
}

export default new MessageBird();