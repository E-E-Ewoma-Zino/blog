import multer, { diskStorage } from "multer";
import path from "path";
import ALERTS from "../constants/alerts";
import messageBird from "../utils/messageBird";

// @desc	configure multer
const storage = diskStorage({
	destination: "uploads",
	filename: (req, file, callback) => {
		callback(null, file.fieldname + "-" + file.originalname + "-" + Date.now() + path.extname(file.originalname));
	}
});

export default multer({
	storage: storage,
	fileFilter: (req, file, cb) => {
		if (file.fieldname === "image") {
			if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/gif") {
				cb(null, true);
			} else {
				cb(null, false);
				messageBird.message(ALERTS.DANGER, "You can only upload .png, .jpg, .gif and .jpeg files!");
				messageBird.message(ALERTS.DANGER, "Please re-upload the file");
			}
		}
		else {
			cb(null, false);
			messageBird.message(ALERTS.DANGER, "name field must contain image");
			console.warn(ALERTS.DANGER, "name field must contain image");
		}
	}
});