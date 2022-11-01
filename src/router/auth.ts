// authentication route

import { IRouter, Request, Response, Router } from "express";
import LoginUser from "../controllers/authentication/login";
import RegisterUser from "../controllers/authentication/register";

const router: IRouter = Router();

// @desc	Reguster a user useing this route
// @route	/auth/register
router.post("/register", (req: Request, res: Response) => RegisterUser(req, res));

// @desc	Login a user useing this route
// @route	/auth/login
router.post("/login", (req: Request, res: Response) => LoginUser(req, res));

export default router;