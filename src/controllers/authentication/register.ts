// authenticate user
import { Request, Response } from "express";
import user from "../../libs/user";
import bcrypt from "bcryptjs";
import jwt, { Secret } from "jsonwebtoken";
import { IServerResponse } from "../../interfaces/response";
import { DB_TYPES } from "../../types/dbTypes";
import { SERVER_RES } from "../../constants/serverResponse";
import ALERTS from "../../constants/alerts";
import { IUser } from "../../interfaces/schema";
import STATUS from "../../constants/httpStatus";

export default async function RegisterUser(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined> {
	// Our register logic starts here
	try {
		console.log("body", req.body);

		// Get user input
		const { email, password } = req.body;

		// Validate user input
		if (!(email && password)) return res.status(STATUS.BAD_REQUEST_400).json(SERVER_RES({message: "All input is required", err: "Failed to register user", status: STATUS.BAD_REQUEST_400, alert: ALERTS.DANGER}));

		// check if user already exist
		// Validate if user exist in our database
		const oldUser = await user.findAll({ email });
		console.log("olduser is", oldUser);
		if (oldUser.status !== STATUS.OK_200) return res.status(oldUser.status).json(oldUser);
		if (oldUser.data.length) return res.status(STATUS.CONFLICT_409).json(SERVER_RES({message: "User Already Exist. Please Login", err: "Failed to register user", status: STATUS.CONFLICT_409, alert: ALERTS.DANGER}));

		//Encrypt user password
		const encryptedPassword = await bcrypt.hash(password, 10);
		console.log("encryptedPassword", encryptedPassword);

		// Create user in our database
		const newUser: IServerResponse<DB_TYPES> = await user.create({
			email: email.toLowerCase(), // sanitize: convert email to lowercase
			password: encryptedPassword,
		});
		if (newUser.status !== STATUS.OK_200) return res.status(newUser.status).json(newUser);
		const newUserData = newUser.data as IUser;
		console.log("newuser", newUser);

		// Create token
		const tokenData = { user_id: newUserData._id, email };
		const secretString: Secret = process.env.TOKEN_KEY || "backupsecret";
		const expirationTime = { expiresIn: "2h" };
		console.log("token", tokenData, "secret", secretString, "expiresIn", expirationTime);

		const token = jwt.sign(tokenData, secretString, expirationTime);
		console.log("the Token", token);

		// save user token
		const updateUserWithToken = await user.update({
			itemToUpdate: { _id: newUserData._id} as IUser,
			propertyToUpdate: "token",
			optionsToUse: "$set",
			updateValue: token
		});
		console.log("updated user", updateUserWithToken);
		if (updateUserWithToken.status !== STATUS.OK_200) return res.status(updateUserWithToken.status).json(updateUserWithToken);

		// return new user
		console.log("Done");
		return res.status(STATUS.CREATED_201).json(SERVER_RES({message: "Successfully Registered", err: null, status: STATUS.CREATED_201, alert: ALERTS.SUCCESS}));
	} catch (err) {
		const _err = err as Error;
		console.log("Error:", _err);
		res.status(500).json(SERVER_RES({ message: "Failed Registered", err: _err.message, status: 500, alert: ALERTS.DANGER }));
	}
	// Our register logic ends here
}