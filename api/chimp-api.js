import axios from 'axios';

export createCampaign = (user, password) => {
    const config = {
        method: 'post',
        url: 'chimpurl',
        auth: {
            username: user,
            password: password
        },
        data: {
            type: 'regular',
            recipients: {
                list_id: 'list'
            },
            settings: {
                title: 'title',
                subject_line: 'subject'

            }
        }

    };

    return axios(config);
};

export putCampaignHtml = (user, password, campaignId, html) => {
    const config = {
        method: 'put',
        url: 'chimpurl' + auth + campaignId,
        auth: {
            username: user,
            password: password
        },
        data: {
            html: html
        }
    };

    return axios(config);
};

export sendCampaignTest = (user, password, campaignId, testAddress) => {
    const config = {
        method: 'post',
        url: 'chimpurl' + auth + campaignId,
        auth: {
            username: user,
            password: password
        },
        data: {
            test_emails: [testAddress],
            send_type: 'html'
        }
    };

    return axios(config);
};