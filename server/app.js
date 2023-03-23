require("dotenv").config();
const express = require("express");
const PORT = 8080;
const app = express();
const mongoose = require("mongoose");
const userRouter = require("./routes/User.route");
const petRouter = require("./routes/Pet.route");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

mongoose.connect(
  "mongodb+srv://jeki:Aa1234567@cluster0.1l6ii6r.mongodb.net/petaddoption?retryWrites=true&w=majority",
  {}
);

app.use(cors());
app.use(express.json());
// Add user router
app.use("/user", userRouter);
app.use("/pet", petRouter);

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "public/images");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/; // Choose Types you want...
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images only!");
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

app.post("/uploadPic", upload.single("image"), (req, res) => {
  res.send(`${req.file.path.split('\\').slice(1).join('\\')}`);
});

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use(express.static(path.join(__dirname, "public")));
