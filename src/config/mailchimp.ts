import MailchimpT from "@mailchimp/mailchimp_transactional";
const mailchimpM = require("@mailchimp/mailchimp_marketing");

// mailchimp api key
mailchimpM.setConfig({
  apiKey: "ab77c5708e6da194e518233bbc1baad4-us21",
  server: "us21",
});

// mandrill api key
const transactionMC = MailchimpT("md-fQ0Tmgp49GLLJofPbOFh-Q");

export async function testMarketingMailchimp() {
  const response = await mailchimpM.ping.get();
  console.log("ResssM>>>", response);
}

export async function testTransactionalMailchimp() {
	const response = await transactionMC.users.ping();
	console.log("ResssT>>>", response);
}

const mailchimp = {
	transactionMC,
	marketingMC: mailchimpM
}

export default mailchimp;