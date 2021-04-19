const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const tokenGenerate = require("../authentication/tokenGenerate");
const userModel = require("../database/models/users_models");

router.route("/login").post(async (req, res) => {
  console.log("CALL LOGIN");
  try {
    const { email, password } = req.body;
    const user = await userModel.findUser(email);
    const hashCheck = await bcrypt.compare(password, user.hash);
    if (user) {
      if (hashCheck) {
        const token = tokenGenerate(user);
        res.status(200).json({
          token: token,
          user: {
            user_id: user.user_id,
            email: user.email,
            username: user.username,
          },
        });
      } else {
        res.status(401).json({ error: "Password Mis-match." });
      }
    } else {
      res.status(401).json({ error: "No user found." });
    }
  } catch (err) {
    res.status(404).json({ error: "Route level error, login." });
  }
});

router.route("/register").post(async (req, res) => {
  let newUser = req.body;
  let hash = await bcrypt.hash(newUser.password, 12);
  newUser.password = hash;
  try {
    await userModel.registerUser(newUser);
    const user = await userModel.findUser(newUser.email);
    const token = await tokenGenerate(user);
    res
      .status(201)
      .json({
        token: token,
        user: {
          user_id: user.user_id,
          email: user.email,
          username: user.username,
        },
      });
  } catch (err) {
    res.status(401).json({ error: "Route level error, register." });
  }
});

module.exports = router;
