import multer from "multer";
import fs from "fs";
import path from "path";

const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname); //image.jpg => .jpg
    cb(null, `${Date.now()}${ext}`); //e.g., 234567890234.jpg
  },
});


const upload=multer({
    storage,fileFilter:(req,file,cb)=>{
        const filetypes=/jpeg|jpg|png/;
        const extname=filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype=filetypes.test(file.mimetype);
        if(extname &&  mimetype ){
            return cb(null,true);
        }
        cb(new Error("Images only!") );
    },
    limits:{fileSize:10*1024*1024}
})

export default upload;