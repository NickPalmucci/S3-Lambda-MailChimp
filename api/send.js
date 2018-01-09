import { sendCampaignTest, sendCampaign } from './chimp-api';

export default (config) => {
    const {bucket, user, password, campaignId, testAddress} = config;

    return sendCampaignTest(user, password, campaignId, testAddress);
}
