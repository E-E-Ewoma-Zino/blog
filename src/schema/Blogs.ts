// The module for the users
import { model, Schema } from "mongoose";
import { IBlog } from "../interfaces/schema";


const blogSchema = new Schema<IBlog>({
	title: String,
	author: String,
	slug: {
		type: String,
		unique: true
	},
	subTitle: String,
	keywords: String,
	description: String,
	markdown: String,
	convertedMD: String,
	comments: [{
		user: {
			username: String,
			email: String
		},
		comment: String,
		isVerified: {
			type: Boolean,
			default: false
		},
		createdAt: Date
	}],
	mainImage: Object
}, { timestamps: true });

export default model<IBlog>("Blog", blogSchema);