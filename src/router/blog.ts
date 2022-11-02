import { IRouter, Request, Response, Router } from "express";
import blog from "../controllers/blog";
import multer from "../config/multer";

const router: IRouter = Router();

// @desc	Blog Router
// @route	GET /blog/
router.get("/", (req: Request, res: Response): void => {
	res.send("BLOG POST GOES HERE");
});

// @desc	Create a blog api
// @route	POST /blog/
router.post("/",  multer.single("image"), (req: Request, res: Response): Promise<void> => blog.create(req, res));

// @desc	Display a blog post
// @route	GET /blog/post/:topic
router.get("/posts/:topic", (req: Request, res: Response): Promise<void> => blog.get(req, res));

export default router;