import axios from 'axios';

const getCampaignList = async (user, password) => {
    const config = {
        method: 'get',
        url: 'https://us17.api.mailchimp.com/3.0/campaigns',
        auth: {
            username: user,
            password: password
        }
    };

    try {
        const response = await axios(config);
        return response;
    } catch (e) {
        console.log('checkCampagin bad response', e.response.data);
        return e
    }
};

export const getIdFromList = async (user, password, contentId, contentTitle) => {
    const response = await getCampaignList(user, password);
    let id;
    if (!(response instanceof Error)) {
        const list = response.data.campaigns;
        const title = contentTitle + '-' + contentId;
        list.forEach((campaign) => {
            if (title === campaign.settings.title) {
                id = campaign.id;
            }
        });
    }
    return id;
};

