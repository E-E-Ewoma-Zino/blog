import { connect } from "mongoose";

//  Configure mongodb for online and local DB
export default async function (): Promise<void> {
	try {
		const devUrl = process.env.MONGO_DEVELOPMENT_URL as string;
		const proUrl = process.env.MONGO_PRODUCTION_URL as string;
		
		const connected = await connect(process.env.NODE_ENV === "production" ? proUrl : devUrl);
		// 
		console.log(`Connected Successfully at ${connected.connection.host}`);
	} catch (err) {
		console.error(":::::::::::::>" + err);
		process.exit(1);
	}
}