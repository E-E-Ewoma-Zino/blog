// The module for the users
import slugify from "slugify";
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
	caption: String,
	markdown: String,
	dummyDate: {
		type: Date,
		default: Date.now()
	},
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

blogSchema.pre("save", function (){
	if (this.title) {
		this.slug = slugify(this.title as string, {
			lower: true,
			strict: true
		});
	}
});

export default model<IBlog>("Blog", blogSchema);