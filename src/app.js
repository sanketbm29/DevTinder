const express = require("express");

const app = express();
// app.use(express.json());

app.get("/user", (req, res) =>{
  res.send({firstname :"Sanket", lastname:"Memane"});
})
app.post("/user", (req, res) =>{
  console.log(req.body);
  res.send("Data successfully saved to DB");
})
app.delete("/user", (req, res) =>{
  res.send("Deleted successfully");
})

const port = 3000;

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
