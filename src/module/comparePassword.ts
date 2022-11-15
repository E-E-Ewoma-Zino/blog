// compare password before authencating
import user from "../libs/user";
import bcrypt from "bcrypt";
import { IUser } from "../interfaces/schema";

export default async function comparePassword (theEmail: string, thePassword: string) {
	const theUser = await user.findAll({ email: theEmail });
	const data = theUser.data[0] as IUser;
	return await bcrypt.compare(thePassword, data.password as string);
}