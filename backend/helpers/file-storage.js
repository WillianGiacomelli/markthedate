const multer = require("multer");
const path = require("path");

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/img");
  },
  filename: (req, file, cb) => {
    //defini o padrão do nome
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

module.exports = diskStorage;
