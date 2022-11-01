// The module for the users
import { model, Schema } from "mongoose";
import { IComment } from "../interfaces/schema";

const commentSchema = new Schema<IComment>({
	blogId: Schema.Types.ObjectId,
	userId: Schema.Types.ObjectId,
	comment: String,
	reply: [{
		type: Schema.Types.ObjectId,
		ref: "Comment"
	}]
}, { timestamps: true });

export default model<IComment>("Comment", commentSchema);