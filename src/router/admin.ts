import { IRouter, Request, Response, Router } from "express";
import admin from "../controllers/admin";

const router: IRouter = Router();

// @desc	Admin Router
// @route	GET /
router.get("/", (req: Request, res: Response): Promise<void> => admin.dashboard(req, res));

// @desc	Admin blog page
// @route	GET /blog
router.get("/blog", (req: Request, res: Response): Promise<void> => admin.blogs(req, res));

// @desc	Admin create blog page
// @route	GET /blog/create
router.get("/blog/create", (req: Request, res: Response): Promise<void> => admin.createBlog(req, res));

// @desc	Admin edit blog page
// @route	GET /blog/edit/:slug
router.get("/blog/edit/:slug", (req: Request, res: Response): Promise<void> => admin.editBlog(req, res));

export default router;