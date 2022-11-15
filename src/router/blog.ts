import { IRouter, Request, Response, Router } from "express";
import blog from "../controllers/blog";
import multer from "../config/multer";
import auth from "../middleware/auth";
import adminAuth from "../middleware/adminAuth";

const router: IRouter = Router();

// @desc	Blog Router
// @route	GET /blog/
router.get("/", (req: Request, res: Response): void => {
	res.redirect("/");
});

// @desc	Create a blog api
// @route	POST /blog/
router.post("/", adminAuth, multer.single("image"), (req: Request, res: Response): Promise<void> => blog.create(req, res));

// @desc	Update a blog api
// @route	POST /blog/update
router.put("/update", adminAuth, multer.single("image"), (req: Request, res: Response): Promise<void> => blog.update(req, res));

// @desc	Delete a blog api
// @route	POST /blog/delete
router.delete("/delete", adminAuth, (req: Request, res: Response): Promise<void> => blog.delete(req, res));

// @desc	Comment a blog api
// @route	POST /blog/comment
// router.patch("/comment", auth, (req: Request, res: Response): Promise<void> => blog.comment(req, res));

export default router;