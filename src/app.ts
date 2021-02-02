import express, { Application } from "express";
import morgan from 'morgan';

export class App {

    private app: Application

    constructor(private port?: Number | String) {

        this.app = express()
        this.settings()
        this.middlewares()
    }

    private middlewares() {
        this.app.use(morgan('dev'))
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

}