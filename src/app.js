const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
// app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Sanket",
    lastName: "Memane",
    emailId: "sanket@gmail.com",
    password: "Sanket@123",
  });

  try {
    await user.save();
    res.send("User added..");
  } catch (err) {
    res.status(400).send("Error while adding");
  }
});

const port = 7777 || process.env.database;
connectDB()
  .then(() => {
    console.log("Database connection established..");
    app.listen(port, () => {
      console.log(`server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("Database cannot be connected..");
  });
