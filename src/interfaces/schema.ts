import { Types } from "mongoose"

export interface IUser {
	_id: Types.ObjectId,
	username: String,
	email: String,
	password: String,
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

export interface IImage {
	_id: Types.ObjectId,
	fieldname: String,
	originalname: String,
	encoding: String,
	mimetype: String,
	destination: String,
	filename: String,
	path: String,
	size: Number
	createdAt: Date,
	updatedAt: Date
}

export interface IBlog {
	_id: Types.ObjectId,
	title: String,
	author: String,
	subTitle: String,
	keywords: String,
	description: String,
	comments: Array <{
		comment: String,
		user: Object,
		isVerified: Boolean,
		createdAt: Date
	}>,
	slug: String,
	markdown: String,
	convertedMD: String,
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