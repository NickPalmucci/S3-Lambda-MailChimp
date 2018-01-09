import AWS from "aws-sdk";
import zlib from 'zlib';
import {parse} from './parse';

export default async (bucket, key) => {
    const client = new AWS.S3();

    const getHtml = new Promise((resolve, reject) => {
        const downloadStream = client.getObject({Bucket: bucket, Key: key}).createReadStream();
        downloadStream.on('error', error => {
            console.log('Failed to download', error);
            reject(error)
        });
        downloadStream.on('data', data => {
            const buffer = Buffer.from(data);
            zlib.unzip(buffer, (err, buff) => {
                if (err) {
                    console.log('unzip err', err)
                } else {
                    const htmlString = buff.toString('utf-8');
                    return resolve(htmlString);
                }
            });
        });
    });

    const htmlString = await getHtml;
    if (!(htmlString instanceof Error)) {
        const {contentId, contentTitle} = await parse(htmlString);
        return {htmlString, contentId, contentTitle}
    } else {
        return htmlString
    }
}

