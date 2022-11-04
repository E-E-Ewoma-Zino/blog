// control user schema
import { Model } from "mongoose";
import { IImage } from "../interfaces/schema";
import Images from "../schema/Images";
import Edit from "./edit";

class Image extends Edit {
	constructor(schema: Model<IImage>) {
		super(schema);
	}
}

export default new Image(Images);