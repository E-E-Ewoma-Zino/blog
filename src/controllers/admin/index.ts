import { adminCreateBlog } from "./createBlog";
import { adminDashboard } from "./dashboard";
import { adminLogin } from "./login";

const admin = {
	login: adminLogin,
	dashboard: adminDashboard,
	createBlog: adminCreateBlog
}

export default admin;