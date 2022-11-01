// The module for the users
import { model, Schema } from "mongoose";
import { IUser } from "../interfaces/schema";

const userSchema = new Schema<IUser>({
	// Things needed for all user Schema
	email: String,
	password: String,
	token: String,

	authLevel: {
		type: Number,
		min: 0,
		max: 1
	}
}, { timestamps: true });

export default model<IUser>("User", userSchema);