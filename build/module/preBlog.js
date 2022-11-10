"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// call this function when ever a blog is created or updated
const slugify_1 = __importDefault(require("slugify"));
const dompurify_1 = __importDefault(require("dompurify"));
const marked_1 = require("marked");
const jsdom_1 = require("jsdom");
const blog_1 = __importDefault(require("../libs/blog"));
// allow dompurify to create html and purify it using the JSDOM().window
const { window } = (new jsdom_1.JSDOM('<!DOCTYPE html>'));
// @ts-expect-error
const dompurify = (0, dompurify_1.default)(window);
function preBlog(blogId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const theBlog = yield blog_1.default.findById(blogId);
            const data = theBlog.data;
            // convert title into url friendly string
            if (data.title) {
                const newSlug = (0, slugify_1.default)(data.title, {
                    lower: true,
                    strict: true
                });
                yield blog_1.default.update({
                    itemToUpdate: { _id: data._id },
                    optionsToUse: "$set",
                    propertyToUpdate: "slug",
                    updateValue: newSlug
                });
            }
            if (data.markdown) {
                // convert md to html and remove malitious code
                const newMD = dompurify.sanitize((0, marked_1.marked)(data.markdown));
                yield blog_1.default.update({
                    itemToUpdate: { _id: data._id },
                    optionsToUse: "$set",
                    propertyToUpdate: "convertedMD",
                    updateValue: newMD
                });
            }
        }
        catch (err) {
            const _err = err;
            console.log("Error: in preBlog", _err);
        }
    });
}
exports.default = preBlog;
