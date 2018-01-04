import AWS from "aws-sdk";
import zlib from 'zlib';
import {sendEmail} from './send-email';
import '../.env';

module.exports.hello = async (event, context, callback) => {
    const client = new AWS.S3({accessKeyId: process.env.AWS_ACCESS_KEY_ID, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY});
    const data = new Promise((resolve, reject) => {
        const downloadStream = client.getObject({Bucket: "id-email", Key: "index.html"}).createReadStream();
        downloadStream.on('error', error => {
            reject(console.log('Failed to download', error))
        });
        downloadStream.on('data', data => {
            const buffer = Buffer.from(data);
            zlib.unzip(buffer, (err, buff) => {
                if (err) {
                    console.log('unzip err', err)
                } else {
                    console.log('unzip success');
                    return resolve(buff.toString('utf-8'))
                }
            });
        });
    });

    const sendRequest = await sendEmail('iirrexample@gmail.com', 'test!', await data);

    const response = {
        status: 200,
        body: {id: 'fuck'}
    };

    // Use this code if you don't use the http event with the LAMBDA-PROXY integration
    // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
    callback(null, response);
};




