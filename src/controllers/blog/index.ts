// control the blog behaviour

import getBlog from "./get";
import createBlog from "./create";
import createComment from "./comment";

const blog = {
	get: getBlog,
	create: createBlog,
	comment: createComment
}

export default blog;