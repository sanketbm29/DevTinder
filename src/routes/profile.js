const express = require("express");
const profileRouter = express.Router();
const bcrypt = require("bcrypt");

const { userAuth } = require("../middlewares/auth");
const {
  validateEditProfileData,
  validateResetPassword,
} = require("../utils/validation");
const User = require("../models/user");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit request");
    }
    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => [
      (loggedInUser[key] = req.body[key]),
    ]);
    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName} your profile updated successfully`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    validateResetPassword(req);

    const activeUserData = req.user;
    const { newPassword } = req.body;

    const userResult = await User.findOne({ emailId: activeUserData.emailId });
    if (!userResult) {
      return res.status(404).send("User not found");
    }

    const isSamePassword = await bcrypt.compare(
      newPassword,
      userResult.password
    );

    if (isSamePassword) {
      return res
        .status(400)
        .send("New password cannot be same as old password");
    }

    const newHashPassword = await bcrypt.hash(newPassword, 10);

    userResult.password = newHashPassword;
    await userResult.save();
    console.log("Password updated successfully");

    res.send(`password updated successfully for ${userResult.firstName}`);
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

module.exports = profileRouter;
