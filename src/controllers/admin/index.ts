import { adminBlogs } from "./blogs";
import { adminCreateBlog } from "./createBlog";
import { adminDashboard } from "./dashboard";
import { adminEditBlog } from "./editBlog";
import { storage, storageUpload, storageDelete } from "./storage";

const admin = {
	storage,
	storageDelete,
	storageUpload,
	blogs: adminBlogs,
	editBlog: adminEditBlog,
	dashboard: adminDashboard,
	createBlog: adminCreateBlog
}

export default admin;