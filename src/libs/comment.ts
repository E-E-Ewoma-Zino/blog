// control user schema
import { Model } from "mongoose";
import { IComment } from "../interfaces/schema";
import Comments from "../schema/Comments";
import Edit from "./edit";

class Comment extends Edit {
	constructor(schema: Model<IComment>) {
		super(schema);
	}
}

export default new Comment(Comments);