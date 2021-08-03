import multer from 'multer'


// Settings
const storage = multer.diskStorage({
    destination: 'uploads',
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
});
export default multer({storage});