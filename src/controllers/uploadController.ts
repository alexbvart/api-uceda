import { Request, Response } from "express";
import Document, { IDocument } from '../models/Document';
import fs from 'fs-extra';
import path from 'path';
import ProcessDocument from "../models/ProcessDocument";
import TypeDocument from "../models/TypeDocument";
import StatusDocument from "../models/StatusDocument";
class UploadController {


    /**
     * create
     */
    public async create(req: Request, res: Response) {

        try {
            const { type, process, status } = req.body
            const name = req.file.originalname
            const pathDocument = req.file.path
            const newDocument = new Document({ name, pathDocument, type, process, status })
            const saveDocument = await newDocument.save()
            res.status(201).json({ message: "created" })
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error of server" })
        }
    }
    /**
       * findAll
       */
    public async findAll(req: Request, res: Response) {
        try {
            const DocumentUploads = await Document.find()
            res.status(200).json(DocumentUploads)
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error of server" })
        }

    }

    /**
     * findById
     */
    public async findById(req: Request, res: Response) {
        try {
            const DocumentUpload = await Document.findById(req.params.id)
            res.status(200).json(DocumentUpload)
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error of server" })
        }
    }

    /**
     * delete
     */
    public async delete(req: Request, res: Response) {
        const { id } = req.params;
        const document = await Document.findByIdAndRemove(id) as IDocument;
        if (document) {
            await fs.unlink(path.resolve(`src/${document.pathDocument}`));
        }
        return res.json({ message: 'Document Deleted' })
    }


    /**
     * listData
     */
    public async listData(req: Request, res: Response) {

        try {
            
            const process = await ProcessDocument.find()
            const types = await TypeDocument.find()
            const status = await StatusDocument.find()

            return res.json({
                process: process,
                type: types,
                status: status
            })

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error of server"+ error })
        }

    }

    /**
     * getDocument
     */
    // public async getDocument(req: Request, res: Response) {
        
    //     try {
    //         console.log(req.body);
            
    //           const {type, process, status} = req.body

    //         const Dprocess = await ProcessDocument.findById(process)
    //         // const Dtypes = await TypeDocument.findById(type)
    //         // const Dstatus = await StatusDocument.findById(status)

          
    //         // const document = Document.findOne({
    //         //     process: Dprocess._id
    //         // })
    //         console.log(Dprocess);
            

    //         // return res.json(document)

    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).json({ message: "Error of server"+ error })
    //     }
    // }

}

const uploadController = new UploadController()
export default uploadController