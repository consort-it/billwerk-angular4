import * as https from 'https';
import * as querystring from 'querystring';
import { hostname, apiPath } from '../config';

export function getContracts(authorization, sendChunk, finish, returnError): void {
    const options: https.RequestOptions = {
        hostname: hostname,
        path: `${apiPath}/Contracts`,
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
                res.on('data', (chunk: string | Buffer): void => {
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

export function getContractById(authorization, contractId, sendChunk, finish, returnError): void {
    const options: https.RequestOptions = {
        hostname: hostname,
        path: `${apiPath}/Contracts/${contractId}`,
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
                res.on('data', (chunk: string | Buffer): void => {
                    sendChunk(chunk);
                });
                res.on('end', (end): void => {
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
