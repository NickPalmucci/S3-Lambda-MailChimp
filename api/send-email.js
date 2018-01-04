import AWS from 'aws-sdk';
import '../.env';

const emailClient = new AWS.SES({
    apiVersion: '2010-12-01',
    region: process.env.SERVERLESS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

module.exports.sendEmail = (to, subject, html) => {
    const Charset = 'utf-8';
    const params = {
        Destination: {
            ToAddresses: [to]
        },
        Message: {
            Body: {
                Html: {
                    Data: html,
                    Charset
                }
            },
            Subject: {
                Data: subject,
                Charset
            }
        },
        Source: process.env.FROM_EMAIL,
        SourceArn: process.env.SES_SOURCE_ARN
    };
    return emailClient.sendEmail(params, (err, data) => {
        if (err) {console.log('ses error!', err)}
        else {
            console.log('ses success', data)
        }
    });
};
