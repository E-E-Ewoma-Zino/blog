import passport from "passport";
import User from "../schema/Users";
import { PassportStatic } from "passport";
import { IUser } from "../interfaces/schema";
import { Strategy as LocalStrategy, IStrategyOptionsWithRequest, VerifyFunctionWithRequest } from "passport-local";
import comparePassword from "../module/comparePassword";
import { Request } from "express";

const option: IStrategyOptionsWithRequest = {
	usernameField: "email",
	passwordField: "password",
	passReqToCallback: true
}

const myLocalStrategy: VerifyFunctionWithRequest = async (req: Request, username: string, password: string, done): Promise<void> => {
	const user = await User.findOne({ email: username });

	if (user && await comparePassword(username, password)) done(null, user);
	else done(null, false);
}

// configure passport
passport.use(new LocalStrategy(option, myLocalStrategy));


// This methode works better than the one above
passport.serializeUser((user: any, done) => {
	done(null, user._id);
});

passport.deserializeUser(async function (id, done) {
	try {
		const user = await User.findById(id);
		done(null, user);
	} catch (err) {
		done(err, false);
	}
});


export default passport;