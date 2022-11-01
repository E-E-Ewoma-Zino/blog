// The module for the users
import { model, Schema } from "mongoose";
import { IBlog } from "../interfaces/schema";

const blogSchema = new Schema<IBlog>({
	topic: String,
	subTopic: String,
	content: String,
	keywords: String,
	description: String,
	comments: [{
		type: Schema.Types.ObjectId,
		ref: "Comment"
	}],
	mainImage: String,
	media: Object
}, { timestamps: true });

export default model<IBlog>("Blog", blogSchema);