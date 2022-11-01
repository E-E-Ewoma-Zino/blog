// manipulates the db
import ALERTS from "../constants/alerts";
import { Callback, Error, isValidObjectId, Model, Types } from "mongoose";
import { IEdit, IUpdateParameters } from "../interfaces/edit";
import { DB_TYPES } from "../types/dbTypes";
import { IServerResponse, IServerResponseArray } from "../interfaces/response";
import { SERVER_RES, SERVER_RES_ARRAY } from "../constants/serverResponse";
import STATUS from "../constants/httpStatus";

class Edit implements IEdit {
	getSchema: Function;

	constructor(schema: Model<any>) {
		// this.schema = schema;
		let _schema = schema;
		this.getSchema = function (): Model<any> { return _schema; }
	}

	async findById(schemaId: Types.ObjectId, callback?: Callback<Function>): Promise<IServerResponse<DB_TYPES>> {
		try {
			if (!schemaId || !isValidObjectId(schemaId)) return SERVER_RES({ status: STATUS.FORBIDDEN_403, alert: ALERTS.DANGER, message: "Invalid request using id of " + schemaId, err: "Invalid Request!" });

			const item: DB_TYPES = await this.getSchema().findById({ _id: schemaId }).exec(callback);

			if (!item) return SERVER_RES({ status: STATUS.NOT_FOUND_404, alert: ALERTS.DANGER, message: "Could not find item with id " + schemaId, err: "Not found!", data: item });

			return SERVER_RES({ status: STATUS.OK_200, alert: ALERTS.SUCCESS, message: "Found item with id " + schemaId, err: null, data: item });
		} catch (err) {
			const _err = err as Error;
			console.error("Server Error! Failed to findById:", err);
			return SERVER_RES({ status: STATUS.SERVER_ERR_500, alert: ALERTS.DANGER, message: "Server Error! Failed to findById", err: _err.message });
		}
	}

	async findAllAndPopoulate(opt: DB_TYPES | Object, populateOpt:String, callback?: Callback<Function>): Promise<IServerResponseArray<DB_TYPES>> {
		try {
			const item: Array<DB_TYPES> = await this.getSchema().find(opt).populate(populateOpt).exec(callback);

			if (!item) return SERVER_RES_ARRAY({ status: STATUS.NOT_FOUND_404, alert: ALERTS.DANGER, message: "Could not findAllAndPopoulate item with opt " + populateOpt, err: "Not found!", data: [] });

			return SERVER_RES_ARRAY({ status: STATUS.OK_200, alert: ALERTS.SUCCESS, message: "Found items with opt " + populateOpt, err: null, data: item });
		} catch (err) {
			const _err = err as Error;
			console.error("Server Error! Failed to findAllAndPopoulate:", err);
			return SERVER_RES_ARRAY({ status: STATUS.SERVER_ERR_500, alert: ALERTS.DANGER, message: "Server Error! Failed to findAllAndPopoulate", err: _err.message, data: [] });
		}
	}

	async findByIdAndPopulate(schemaId: Types.ObjectId, populateOpt: String, callback?: Callback<Function>): Promise<IServerResponse<DB_TYPES>> {
		try {
			if (!schemaId || !isValidObjectId(schemaId)) return SERVER_RES({ status: STATUS.FORBIDDEN_403, alert: ALERTS.WARNING, message: "Invalid request using id of " + schemaId, err: "Invalid Request!" });

			const item: DB_TYPES = await this.getSchema().findById({ _id: schemaId }).populate(populateOpt).exec(callback);

			if (!item) return SERVER_RES({ status: STATUS.NOT_FOUND_404, alert: ALERTS.DANGER, message: "Could not findByIdAndPopoulate item with id " + schemaId, err: "Not found!", data: item });

			return SERVER_RES({ status: STATUS.OK_200, alert: ALERTS.SUCCESS, message: "Found item with id " + schemaId, err: null, data: item });
		} catch (err) {
			const _err = err as Error;
			console.error("Server Error! Failed to findByIdAndPopoulate:", err);
			return SERVER_RES({ status: STATUS.SERVER_ERR_500, alert: ALERTS.DANGER, message: "Server Error! Failed to findByIdAndPopoulate", err: _err.message });
		}
	}

