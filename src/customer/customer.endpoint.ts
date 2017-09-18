import * as https from 'https';
import * as querystring from 'querystring';
import { hostname, apiPath } from '../config';

export function getCustomers(authorization, sendChunk, finish, returnError): void {
    const options: https.RequestOptions = {
        hostname: hostname,
        path: `${apiPath}/Customers`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': authorization
        }
    };

    const request: https.ClientRequest =
        https.request(
            options,
            function onResponse(res: https.IncomingMessage): void {
                res.setEncoding('utf8');
                res.on('data', (chunk: string | Buffer) => {
                    sendChunk(chunk);
                });
                res.on('end', (end) => {
                    finish(end);
                });
            });
    request.on(
        'error',
        function onError(error: Error): void {
            returnError(error);
            console.log('problem with request: ' + error.message);
        });
    request.end();
}

export function getCustomerById(authorization, customerId, sendChunk, finish, returnError): void {
    const options: https.RequestOptions = {
        hostname: hostname,
        path: `${apiPath}/Customers/${customerId}`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': authorization
        }
    };

    const request: https.ClientRequest =
        https.request(
            options,
            function onResponse(res: https.IncomingMessage): void {
                res.setEncoding('utf8');
                res.on('data', (chunk: string | Buffer) => {
                    sendChunk(chunk);
                });
                res.on('end', (end) => {
                    finish(end);
                });
            });
    request.on(
        'error',
        function onError(error: Error): void {
            returnError(error);
            console.log('problem with request: ' + error.message);
        });
    request.end();
}
