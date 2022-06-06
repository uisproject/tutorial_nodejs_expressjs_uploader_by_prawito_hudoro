const express = require("express");
const app = express();
const multer = require("multer"); // library to handle multipart

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploadedFile"); //uploadedFile is the name of the folder at the root
  },

  filename: (req, file, cb) => {
    // format of naming convention

    cb(null, new Date().getTime() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // to filter the uploaded data
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true); // to accept file
  } else {
    cb(null, false); // to reject file
  }
};

app.post(
  "/upload",
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image"),
  (req, res) => {
    console.log("check image file ", req.file.path);
    res.status(200).json({ image: req.file.path });
  }
);

// to upload you can just use postman and use the body -> form-data
// type image in key and set text to file and you can upload then you finished uploading image into uploadedFile Image

app.listen(5000, () => console.log("Listening to 5000"));
