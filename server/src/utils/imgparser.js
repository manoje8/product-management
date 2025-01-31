import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads/images'); 
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });
  
export const uploadImages = multer({ storage, limits: {fieldSize: 5* 1024*1024} });

export default uploadImages