import { connect } from "mongoose";

//  Configure mongodb for online and local DB
export default async function (): Promise<void> {
	const uri = "mongodb+srv://Blog:Blog@blog.2mkerym.mongodb.net/Blog?retryWrites=true&w=majority";
	try {
		// const connected:Mongoose = await connect("mongodb://localhost:27017/electionDay");
		const connected = await connect(process.env.MONGO_URL || uri);

		console.log(`Connected Successfully at ${connected.connection.host}`);
	} catch (err) {
		console.error(":::::::::::::>" + err);
		process.exit(1);
	}
}