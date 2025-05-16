import {uploadLocal} from '../../configs/multer.conflig.js';
import express from 'express';

const router = express.Router();

router.route('/attachment')
    .post( uploadLocal.single('file'), (req, res) => {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        res.status(200).json({ message: 'File uploaded successfully', file: req.file });
    });

router.route('/attachments')
    .post( uploadLocal.array('files', 3), (req, res) => {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'No files uploaded' });
        }
        res.status(200).json({ message: 'Files uploaded successfully', files: req.files });
    });

export default router;

