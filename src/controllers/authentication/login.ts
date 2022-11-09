import { IUser } from "../../interfaces/schema";
import { Request, Response } from "express";
import user from "../../libs/user";
import bcrypt from "bcryptjs";
import jwt, { Secret } from "jsonwebtoken";
import STATUS from "../../constants/httpStatus";
import { SERVER_RES } from "../../constants/serverResponse";
import ALERTS from "../../constants/alerts";

export default async function LoginUser(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined> {
	// Our login logic starts here
	try {
		// Get user input
		const { email, password } = req.body;

		// Validate user input

		if (!(email && password)) return res.status(STATUS.BAD_REQUEST_400).json(SERVER_RES({message: "All input is required", err: "Failed to login user", status: STATUS.BAD_REQUEST_400, alert: ALERTS.DANGER}));

		// Validate if user exist in our database
		const theUser = await user.findAll({ email });

		// tell data what it is
		const data = theUser.data[0] as IUser;

		// check if a user was found
		if (!data?._id) return res.status(STATUS.UNAUTHORIZED_401).json(SERVER_RES({message: "User not found", err: "Failed to login user", status: STATUS.UNAUTHORIZED_401, alert: ALERTS.DANGER}));

		// decrept password
		const decreptedPassword: Boolean = await bcrypt.compare(password, data.password as string);
		if (!decreptedPassword) return res.status(STATUS.UNAUTHORIZED_401).json(SERVER_RES({message: "Password mismatch", err: "Failed to login user", status: STATUS.UNAUTHORIZED_401, alert: ALERTS.DANGER}));

		// Create token
		const tokenData = { user_id: data._id, email };
		const secretString: Secret = process.env.TOKEN_KEY || "backupstring";
		const expirationTime = { expiresIn: "2h" };
		const token = jwt.sign(tokenData, secretString, expirationTime);

		// save user token
		const updateUserWithToken = await user.update({
			itemToUpdate: { _id: data._id } as IUser,
			optionsToUse: "$set",
			propertyToUpdate: "token",
			updateValue: token
		});
		console.log("updated user", updateUserWithToken);
		if (updateUserWithToken.status !== STATUS.OK_200) return res.status(updateUserWithToken.status).json(updateUserWithToken);

		// user
		// add token to header
		return res.status(STATUS.CREATED_201).json(SERVER_RES({ data, message: "Loged In", err: null, status: STATUS.CREATED_201, alert: ALERTS.SUCCESS }));
	} catch (err) {
		const _err = err as Error;
		console.log("Error:", _err);
		res.status(500).json(SERVER_RES({ message: "Failed Login", err: _err.message, status: 500, alert: ALERTS.DANGER }));
	}
	// Our register logic ends here
}