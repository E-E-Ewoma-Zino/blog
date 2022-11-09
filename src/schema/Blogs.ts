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
		user: String,
		comment: String,
		isVerified: Boolean,
		createdAt: {
			type: Date,
			default: new Date()
		}
	}],
	mainImage: Object
}, { timestamps: true });

export default model<IBlog>("Blog", blogSchema);