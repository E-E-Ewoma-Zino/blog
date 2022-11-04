// call this function when ever a blog is created or updated
import slugify from "slugify";
import createDomPurify from "dompurify";
import { marked } from "marked";
import { JSDOM } from "jsdom";
import blog from "../libs/blog";
import { Types } from "mongoose";
import { IBlog } from "../interfaces/schema";

// allow dompurify to create html and purify it using the JSDOM().window
const { window } = (new JSDOM('<!DOCTYPE html>'));
// @ts-expect-error
const dompurify = createDomPurify(window);

export default async function preBlog(blogId: Types.ObjectId): Promise<void> {
	try {
		const theBlog = await blog.findById(blogId);

		const data = theBlog.data as IBlog;

		// convert title into url friendly string
		if (data.title) {
			const newSlug = slugify(data.title as string, {
				lower: true,
				strict: true
			});

			await blog.update({
				itemToUpdate: { _id: data._id } as IBlog,
				optionsToUse: "$set",
				propertyToUpdate: "slug",
				updateValue: newSlug
			});
		}

		if (data.markdown) {
			// convert md to html and remove malitious code
			const newMD = dompurify.sanitize(marked(data.markdown as string));
			await blog.update({
				itemToUpdate: { _id: data._id } as IBlog,
				optionsToUse: "$set",
				propertyToUpdate: "convertedMD",
				updateValue: newMD
			});
		}
	} catch (err) {
		const _err = err as Error;
		console.log("Error: in preBlog", _err);
	}
}