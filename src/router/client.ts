import { IRouter, Request, Response, Router } from "express";
import blog from "../controllers/blog";
import client from "../controllers/client";
import auth from "../middleware/auth";

const router: IRouter = Router();

// @desc	Client Router
// @route	GET /
router.get("/", (req: Request, res: Response): Promise<void> => client.home(req, res));

// @desc	About Page
// @route	GET /about
router.get("/about", (req: Request, res: Response): Promise<void> => client.about(req, res));

// @desc	Blogs
// @route	GET /blogs/:slug
router.get("/blogs/:slug", (req: Request, res: Response): Promise<void> => client.blog(req, res));

// @desc	Blogs comments
// @route	GET /blogs/:slug
router.patch("/blogs/:slug", auth, (req: Request, res: Response): Promise<void> => blog.comment(req, res));

export default router;