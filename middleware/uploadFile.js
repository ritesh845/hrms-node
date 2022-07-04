const multer = require('multer');
const fs = require('fs');

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        var folder = req.body.folder_name;
        if (!fs.existsSync('./uploads/')) {
            fs.mkdirSync('./uploads/');
        }

        const dir = `./uploads/${folder}`;

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }

        cb(null, dir);
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});
var fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

var upload = multer({
    storage: storage,
    limits: {
        fieldNameSize: 50,
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});


module.exports = upload;