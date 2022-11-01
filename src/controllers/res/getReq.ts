// use this route to get response on the different schema

import { Types } from "mongoose";
import user from "../../libs/user";
import { Request, Response } from "express";
import ALERTS from "../../constants/alerts";
import STATUS from "../../constants/httpStatus";
import { SERVER_RES, SERVER_RES_ARRAY } from "../../constants/serverResponse";

export default function getRes(req: Request, res: Response) {
	console.log(">body", req.params);

	let schema = user;

	// assign the schema
	switch (req.params.schema.toLowerCase()) {
		case "user": schema = user;
			break;
		default: return res.status(STATUS.NOT_FOUND_404).json(SERVER_RES({ err: "Could not find the schema", message: "Bad request!", alert: ALERTS.DANGER, status: STATUS.NOT_FOUND_404 }));
	}

	// call the method
	switch (req.params.method.toLowerCase()) {
		case "all": all(req, res);
			break;
		case "byid": byId(req, res);
			break;
		case "byopt": byOpt(req, res);
			break;
		case "populated": allAndPopulate(req, res);
			break;
		case "populatedbyid": byIdAndPopulate(req, res);
			break;
		default: return res.status(STATUS.NOT_FOUND_404).json(SERVER_RES({ err: "Could not find the method", message: "Bad request!", alert: ALERTS.DANGER, status: STATUS.NOT_FOUND_404 }));
	}

	// define the method
	async function all(req: Request, res: Response) {
		try {
			const { status, ...otherData } = await schema.findAll();
			return res.status(status).json(SERVER_RES_ARRAY({ status, ...otherData }));
		} catch (error) {
			const err = error as Error;
			return res.status(STATUS.SERVER_ERR_500).json(SERVER_RES({ message: "An error occured in our server", err: err.message, alert: ALERTS.DANGER, status: STATUS.SERVER_ERR_500 }));
		}
	}

	async function byId(req: Request, res: Response) {
		try {
			const { status, ...otherData } = await schema.findById(new Types.ObjectId(req.query.id as string));
			return res.status(status).json(SERVER_RES({ status, ...otherData }));
		} catch (error) {
			const err = error as Error;
			return res.status(STATUS.SERVER_ERR_500).json(SERVER_RES({ message: "An error occured in our server", err: err.message, alert: ALERTS.DANGER, status: STATUS.SERVER_ERR_500 }));
		}
	}

	async function byOpt(req: Request, res: Response) {
		try {
			const { status, ...otherData } = await schema.findAll({ [req.query.opt as string]: req.query.value });
			return res.status(status).json(SERVER_RES_ARRAY({ status, ...otherData }));
		} catch (error) {
			const err = error as Error;
			return res.status(STATUS.SERVER_ERR_500).json(SERVER_RES({ message: "An error occured in our server", err: err.message, alert: ALERTS.DANGER, status: STATUS.SERVER_ERR_500 }));
		}
	}

	async function allAndPopulate(req: Request, res: Response) {
		try {
			const { status, ...otherData } = await schema.findAllAndPopoulate({}, req.query.opt as string);
			return res.status(status).json(SERVER_RES_ARRAY({ status, ...otherData }));
		} catch (error) {
			const err = error as Error;
			return res.status(STATUS.SERVER_ERR_500).json(SERVER_RES({ message: "An error occured in our server", err: err.message, alert: ALERTS.DANGER, status: STATUS.SERVER_ERR_500 }));
		}
	}

	async function byIdAndPopulate(req: Request, res: Response) {
		try {
			const { status, ...otherData } = await schema.findByIdAndPopulate(new Types.ObjectId(req.query.id as string), req.query.opt as string);
			return res.status(status).json(SERVER_RES({ status, ...otherData }));
		} catch (error) {
			const err = error as Error;
			return res.status(STATUS.SERVER_ERR_500).json(SERVER_RES({ message: "An error occured in our server", err: err.message, alert: ALERTS.DANGER, status: STATUS.SERVER_ERR_500 }));
		}
	}
}