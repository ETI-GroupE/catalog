import Multer from 'multer'
const maxSize = 2 * 1024 * 1024;

const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: { fileSize: maxSize },
}).single("file");
export default multer