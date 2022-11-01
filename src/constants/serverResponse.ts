import { IServerResponse, IServerResponseArray } from "../interfaces/response";
import { DB_TYPES } from "../types/dbTypes";

// data refers to: Array<Type>
export const SERVER_RES_ARRAY = ({ message, err, status, alert, data }: IServerResponseArray<DB_TYPES>): IServerResponseArray<DB_TYPES> => ({ message, err, status, alert, data });

// data refers to: Type
export const SERVER_RES = ({ message, err, status, alert, data }: IServerResponse<DB_TYPES>): IServerResponse<DB_TYPES> => ({ message, err, status, alert, data });
