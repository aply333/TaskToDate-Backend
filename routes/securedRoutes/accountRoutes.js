const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const userModel = require("../../database/models/users_models");

router.route("/passChange").put(async (req, res) => {
  try {
    let { password, newPassword, email } = req.body;
    console.log("NewPass in route:", newPassword)
    let newHash = await bcrypt.hash(newPassword, 12);
    console.log("NewHash: ", newHash)
    let user = await userModel.findUser(email);
    let hashCheck = await bcrypt.compare(password, user.hash);
    if (hashCheck) {
      await userModel.changePassowrd(email, newHash);
      res.status(200).json({ success: "You're password has been changed." });
    } else {
      res.status(401).json({ error: "Please provide old password." });
    }
  } catch (err) {
    res.status(503).json({ error: "Route level error", details: err });
  }
});

router.route("/emailChange").put(async (req, res) => {
  try {
    let { password, email, newEmail } = req.body;
    let user = await userModel.findUser(email);
    let hashCheck = await bcrypt.compare(password, user.hash);
    if (hashCheck) {
      await userModel.changeEmail(email, newEmail);
      res.status(200).json({ success: "You're email has been changed." });
    } else {
      res.status(401).json({ error: "Password did not match." });
    }
  } catch (err) {
    {
      res.status(503).json({ error: "Route level error", details: err });
    }
  }
});

router.route("/usernameChange").put(async (req, res) => {
  try {
    let { password, email, newUsername } = req.body;
    let user = await userModel.findUser(email);
    let hashCheck = await bcrypt.compare(password, user.hash);
    if (hashCheck) {
      await userModel.changeUsername(email, newUsername);
      const updatedUser = await userModel.findUser(email);
      res.status(200).json({ username: updatedUser.username });
    } else {
      res.status(401).json({ error: "Password did not match." });
    }
  } catch (err) {
    res.status(503).json({ error: "Route level error.", details: err });
  }
});

router.route("/purgeAccount").delete(async (req, res) => {
  try {
    let { password, email } = req.body;
    let user = await userModel.findUser(email);
    let hashCheck = await bcrypt.compare(password, user.hash);
    if (hashCheck) {
        await userModel.deleteUser(user.user_id)
        res.status(200).json({messege: "Good-bye, All gone."})
    } else {
      res
        .status(401)
        .json({
          messege: "Warning all user information will be purged, if continued.",
          error: "Password mis-match please ensure correct password to conitnue.",
        });
    }
  } catch (err) {
    res.status(503).json({ error: "Route leve error.", details: err });
  }
});

module.exports = router;
