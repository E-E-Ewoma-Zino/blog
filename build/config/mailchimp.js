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
exports.testTransactionalMailchimp = exports.testMarketingMailchimp = void 0;
const mailchimp_transactional_1 = __importDefault(require("@mailchimp/mailchimp_transactional"));
const mailchimpM = require("@mailchimp/mailchimp_marketing");
// mailchimp api key
mailchimpM.setConfig({
    apiKey: "ab77c5708e6da194e518233bbc1baad4-us21",
    server: "us21",
});
// mandrill api key
const transactionMC = (0, mailchimp_transactional_1.default)("md-fQ0Tmgp49GLLJofPbOFh-Q");
function testMarketingMailchimp() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield mailchimpM.ping.get();
        console.log("ResssM>>>", response);
    });
}
exports.testMarketingMailchimp = testMarketingMailchimp;
function testTransactionalMailchimp() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield transactionMC.users.ping();
        console.log("ResssT>>>", response);
    });
}
exports.testTransactionalMailchimp = testTransactionalMailchimp;
const mailchimp = {
    transactionMC,
    marketingMC: mailchimpM
};
exports.default = mailchimp;
