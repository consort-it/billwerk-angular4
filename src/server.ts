import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as logger from 'morgan';
import * as path from 'path';
import * as http from 'http';
import * as https from 'https';
import * as cors from 'cors';
import * as events from 'events';
import * as request from 'request';
import * as querystring from 'querystring';
import errorHandler = require('errorhandler');
import methodOverride = require('method-override');

// Routes
import { ContractRoute } from './contract';
import { CustomerRoute } from './customer';
import { TokenRoute } from './authorization';

/**
 * The server.
 *
 * @class Server
 */
export class Server {
    public app: express.Application;

    /**
     * Bootstrap the application.
     *
     * @class Server
     * @method bootstrap
     * @static
     * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
     */
    public static bootstrap(): Server {
        return new Server();
    }

    /**
     * Constructor.
     *
     * @class Server
     * @constructor
     */
    constructor() {

        // create expressjs application
        this.app = express();

        // configure application
        this.config();

        // add api
        this.api();
    }

    /**
     * Configure application
     *
     * @class Server
     * @method config
     */
    public config() {

        // add static paths
        this.app.use(express.static(path.join(__dirname, 'public')));

        // configure pug
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.set('view engine', 'pug');

        // mount logger
        this.app.use(logger('dev'));

        // mount json form parser
        this.app.use(bodyParser.json());

        // mount query string parser
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));

        // mount cookie parker
        this.app.use(cookieParser('SECRET_GOES_HERE'));

        // mount override
        this.app.use(methodOverride());

        // use q promises
        global.Promise = require('q').Promise;

        // catch 404 and forward to error handler
        this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
            err.status = 404;
            next(err);
        });

        // error handling
        this.app.use(errorHandler());
    }

    /**
     * Create REST API routes
     *
     * @class Server
     * @method api
     */
    public api() {
        
        /**
         * Accepts all OPTIONS Requests
         */
        this.app.options('*', cors());

        let router: express.Router;
        router = express.Router();

        TokenRoute.create(router);
        ContractRoute.create(router);
        CustomerRoute.create(router);

        //use router middleware
        this.app.use(router);
    }
}
