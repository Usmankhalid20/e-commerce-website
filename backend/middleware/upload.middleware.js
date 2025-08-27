const multer = require("multer");
const path = require("path");

// storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "productImage") {
      cb(null, "uploads/products");
    } else if (file.fieldname === "avatar") {
      cb(null, "uploads/profiles");
    } else {
      cb(null, "uploads");
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// file filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedTypes.test(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Only .jpeg, .jpg, .png files are allowed"));
  }
};

const upload = multer({ storage, fileFilter });
module.exports = upload;


