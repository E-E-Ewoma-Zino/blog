"use strict";
// this is the script for the message bird notification
Object.defineProperty(exports, "__esModule", { value: true });
class MessageBird {
    constructor() {
        this.fly = [];
    }
    kill() {
        setTimeout(() => {
            this.fly.shift();
        }, 13000);
    }
    message(alert, message) {
        this.fly.push({
            alert: alert,
            message: message
        });
        this.kill();
    }
}
exports.default = new MessageBird();
