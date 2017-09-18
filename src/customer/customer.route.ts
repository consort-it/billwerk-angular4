import { ApiRoute } from '../_shared';
import { NextFunction, Request, Response, Router } from 'express';
import { getCustomers, getCustomerById } from '../customer';
import * as cors from 'cors';

export class CustomerRoute extends ApiRoute {
    /**
     * Constructor
     *
     * @class ContractRoute
     * @constructor
     */
    constructor() {
        super();
    }

    /**
     * Create the routes.
     *
     * @class ContractRoute
     * @method create
     * @static
     */

    public static create(router: Router): void {

        console.info('[CustomerRoute::create] Creating Customer route.');

        router.get(
            '/customers',
            cors(),
            function onRequest(req: Request, res: Response, next: NextFunction): void {
                if (req.headers.authorization) {
                    const authorization = req.headers.authorization;
                    getCustomers(
                        authorization,
                        /**
                         * Response
                         */
                        function onChunkReceive(chunk: string | Buffer): void {
                            res.write(chunk);
                        },
                        /**
                         * End of Request
                         */
                        function onEndOfStream(): void {
                            res.send();
                        },
                        /**
                         * Error Handling
                         */
                        function onError(error: string | Buffer): void {
                            res.send(error);
                        }
                    );
                }
                else {
                    res.send({ error: 'authorization is missing, request token first' });
                    throw new Error('authorization is missing');
                }
            });

        router.get(
            '/customers/:customerId',
            cors(),
            function onRequest(req: Request, res: Response, next: NextFunction): void {
                const customerId = req.params.customerId;
                if (req.headers.authorization) {
                    const authorization = req.headers.authorization;
                    getCustomerById(
                        authorization,
                        customerId,
                        /**
                         * Response
                         */
                        function onChunkReceive(chunk: string | Buffer): void {
                            res.write(chunk);
                        },
                        /**
                         * End of Request
                         */
                        function onEndOfStream(): void {
                            res.send();
                        },
                        /**
                         * Error Handling
                         */
                        function onError(error: string | Buffer): void {
                            res.send(error);
                        }
                    );
                }
                else {
                    res.send({ error: 'authorization is missing, request token first' });
                    throw new Error('authorization is missing');
                }
            });
    }
}
