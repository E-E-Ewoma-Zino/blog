// generate tinify img
import tinify from "tinify";

export default (imgPath: string, imgName: string) => {
	tinify.key = process.env.TINIFY_API_KEK as string;
	const source = tinify.fromFile(imgPath as string);
	const resized = source.resize({
		method: "thumb",
		width: 300,
		height: 300
	});
	resized.toFile(`${__dirname}/../../uploads/thumbnail/${imgName}`);
	return `/uploads/thumbnail/${imgName}`;
}