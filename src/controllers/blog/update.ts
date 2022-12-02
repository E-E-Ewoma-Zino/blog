// controlls update for blog post requests
import fs from "fs";
import Blogs from "../../schema/Blogs";
import preBlog from "../../module/preBlog";
import ALERTS from "../../constants/alerts";
import { Request, Response } from "express";
import messageBird from "../../utils/messageBird";
import generateTinifyImg from "../../module/generateTinifyImg";

export default async function editBolg(req: Request, res: Response): Promise<void> {
	// console.log("body", req.body);
	console.log("query", req.query);
	console.log("file", req.file);

	const { title, subTitle, markdown, author, dummyDate, keywords, caption, description } = req.body;

	try {
		const updatedBlog = await Blogs.findOneAndUpdate({ _id: req.query.id }, { $set: { title, subTitle, markdown, author, dummyDate, keywords, caption, description, mainImage: req.file } });

		if (req.file && updatedBlog) fs.stat(__dirname + "../../../../" + updatedBlog.mainImage.path, (fsStats_err, stats) => {
			if (fsStats_err) {
				console.error("fsStats_err:", fsStats_err);
				try {
					throw { message: "Check to see if the file stil exist", err: "Could not delete this media!", status: 400, alert: "danger" };
				} catch (err) {
					console.log("The Error:", err);
				}
			}

			// Using fs to also delete the book file
			fs.unlink(__dirname + "../../../../" + updatedBlog.mainImage.path, (unlink_err) => {

				if (unlink_err) {
					console.error("unlink_err:", unlink_err);
					try {
						throw { message: "Check to see if the file stil exist", err: "Could not delete this media!", status: 400, alert: "danger" };
					} catch (err) {
						console.log("The Error:", err);
					}
				}
				else {
					console.log("=================SAVE===============");
					console.log("file deleted successfully");
				}
			});
		});

		// prevalidate blog
		preBlog(updatedBlog!._id);

		// generate thumbnail
		if(req.file) generateTinifyImg(req.file?.path as string, req.file?.filename as string);

		messageBird.message(ALERTS.SUCCESS, "Updated Blog");
		return res.redirect("back");
	} catch (err) {
		const _err = err as Error;
		console.log("Error:>>>>>>>", _err);
		messageBird.message(ALERTS.DANGER, "Internal Server Error");
		res.redirect("back");
		// res.status(STATUS.SERVER_ERR_500).json(SERVER_RES({ message: "Failed Login", err: _err.message, status: STATUS.SERVER_ERR_500, alert: ALERTS.DANGER }));
	}
}