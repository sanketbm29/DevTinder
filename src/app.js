const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
app.use(express.json());

app.post("/signup", async (req, res) => {
  const data = req.body;
  console.log(req.body);

  const user = new User(data);

  try {
    await user.save();
    res.send("User added..");
  } catch (err) {
    res.status(400).send("Error while adding" + err.message);
  }
});

app.get("/users", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const users = await User.findOne({ emailId: userEmail });
    res.send(users);
    // const users = await User.find({ emailId: userEmail });
    // if (users.length === 0) {
    //   res.status(404).send("User not found  ");
    // } else {
    //   res.send(users);
    // }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    console.log("Finded data", users);
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

app.delete("/users", async (req, res) => {
  try {
    const deleteUser = req.body.id;
    console.log("delete", deleteUser);

    const users = await User.findByIdAndDelete(deleteUser);
    if (!users) {
      res.status(404).send("User not found");
    } else {
      res.send("User deleted");
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

app.patch("/users/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );

    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }

    if (data?.skills.length > 10) {
      throw new Error("Skills cannot be more than 10");
    }

    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    console.log(user);

    res.send("User updated Successfully");
  } catch (err) {
    res.status(400).send("Update failed: " + err.message);
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
