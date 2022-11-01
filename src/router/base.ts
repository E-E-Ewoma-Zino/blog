import { IRouter, Request, Response, Router } from "express";
import auth from "../middleware/auth";

const router: IRouter = Router();

// @desc	Home Router
// @route	/
router.get("/", (req: Request, res: Response): void => {
	res.render("client/index");
});

router.get("/welcome", auth, (req: Request, res: Response) =>{
	console.log("req", res.locals.user);
	res.send("Welcome {{wave}}");
});

export default router;