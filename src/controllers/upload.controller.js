import File from "../models/attachment.model.js";

export const uploadToLocal = async (req, res) => {
    try {
        const file = await File.create({
            filename: req.file.filename,
            url: `/uploads/${req.file.filename}`,
        });
        res.status(201).json(file);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const uploadToCloud = async (req, res) => {
    try {
        const file = await File.create({
            filename: req.file.originalname,
            url: req.file.path,
            cloudinaryId: req.file.filename,
        });
        res.status(201).json(file);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};