import { IRouter, Request, Response, Router } from "express";
import auth from "../middleware/auth";
import multer from "../config/multer";
import admin from "../controllers/admin";
import adminAuth from "../middleware/adminAuth";

const router: IRouter = Router();

// @desc	Admin Router
// @route	GET /
router.get("/", auth, adminAuth , (req: Request, res: Response): Promise<void> => admin.dashboard(req, res));

// @desc	Admin blog page
// @route	GET /blog
router.get("/blog", auth, adminAuth, (req: Request, res: Response): Promise<void> => admin.blogs(req, res));

// @desc	Admin users page
// @route	GET /users
router.get("/users", auth, adminAuth, (req: Request, res: Response): Promise<void> => admin.allUsers(req, res));

// @desc	Admin remove user
// @route	DELETE /users/remove
router.delete("/users/remove", auth, adminAuth, (req: Request, res: Response): Promise<void> => admin.removeUser(req, res));

// @desc	Admin create blog page
// @route	GET /blog/create
router.get("/blog/create", auth, adminAuth, (req: Request, res: Response): Promise<void> => admin.createBlog(req, res));

// @desc	Admin edit blog page
// @route	GET /blog/edit/:slug
router.get("/blog/edit/:slug", auth, adminAuth, (req: Request, res: Response): Promise<void> => admin.editBlog(req, res));

// @desc	Admin edit blog page
// @route	GET /blog/edit/:slug
router.patch("/blog/edit/:slug/comment", auth, adminAuth, (req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined> => admin.verifyComment(req, res));

// @desc	Admin edit blog page
// @route	GET /blog/edit/:slug
router.patch("/blog/edit/:slug/commentdate", auth, adminAuth, (req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined> => admin.updateComment(req, res));

// @desc	Admin edit blog page
// @route	GET /blog/edit/:slug
router.delete("/blog/edit/:slug/comment", auth, adminAuth, (req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined> => admin.deleteComment(req, res));

// @desc	Admin storage
// @route	GET /storage
router.get("/storage", auth, adminAuth, (req: Request, res: Response): Promise<void> => admin.storage(req, res));

// @desc	Admin storage
// @route	POST /storage
router.post("/storage", auth, adminAuth, multer.single("image"), (req: Request, res: Response): Promise<void> => admin.storageUpload(req, res));

// @desc	Admin storage
// @route	POST /storage
router.delete("/storage", auth, adminAuth, (req: Request, res: Response): Promise<void> => admin.storageDelete(req, res));

export default router;