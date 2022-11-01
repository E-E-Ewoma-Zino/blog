import { IRouter, Request, Response, Router } from "express";
import blog from "../controllers/blog";
import auth from "../middleware/auth";

const router: IRouter = Router();

// @desc	Create a comment
// @route	POST /comment/
router.post("/", auth, (req: Request, res: Response): Promise<void> => blog.comment(req, res));

// @desc	Display a blog post
// @route	GET /blog/post/:topic
// router.get("/posts/:topic", (req: Request, res: Response): Promise<void> => blog.get(req, res));

export default router;