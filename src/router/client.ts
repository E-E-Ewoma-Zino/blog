import { IRouter, Request, Response, Router } from "express";
import client from "../controllers/client";

const router: IRouter = Router();

// @desc	Client Router
// @route	GET /
router.get("/", (req: Request, res: Response): Promise<void> => client.home(req, res));

// @desc	Blogs
// @route	GET /blogs/:slug
router.get("/blogs/:slug", (req: Request, res: Response): Promise<void> => client.blog(req, res));

export default router;