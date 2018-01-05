import '../.env';
import getTemplate from './get-template';
import { createCampaign, putCampaignHtml, sendCampaignTest } from './chimp-api';
import {sendEmail} from './send-email';


module.exports.sendTestEmail = async (event, context, callback) => {
    const user = process.env.CHIMP_USER;
    const password = process.env.CHIMP_KEY;
    const testAddress = process.env.TEST_ADDRESS;

    const htmlTemplate = await getTemplate('id-email', "index.html");
    const newCampaign = await createCampaign(user, password);
    const campaignId = newCampaign.data.id;

    const htmlPutResponse = await putCampaignHtml(user, password, campaignId, htmlTemplate);
    sendCampaignTest(user, password, campaignId, testAddress);


    // const sendRequest = await sendEmail('iirrexample@gmail.com', 'new test!', await data);

    callback(null, { message: 'function executed successfully!', event });
};
