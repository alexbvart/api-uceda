import express, { Application } from "express";
import './database';
import {
    createRoles, createBrands, 
    createCategories, createWorkstation, 
    createTypeDocument,
    createProcessDocument,
    createStatusDocument} from './libs/initialSetup';
import morgan from 'morgan';
import cors from 'cors';
import indexRouter from './routers/router';
import path from 'path';
export class App {

    private app: Application

    constructor(private port?: Number | String) {

        this.app = express()
        this.settings()
        this.middlewares()
        this.routes()
        createRoles()
        createBrands()
        createCategories()
        createWorkstation()
        createTypeDocument()
        createProcessDocument()
        createStatusDocument()
    }

    /**
     * middlewares
    */
    private middlewares() {
        this.app.use(morgan('dev'))
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended: false}))
        this.app.use('/uploads', express.static(path.resolve('uploads')));
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