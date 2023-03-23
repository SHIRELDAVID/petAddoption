// Create user route
const express = require("express");
const jwt = require("jsonwebtoken");
const sha256 = require("sha256");
const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserByEmail,
  saveForLater,
  unsaveForLater,
} = require("../controllers/User.controller");
const authMiddleware = require("../middlewares/authMiddleware");
const validationSchema = require("../middlewares/validationMiddleware");
const { User } = require("../models/User.model");
const router = express.Router();

// Create user
router.get("/", async (req, res) => {
  console.log(req.query);
});

router.post("/signup", validationSchema, async (req, res) => {
  const { name, email, lastname, password, role } = req.body;

  const user = await createUser({ name, email, lastname, password, role });

  res.status(200).json(user);
});

router.post("/login", validationSchema, async (req, res) => {
  const { email, password } = req.body;
  const user = await getUserByEmail(email);

  if (user[0].password == sha256(password)) {
    //tokenize
    const token = jwt.sign({ id: user[0]._id }, "secret123");
    res.status(200).json({ token, user: user[0] });
  } else {
    res.status(400).json({ message: "Invalid email or password" });
  }
});

router.get("/getAll", authMiddleware, async (req, res) => {
  if (req.user.role !== "2") { return res.status(401).json({ message: "Access denied." }) }
  const users = await getUsers();

  res.status(200).json(users);
});

router.get("/getById/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;

  const user = await getUserById(id);

  res.status(200).json(user);
});

router.put(
  "/update/:id",
  [validationSchema, authMiddleware],
  async (req, res) => {
    const { id } = req.params;

    const user = await updateUser({ ...req.body, _id: id });

    res.status(200).json(user);
  }
);

router.delete("/delete/:id", authMiddleware, async (req, res) => {
  if (req.user.role != 2)
    return res.status(401).json({ message: "Access denied." });

  const { id } = req.params;

  const user = await deleteUser(id);

  res.status(200).json(user);
});

router.post("/saveForLater", authMiddleware, async (req, res) => {
  const { userId, petId } = req.body;

  const user = await saveForLater(userId, petId);

  res.status(200).json(user);
});

router.post("/unsaveForLater", authMiddleware, async (req, res) => {
  const { userId, petId } = req.body;

  const user = await unsaveForLater(userId, petId);

  res.status(200).json(user);
});

module.exports = router;
