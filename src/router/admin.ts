import { IRouter, Request, Response, Router } from "express";
import admin from "../controllers/admin";

const router: IRouter = Router();

// @desc	Admin Router
// @route	GET /
router.get("/", (req: Request, res: Response): Promise<void> => admin.dashboard(req, res));

// @desc	Admin create blog page
// @route	GET /create
router.get("/create", (req: Request, res: Response): Promise<void> => admin.createBlog(req, res));

export default router;