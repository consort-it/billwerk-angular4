import { ApiRoute } from '../_shared';
import { NextFunction, Request, Response, Router } from 'express';
import * as cors from 'cors';
import { getContracts, getContractById } from '../contract';

export class ContractRoute extends ApiRoute {
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

        console.info('[ContractRoute::create] Creating Contract route.');

        router.get(
            '/contracts',
            cors(),
            function onRequest(req: Request, res: Response, next: NextFunction): void {
                if (req.headers.authorization) {
                    const authorization = req.headers.authorization;
                    getContracts(
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
                            console.log('End of request');
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
            '/contracts/:contractId',
            cors(),
            function onRequest(req: Request, res: Response, next: NextFunction): void {
                const contractId = req.params.contractId;
                if (req.headers.authorization) {
                    const authorization = req.headers.authorization;
                    getContractById(
                        authorization,
                        contractId,
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
