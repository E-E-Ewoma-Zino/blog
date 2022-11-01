// The module for the users
import { model, Schema } from "mongoose";
import { ISiteManager } from "../interfaces/schema";

const siteManagerSchema = new Schema<ISiteManager>({
	siteName: String,
	siteUrl: String,
	contactInfo: {
		phoneNo: String,
		mail: String,
		whatsApp: String
	}
}, { timestamps: true });

export default model<ISiteManager>("SiteManager", siteManagerSchema);