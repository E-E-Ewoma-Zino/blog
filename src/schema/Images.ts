// The module for the images
import { model, Schema } from "mongoose";
import { IImage } from "../interfaces/schema";

const imageSchema = new Schema<IImage>({
	fieldname: String,
	originalname: String,
	encoding: String,
	mimetype: String,
	destination: String,
	filename: String,
	path: String,
	size: Number
}, { timestamps: true });

export default model<IImage>("Image", imageSchema);