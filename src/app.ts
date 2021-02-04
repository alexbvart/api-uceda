import express, { Application } from "express";
import './database';
import {createRoles} from './libs/initialSetup';
import morgan from 'morgan';
import cors from 'cors';
import indexRouter from './routers/router';
export class App {

    private app: Application

    constructor(private port?: Number | String) {

        this.app = express()
        this.settings()
        this.middlewares()
        this.routes()
        createRoles()

    }

    /**
     * middlewares
    */
    private middlewares() {
        this.app.use(morgan('dev'))
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended: false}))
    }


    /**
     * setting
     */
    private settings() {
        this.app.set('port', this.port || process.env.PORT || 5000)
    }

    /**
     * listen
     */
    public async listen() {
        await this.app.listen(this.app.get('port'))
        console.log('Server on port ', this.app.get('port'));
    }


    /**
     * routes
     */
    public routes() {
        this.app.use(indexRouter)
    }


}