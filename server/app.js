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
const http = require('http');
const jwt = require("jsonwebtoken");
const stuffRouter = require("./routes/Stuff.route")
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000"
  }
});



const onlineUsersIds = new Set()

io.on('connection', (socket) => {
  socket.on("login", (token) => {
    if (socket._userId) return
    const decoded = jwt.verify(token, "secret123");
    socket._userId = decoded.id
    socket._isAdmin = decoded.role == "2"
    onlineUsersIds.add(decoded.id)
    console.log('a user logged in',);
    if (socket._isAdmin) {
      socket.join("admins");
      // socket.emit("onlineUserIds", Array.from(onlineUsersIds))
    }
  })
  socket.on("requestOnlineUsers", () => {
    socket.emit("onlineUserIds", Array.from(onlineUsersIds))
  })
  console.log('a user connected');
  socket.on('disconnect', () => {
    if (socket._userId) onlineUsersIds.delete(socket._userId)
    console.log('user disconnected', socket._userId);
    socket.leave("admins");
  });
});

setInterval(() => {
  io.to("admins").emit("onlineUserIds", Array.from(onlineUsersIds))
}, 10_000);

mongoose.connect(
  "mongodb+srv://shirel13:13shirel@cluster0.spez3.mongodb.net/petAddoption",
  {}
);

app.use(cors());
app.use(express.json());
// Add user router
app.use("/user", userRouter);
app.use("/pet", petRouter);
app.use("/stuff", stuffRouter);

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

server.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use(express.static(path.join(__dirname, "public")));
