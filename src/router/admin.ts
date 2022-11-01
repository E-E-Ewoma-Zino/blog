import { IRouter, Request, Response, Router } from "express";
import admin from "../controllers/admin";

const router: IRouter = Router();

// @desc	Client Router
// @route	GET /
router.get("/", (req: Request, res: Response): Promise<void> => admin.dashboard(req, res));

export default router;