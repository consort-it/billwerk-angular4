import { ApiRoute } from '../_shared/api.abstract';
import { NextFunction, Request, Response, Router } from 'express';
import { requestToken } from '../authorization';
import * as cors from 'cors';

export class TokenRoute extends ApiRoute {
    /**
     * Constructor
     *
     * @class TokenRoute
     * @constructor
     */
    constructor() {
        super();
    }

    /**
     * Create the routes.
     *
     * @class TokenRoute
     * @method create
     * @static
     */

    public static create(router: Router): void {

        console.info('[TokenRoute::create] Creating Token route.');

        router.get('/token', cors(),
            function onRequest(req, res): void {
                requestToken(
                    /**
                     * Response
                     */
                    function onChunkReceive(chunk: string | Buffer): void {
                        res.write(chunk);
                    },
                    /**
                     * End of Request
                     */
                    function onEndOfSteam(): void {
                        res.send();
                    },
                    /**
                     * Error Handling
                     */
                    function onError(error: string | Buffer): void {
                        res.send(error);
                    }
                );
            });
    }
}
