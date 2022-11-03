import { IRouter, Request, Response, Router } from "express";
import blog from "../controllers/blog";
import multer from "../config/multer";

const router: IRouter = Router();

// @desc	Blog Router
// @route	GET /blog/
router.get("/", (req: Request, res: Response): void => {
	res.send("BLOG POST GOES HERE");
});

// @desc	Create a blog api
// @route	POST /blog/
router.post("/", multer.single("image"), (req: Request, res: Response): Promise<void> => blog.create(req, res));

// @desc	Update a blog api
// @route	POST /blog/update
router.put("/update", multer.single("image"), (req: Request, res: Response): Promise<void> => blog.update(req, res));

// @desc	Delete a blog api
// @route	POST /blog/delete
router.delete("/delete", (req: Request, res: Response): Promise<void> => blog.delete(req, res));

export default router;