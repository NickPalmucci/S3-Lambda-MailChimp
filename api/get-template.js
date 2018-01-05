import AWS from "aws-sdk";
import zlib from 'zlib';
import jsesc from 'jsesc';

export default (bucket, key) => {
    const client = new AWS.S3();

    return new Promise((resolve, reject) => {
        const downloadStream = client.getObject({Bucket: bucket, Key: key}).createReadStream();
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
                    const htmlString = buff.toString('utf-8');
                    return jsesc(htmlString);
                }
            });
        });
    });
}