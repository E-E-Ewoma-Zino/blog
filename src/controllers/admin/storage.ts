// controlls the dashboard
import fs from "fs";
import image from "../../libs/image";
import ALERTS from "../../constants/alerts";
import { Request, Response } from "express";
import STATUS from "../../constants/httpStatus";
import { IImage, IUser } from "../../interfaces/schema";
import messageBird from "../../utils/messageBird";
import { SERVER_RES } from "../../constants/serverResponse";


export async function storage(req: Request, res: Response): Promise<void> {
	try {
		const user = req.user as IUser;
		const allImages = await image.findAll({});

		const start = Number(req.query.start) || 0;
		const stop = Number(req.query.stop) || 20;

		if (allImages.err) messageBird.message(ALERTS.DANGER, "No images in db");

		res.render("admin/storage", {
			stop: stop,
			start: start,
			user: user.username,
			bird: messageBird.fly,
			mediaLength: allImages.data.length,
			images: allImages.data.reverse().slice(start, stop)
		});
	} catch (err) {
		const _err = err as Error;
		console.log("Error:", _err);
		res.status(STATUS.SERVER_ERR_500).json(SERVER_RES({ message: "Failed Login", err: _err.message, status: STATUS.SERVER_ERR_500, alert: ALERTS.DANGER }));
	}
}

export async function storageUpload(req: Request, res: Response): Promise<void> {
	try {
		console.log("file", req.file);

		const newImage = await image.create(req.file);

		if (newImage.err) messageBird.message(ALERTS.DANGER, "No images in db");
		else messageBird.message(ALERTS.SUCCESS, "Uploaded Image");
		res.redirect("back");
	} catch (err) {
		const _err = err as Error;
		console.log("Error:", _err);
		res.status(STATUS.SERVER_ERR_500).json(SERVER_RES({ message: "Failed Login", err: _err.message, status: STATUS.SERVER_ERR_500, alert: ALERTS.DANGER }));
	}
}

export async function storageDelete(req: Request, res: Response): Promise<void> {
	console.log("body", req.body);

	const { itemId } = req.body;

	try {
		const theImage = await image.findById(itemId);
		const data = theImage.data as IImage;
		console.log("here1");

		// delete img
		if (data) fs.stat(__dirname + "../../../../" + data.path, (fsStats_err, stats) => {
			console.log("here2");
			if (fsStats_err) {
				console.error("fsStats_err:", fsStats_err);
				try {
					throw { message: "Check to see if the file stil exist", err: "Could not delete this media!", status: 400, alert: "danger" };
				} catch (err) {
					messageBird.message(ALERTS.DANGER, "Failed!");
					console.log("The Error:", err);
				}
			}
			// Using fs to also delete the book file
			else fs.unlink(__dirname + "../../../../" + data.path, async (unlink_err) => {
				console.log("here3");
				if (unlink_err) {
					console.error("unlink_err:", unlink_err);
					try {
						throw { message: "Check to see if the file stil exist", err: "Could not delete this media!", status: 400, alert: "danger" };
					} catch (err) {
						messageBird.message(ALERTS.DANGER, "Failed!");
						console.log("The Error:", err);
					}
				}
				else {
					console.log("=================SAVE===============");
					console.log("file deleted successfully");

					await image.remove(itemId);
					messageBird.message(ALERTS.SUCCESS, "Deleted Image");
				}
			});
		});

		res.status(STATUS.NO_CONTENT_204).json(SERVER_RES({ message: "Deleted Image", err: null, status: STATUS.NO_CONTENT_204, alert: ALERTS.SUCCESS }));
	} catch (err) {
		const _err = err as Error;
		console.log("Error:", _err);
		res.status(STATUS.SERVER_ERR_500).json(SERVER_RES({ message: "Failed Login", err: _err.message, status: STATUS.SERVER_ERR_500, alert: ALERTS.DANGER }));
	}
}