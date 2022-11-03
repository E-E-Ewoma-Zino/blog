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

interface IImage {
	fieldname: String,
	originalname: String,
	encoding: String,
	mimetype: String,
	destination: String,
	filename: String,
	path: String,
	size: Number
}

export interface IBlog {
	_id: Types.ObjectId,
	title: String,
	author: String,
	content: String,
	keywords: String,
	description: String,
	comments: Array<IComment>,
	slug: String,
	markdown: String,
	convertedMD: String,
	isImageUpdated: {
		type: Boolean,
		default: Boolean
	},
	mainImage: IImage, // convert to interface
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