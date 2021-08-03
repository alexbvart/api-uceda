import { Request, Response } from "express";
import Document, {IDocument} from '../models/Document';
import fs from 'fs-extra';
import path from 'path';
class UploadController {


    /**
     * create
     */
    public async create(req: Request, res: Response) {

        try {

            const name = req.file.originalname
            const pathDocument = req.file.path
            const newDocument = new Document({ name, pathDocument })
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

}

const uploadController = new UploadController()
export default uploadController