// authentication route

import { IRouter, NextFunction, Request, Response, Router } from "express";
import LoginUser from "../controllers/authentication/login";
import LogoutUser from "../controllers/authentication/logout";
import RegisterUser from "../controllers/authentication/register";

const router: IRouter = Router();

// @desc	Reguster a user useing this route
// @route	GET /auth/logout
router.get("/logout", (req: Request, res: Response) => LogoutUser(req, res));

// @desc	Reguster a user useing this route
// @route	POST /auth/register
router.post("/register", (req: Request, res: Response) => RegisterUser(req, res));

// @desc	Login a user useing this route
// @route	POST /auth/login
router.post("/login", (req: Request, res: Response, next: NextFunction) => LoginUser(req, res, next));

export default router;