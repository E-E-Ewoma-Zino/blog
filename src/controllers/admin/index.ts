import { adminBlogs } from "./blogs";
import { deleteComment, verifyComment, updateComment } from "./comments";
import { adminCreateBlog } from "./createBlog";
import { adminDashboard } from "./dashboard";
import { allUsers, removeUser } from "./users";
import { adminEditBlog } from "./editBlog";
import { storage, storageUpload, storageDelete } from "./storage";

const admin = {
	storage,
	allUsers,
	removeUser,
	verifyComment,
	deleteComment,
	updateComment,
	storageDelete,
	storageUpload,
	blogs: adminBlogs,
	editBlog: adminEditBlog,
	dashboard: adminDashboard,
	createBlog: adminCreateBlog
}

export default admin;