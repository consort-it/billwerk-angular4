import * as https from 'https';
import * as querystring from 'querystring';
import { hostname, authKey } from '../config';

export function requestToken(sendChunk, finish, returnError): void {
    const options: https.RequestOptions = {
        hostname: hostname,
        path: '/oauth/token/',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': authKey
        }
    };

    const data: any = querystring.stringify({
        'grant_type': 'client_credentials'
    });

    const request: https.ClientRequest =
        https.request(
            options,
            function onResponse(res: https.IncomingMessage): void {
                res.setEncoding('utf8');
                res.on('data', (body): void => {
                    sendChunk(body);
                });
                res.on('end', (end): void => {
                    finish(end);
                });
            });
    request.on(
        'error',
        function onError(error): void {
            returnError(error);
            console.log('problem with request: ' + error.message);
        });
    request.write(data);
    request.end();
}

