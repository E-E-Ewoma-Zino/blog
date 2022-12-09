import { adminBlogs } from "./blogs";
import { deleteComment, verifyComment } from "./comments";
import { adminCreateBlog } from "./createBlog";
import { adminDashboard } from "./dashboard";
import { allUsers } from "./users";
import { adminEditBlog } from "./editBlog";
import { storage, storageUpload, storageDelete } from "./storage";

const admin = {
	storage,
	allUsers,
	verifyComment,
	deleteComment,
	storageDelete,
	storageUpload,
	blogs: adminBlogs,
	editBlog: adminEditBlog,
	dashboard: adminDashboard,
	createBlog: adminCreateBlog
}

export default admin;