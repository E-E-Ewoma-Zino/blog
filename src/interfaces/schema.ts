import { Types } from "mongoose"

export interface IUser {
	_id: Types.ObjectId,
	email: String,
	password: String,
	token: String,
	authLevel: Number,
	createdAt: Date,
	updatedAt: Date
}

export interface IComment {
	_id: Types.ObjectId,
	userId: Types.ObjectId,
	blogId: Types.ObjectId,
	comment: String,
	reply: Array<IComment>,
	createdAt: Date,
	updatedAt: Date
}

export interface IBlog {
	_id: Types.ObjectId,
	topic: String,
	subTopic: String,
	content: String,
	keywords: String,
	description: String,
	comments: Array<IComment>,
	mainImage: String,
	media: Object,
	createdAt: Date,
	updatedAt: Date
}

export interface ISiteManager {
	_id: Types.ObjectId,
	siteName: String,
	siteUrl: String,
	contactInfo: {
		phoneNo: String,
		mail: String,
		whatsApp: String
	},
	createdAt: Date,
	updatedAt: Date
}