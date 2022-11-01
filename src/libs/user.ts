// control user schema
import { Model } from "mongoose";
import { IUser } from "../interfaces/schema";
import Users from "../schema/Users";
import Edit from "./edit";

class User extends Edit {
	constructor(schema: Model<IUser>) {
		super(schema);
	}
}

export default new User(Users);