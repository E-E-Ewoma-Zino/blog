import { Callback, Types } from "mongoose";
import { IServerResponse, IServerResponseArray } from "./response";
import { DB_TYPES } from "../types/dbTypes";

export interface IUpdateParameters {
	itemToUpdate: DB_TYPES,
	propertyToUpdate: String,
	optionsToUse: String,
	updateValue: String | Object
}

export interface IEdit {
	getSchema: Function,
	findById(schemaId: Types.ObjectId, callback?: Callback<Function>): Promise<IServerResponse<DB_TYPES>>,
	findAllAndPopoulate(opt: Object, populateOpt: String, callback?: Callback<Function>): Promise<IServerResponseArray<DB_TYPES>>,
	findByIdAndPopulate(schemaId: Types.ObjectId, populateOpt: String, callback?: Callback<Function>): Promise<IServerResponse<DB_TYPES>>,
	findAll(opt: Object, callback?: Callback<Function>): Promise<IServerResponseArray<DB_TYPES>>,
	aggregate(agg: Object, callback?: Callback<Function>): Promise<IServerResponseArray<DB_TYPES>>,
	create(data: Object, callback?: Callback<Function>): Promise<IServerResponse<DB_TYPES>>,
	remove(schemaId: Types.ObjectId, callback?: Callback<Function>): Promise<IServerResponse<DB_TYPES>>,
	update({ itemToUpdate, propertyToUpdate, optionsToUse, updateValue }:IUpdateParameters, callback?: Callback<Function>): Promise<IServerResponse<DB_TYPES>>,
}