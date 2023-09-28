import multer from "multer";

/**
 * multer diskStorage
 */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "productPhoto") {
      cb(null, "public/products");
    }
  },
  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() +
        "_" +
        Math.round(Math.random() * 100000) +
        "_" +
        file.originalname
    );
  },
});

/**
 * multer middlewares
 */

// product multer
export const createproductMulter = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/webp"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"));
    }
  },
}).single("productPhoto");
