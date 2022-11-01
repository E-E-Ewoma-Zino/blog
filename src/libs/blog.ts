// control user schema
import { Model } from "mongoose";
import { IBlog } from "../interfaces/schema";
import Blogs from "../schema/Blogs";
import Edit from "./edit";

class Blog extends Edit {
	constructor(schema: Model<IBlog>) {
		super(schema);
	}
}

export default new Blog(Blogs);