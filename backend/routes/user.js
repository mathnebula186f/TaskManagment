const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt=require('jsonwebtoken');

const User = require("../models/user");

router.post("/signIn", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ username: username });
    const existingEmail = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    } else if (username.length < 3) {
      return res.status(400).json({
        message: "Username should have atleast 4 characters",
      });
    }
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username: username,
      email: email,
      password: hashPassword,
    });
    await newUser.save();
    console.log(`Sign in Successfull for ${username}`);
    return res.json({ message: "SignIn SuccessFully " });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal Server Error" });
  }
});

//Login
router.post("/Login", async (req, res) => {
  const { username, password } = req.body;
  const existingUser = await User.findOne({ username: username });
  if (!existingUser) {
    return res.status(400).json({ message: "Invalid Credientials" });
  }
  bcrypt.compare(password, existingUser.password, (err, data) => {
    if (data) {
      const authClaims=[{name:username},{jti:jwt.sign({},"secret")}]
      const token = jwt.sign({authClaims},"secret",{expiresIn:"2d"});
      res.status(200).json({id:existingUser._id,token:token});
    } else {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
  });
});
module.exports = router;
