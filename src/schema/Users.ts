// The module for the users
import bcrypt from "bcrypt";
import { model, Schema } from "mongoose";
import { IUser } from "../interfaces/schema";

const userSchema = new Schema<IUser>({
	// Things needed for all user Schema
	email: String,
	username: String,
	password: String,

	authLevel: {
		type: Number,
		default: 0,
		min: 0,
		max: 1
	}
}, { timestamps: true });

userSchema.pre("save", async function (next) {
	if(!this.isModified("password")) next();

	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password as string, salt);
});

export default model<IUser>("User", userSchema);