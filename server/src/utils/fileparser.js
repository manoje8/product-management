import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads'); // Temporary storage for file
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname); // Set unique filename
    },
  });
  
const upload = multer({ storage, limits: {fieldSize: 5* 1024*1024} });

export default upload
