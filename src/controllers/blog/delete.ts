// controlls all the post requests
import fs from "fs";
import blog from "../../libs/blog";
import Blogs from "../../schema/Blogs";
import ALERTS from "../../constants/alerts";
import { Request, Response } from "express";
import STATUS from "../../constants/httpStatus";
import messageBird from "../../utils/messageBird";
import { SERVER_RES } from "../../constants/serverResponse";
import { IBlog } from "../../interfaces/schema";

export default async function deleteBolg(req: Request, res: Response): Promise<void> {
	console.log("body", req.body);

	const { itemId } = req.body;

	try {
		const theBlog = await blog.findById(itemId);
		const data = theBlog.data as IBlog;

		// delete img
		// Using fs to also delete the book file
		if (data) {
			fs.unlink(__dirname + "../../../../" + data.mainImage.path, async (err) => {
				if (err) {
					messageBird.message(ALERTS.WARNING, "Issues deleting blog image");
					// res.status(STATUS.NOT_FOUND_404).json(SERVER_RES({ message: "Could not find image", err: err.message, status: STATUS.NOT_FOUND_404, alert: ALERTS.DANGER }));
				}
			});

			fs.unlink(__dirname + "../../../../" + data.mainImage.path.replace("uploads\\", "uploads/thumbnail/"), async (err) => {
				if (err) {
					messageBird.message(ALERTS.WARNING, "Issues deleting thumbnail blog image");
					// res.status(STATUS.NOT_FOUND_404).json(SERVER_RES({ message: "Could not find image", err: err.message, status: STATUS.NOT_FOUND_404, alert: ALERTS.DANGER }));
				}
			});

			const deleteBlog = await blog.remove(itemId);

			if (!deleteBlog.data) {
				messageBird.message(ALERTS.SUCCESS, "Issues deleting blog");
				res.status(STATUS.NOT_FOUND_404).json(SERVER_RES({ message: "Could not find image", err: deleteBlog.err, status: STATUS.NOT_FOUND_404, alert: ALERTS.DANGER }));
			} else {
				messageBird.message(ALERTS.SUCCESS, "Deleted Blog");
				res.status(STATUS.NO_CONTENT_204).json(SERVER_RES({ message: "Deleted Blog", err: null, status: STATUS.NO_CONTENT_204, alert: ALERTS.SUCCESS }));
			}
		} else {
			messageBird.message(ALERTS.SUCCESS, "Failed to delete blog");
			res.status(STATUS.BAD_REQUEST_400).json(SERVER_RES({ message: "Failed to delete", err: itemId + " is not found in the db", status: STATUS.BAD_REQUEST_400, alert: ALERTS.SUCCESS }));
		}

	} catch (err) {
		const _err = err as Error;
		console.log("Error:", _err);
		messageBird.message(ALERTS.DANGER, "Internal Server Error");
		res.status(STATUS.SERVER_ERR_500).json(SERVER_RES({ message: "Failed To Delete", err: _err.message, status: STATUS.SERVER_ERR_500, alert: ALERTS.DANGER }));
	}
}