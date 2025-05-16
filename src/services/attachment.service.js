import Attachment from "../models/attachment.model.js";

class AttachmentService {
    constructor() {
        this.attachment = Attachment;
    }

    async singleUpload(file) {
        try {
            const newItem = await this.attachment.create({
                filename: file.filename,
                path: file.path,
                cloudinaryId: file.cloudinaryId,
            });
            return newItem;
        } catch (error){
            throw new Error("Error uploading file, error:  " + error.message);
        }
    }

    async multipleUpload(files) {
        try {
            if(!files)
            {
                throw new Error("Error while uploading files: " + error.message)
            }
            const manyItems = files.map(file => ({
                filename: file.filename,
                path: file.path,
                cloudinaryId: file.cloudinaryId,
            }));
            
            const saved = await this.attachment.insertMany(manyItems);
            return saved;
        } catch (error) {
            throw new Error("Error uploading files", error);
        }
    }

}

export default new AttachmentService();