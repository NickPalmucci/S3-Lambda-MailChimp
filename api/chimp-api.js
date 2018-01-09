import axios from 'axios';

export const createCampaign = async (user, password, contentId, contentTitle) => {
    const config = {
        method: 'post',
        url: 'https://us17.api.mailchimp.com/3.0/campaigns',
        auth: {
            username: user,
            password: password
        },
        data: {
            type: 'regular',
            recipients: {
                list_id: '47e66d52c4'
            },
            settings: {
                title: contentTitle + '-' + contentId,
                subject_line: 'Id Protection Weekly',
                from_name: 'Eric'

            }
        }
    };

    try {
        const response = await axios(config);
        return response;
    } catch (e) {
        console.log('createCampagin bad response', e.response.data);
        return e
    }
};

export const putCampaignHtml = async (user, password, campaignId, html) => {
    const config = {
        method: 'put',
        url: 'https://us17.api.mailchimp.com/3.0/campaigns/'+campaignId+'/content',
        auth: {
            username: user,
            password: password
        },
        data: {
            html: html
        }
    };

    try {
        const response = await axios(config);
        return response;
    } catch (e) {
        console.log('putCampaginHtml bad response', e.response.data);
        return e
    }
};

export const sendCampaignTest = async (user, password, campaignId, testAddress) => {
    const config = {
        method: 'post',
        url: 'https://us17.api.mailchimp.com/3.0/campaigns/'+campaignId+'/actions/test',
        auth: {
            username: user,
            password: password
        },
        data: {
            test_emails: [testAddress],
            send_type: 'html'
        }
    };

    try {
        const response = await axios(config);
        return response;
    } catch (e) {
        console.log('sendCampaginTest bad response', e.response.data);
        return e
    }
};

export const sendCampaign = async (user, password, campaignId) => {
    const config = {
        method: 'post',
        url: 'https://us17.api.mailchimp.com/3.0/campaigns/'+campaignId+'/actions/send',
        auth: {
            username: user,
            password: password
        }
    };

    try {
        const response = await axios(config);
        return response;
    } catch (e) {
        console.log('sendCampagin bad response', e.response.data);
        return e
    }
};