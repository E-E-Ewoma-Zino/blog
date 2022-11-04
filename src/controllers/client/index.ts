import { clientAbout } from "./about";
import { clientBlog } from "./blog";
import { clientHome } from "./home";

const client = {
	home: clientHome,
	blog: clientBlog,
	about: clientAbout
}

export default client;