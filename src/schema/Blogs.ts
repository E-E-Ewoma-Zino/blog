// The module for the users
import { marked } from "marked";
import { JSDOM } from "jsdom";
import slugify from "slugify";
import createDomPurify from "dompurify";
import { model, Schema } from "mongoose";
import { IBlog } from "../interfaces/schema";

// allow dompurify to create html and purify it using the JSDOM().window
const { window } = (new JSDOM('<!DOCTYPE html>'));
// @ts-expect-error
const dompurify = createDomPurify(window);

const blogSchema = new Schema<IBlog>({
	title: String,
	slug: {
		type: String,
		unique: true
	},
	content: String,
	keywords: String,
	description: String,
	markdown: String,
	convertedMD: String,
	comments: [{
		type: Schema.Types.ObjectId,
		ref: "Comment"
	}],
	mainImage: Object,
}, { timestamps: true });

blogSchema.pre("validate", function (next): void {
	if (this.title) {
		// convert title into url friendly string
		this.slug = slugify(this.title as string, {
			lower: true,
			strict: true
		});
	}

	if (this.markdown) {
		// convert md to html and remove malitious code
		this.convertedMD = dompurify.sanitize(marked(this.markdown as string));
	}

	next();
});

export default model<IBlog>("Blog", blogSchema);