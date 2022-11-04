import { adminBlogs } from "./blogs";
import { adminCreateBlog } from "./createBlog";
import { adminDashboard } from "./dashboard";
import { adminEditBlog } from "./editBlog";
import { adminLogin } from "./login";
import { storage, storageUpload, storageDelete } from "./storage";

const admin = {
	storage,
	storageDelete,
	storageUpload,
	blogs: adminBlogs,
	login: adminLogin,
	editBlog: adminEditBlog,
	dashboard: adminDashboard,
	createBlog: adminCreateBlog
}

export default admin;