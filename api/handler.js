import '../.env';
import getTemplate from './get-template';
import { createCampaign, putCampaignHtml, sendCampaignTest } from './chimp-api';
import { getIdFromList } from './check-list';
import send from './send';
import {sendEmail} from './send-error';

module.exports.sendTestEmail = async (event, context, callback) => {
    const bucket = event.Records[0].s3.bucket.name;
    const user = process.env.CHIMP_USER;
    const password = process.env.CHIMP_KEY;
    const testAddress = process.env.TEST_ADDRESS;

    const {htmlString, contentId, contentTitle} = await getTemplate(bucket, "index.html");
    const checkForId = await getIdFromList(user, password, contentId, contentTitle);
    console.log('Check For ID', checkForId);

    if (checkForId) {
        const htmlPutToExisting = await putCampaignHtml(user, password, checkForId, htmlString);

        if (!(htmlPutToExisting instanceof Error)) {
            const campaignId = checkForId;

            const sendConfig = {
                bucket,
                user,
                password,
                campaignId,
                testAddress
            };

            const sendResponse = await send(sendConfig);
            console.log('Send Branch with pre-existing Campaign');
        } else {
            console.log('send aborted pre-existing campagin branch');
        }
    } else {
        const newCampaign = await createCampaign(user, password, contentId, contentTitle);
        const campaignId = newCampaign.data.id;
        const htmlPutResponse = await putCampaignHtml(user, password, campaignId, htmlString);

        if (!(htmlPutResponse instanceof Error)) {
            const sendConfig = {
                bucket,
                user,
                password,
                campaignId,
                testAddress
            };

            const sendResponse = await send(sendConfig);
            console.log('Send New Campaign Branch');
        } else {
            console.log('send aborted new campaign branch');
        }

    }

    // const sendRequest = await sendEmail('iirrexample@gmail.com', 'new test!', await data);

    callback(null, { message: 'function executed successfully!', event });
};