	async findAll(opt = {}, callback?: Callback<Function>): Promise<IServerResponseArray<DB_TYPES>> {
		try {
			const item: Array<DB_TYPES> = await this.getSchema().find(opt, callback);

			if (!item) return SERVER_RES_ARRAY({ status: STATUS.NOT_FOUND_404, alert: ALERTS.DANGER, message: "Could not findAll", err: "Not found!", data: [] });

			return SERVER_RES_ARRAY({ status: STATUS.OK_200, alert: ALERTS.SUCCESS, message: "Found items", err: null, data: item });
		} catch (err) {
			const _err = err as Error;
			console.error("Server Error! Failed to findAll:", err);
			return SERVER_RES_ARRAY({ status: STATUS.SERVER_ERR_500, alert: ALERTS.DANGER, message: "Server Error! Failed to findAll", err: _err.message, data: [] });
		}
	}

	async aggregate(agg = {}, callback?: Callback<Function>): Promise<IServerResponseArray<DB_TYPES>> {
		try {
			const item: Array<DB_TYPES> = await this.getSchema().aggregate(agg, callback);

			if (!item) return SERVER_RES_ARRAY({ status: STATUS.NOT_FOUND_404, alert: ALERTS.DANGER, message: "Could not aggregate", err: "Not found!", data: [] });

			return SERVER_RES_ARRAY({ status: STATUS.OK_200, alert: ALERTS.SUCCESS, message: "Found items", err: null, data: item });
		} catch (err) {
			const _err = err as Error;
			console.error("Server Error! Failed to aggregate:", err);
			return SERVER_RES_ARRAY({ status: STATUS.SERVER_ERR_500, alert: ALERTS.DANGER, message: "Server Error! Failed to aggregate", err: _err.message, data: [] });
		}
	}

	async create(data = {}, callback?: Callback<Function>): Promise<IServerResponse<DB_TYPES>> {
		try {
			const item: DB_TYPES = await this.getSchema().create(data, callback);

			if (!item) return SERVER_RES({ status: STATUS.NOT_FOUND_404, alert: ALERTS.DANGER, message: "Could not create", err: "Not found!" });

			return SERVER_RES({ status: STATUS.OK_200, alert: ALERTS.SUCCESS, message: "Found items", err: null, data: item });
		} catch (err) {
			const _err = err as Error;
			console.error("Server Error! Failed to create:", err);
			return SERVER_RES({ status: STATUS.SERVER_ERR_500, alert: ALERTS.DANGER, message: "Server Error! Failed to create", err: _err.message });
		}
	}

	async remove(schemaId: Types.ObjectId, callback?: Callback<Function>): Promise<IServerResponse<DB_TYPES>> {
		try {
			const item: DB_TYPES = await this.getSchema().deleteOne({ _id: schemaId }, callback);

			if (!item) return SERVER_RES({ status: STATUS.NOT_FOUND_404, alert: ALERTS.DANGER, message: "Could not remove", err: "Not found!" });

			return SERVER_RES({ status: STATUS.OK_200, alert: ALERTS.SUCCESS, message: "Found items", err: null, data: item });
		} catch (err) {
			const _err = err as Error;
			console.error("Server Error! Failed to remove:", err);
			return SERVER_RES({ status: STATUS.SERVER_ERR_500, alert: ALERTS.DANGER, message: "Server Error! Failed to remove", err: _err.message });
		}
	}

	// update an item
	async update({ itemToUpdate, propertyToUpdate, optionsToUse, updateValue }: IUpdateParameters, callback?: Callback<Function>): Promise<IServerResponse<DB_TYPES>> {
		try {
			if (!itemToUpdate._id || !isValidObjectId(itemToUpdate._id)) return SERVER_RES({ status: STATUS.FORBIDDEN_403, alert: ALERTS.WARNING, message: "Invalid request using id of " + itemToUpdate, err: "Invalid Request!" });
		
			const item: DB_TYPES = await this.getSchema().findOneAndUpdate(itemToUpdate, { [optionsToUse.toString()]: { [propertyToUpdate.toString()]: updateValue }}, callback);

			if (!item) return SERVER_RES({ status: STATUS.NOT_FOUND_404, alert: ALERTS.DANGER, message: "Could not update", err: "Not found!" });

			return SERVER_RES({ status: STATUS.OK_200, alert: ALERTS.SUCCESS, message: "Found items", err: null, data: item });
		} catch (err) {
			const _err = err as Error;
			console.error("Server Error! Failed to update:", err);
			return SERVER_RES({ status: STATUS.SERVER_ERR_500, alert: ALERTS.DANGER, message: "Server Error! Failed to update", err: _err.message });
		}
	}
}

export default Edit;