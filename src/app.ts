import { config } from "dotenv";
import Express, {json, Request, Response, urlencoded } from "express";
import path from "path";
import db from "./config/db";
import STATUS from "./constants/httpStatus";
import routes from "./router";

// config .env
config();

// create app
const app = Express();

// configs
app.use(json());
app.use(Express.static("public"));
app.set("view engine", "ejs");
app.use(urlencoded({ extended: true }));
app.use('/uploads', Express.static(path.join(__dirname + '/uploads')));

// set up db
(async ():Promise<void> => await db())();

// My routes

// @desc	for all client post "/client"
// @route	/
app.use("/", routes.client);
// @desc	for user authentication "/auth"
// @route	/auth
app.use("/auth", routes.auth);
// @desc	for all admin post "/admin"
// @route	/admin
app.use("/admin", routes.admin);
// @desc	for all blog post "/blog"
// @route	/blog
app.use("/blog", routes.blog);
// @desc	for all comment api "/comment"
// @route	/comment
app.use("/comment", routes.comment);
// @desc	404 Page
app.use((req: Request, res: Response)=> res.status(STATUS.NOT_FOUND_404).send("404 Not Found!"));

const port: Number = Number(process.env.PORT) || 5001;
app.listen(port, (): void => console.log(process.env.NODE_ENV ,"app at port", port));

/* cross-env NODE_ENV=Production */