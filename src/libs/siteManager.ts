// control user schema
import { Model } from "mongoose";
import { ISiteManager } from "../interfaces/schema";
import siteManager from "../schema/SiteManager";
import Edit from "./edit";

class SiteManager extends Edit {
	constructor(schema: Model<ISiteManager>) {
		super(schema);
	}
}

export default new SiteManager(siteManager);