// control the blog behaviour

import getBlog from "./get";
import createBlog from "./create";
import updateBlog from "./update";
import deleteBlog from "./delete";
import createComment from "./comment";

const blog = {
	get: getBlog,
	create: createBlog,
	update: updateBlog,
	delete: deleteBlog,
	comment: createComment
}

export default blog;