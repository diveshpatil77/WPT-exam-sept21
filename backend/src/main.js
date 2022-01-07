const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());
// const port = 6000;

const { addMsg, selectMsg } = require("./user");

app.get("/getMessages", async (req, res) => {
  const list = await selectMsg();
  res.json(list);
});

app.post("/addMessages", async (req, res) => {
  const msgData = req.body;

  await addMsg(msgData);

  res.json({ msg: "Data added successfully" });
});

app.listen(6000, () => {
  console.log(`MyAPP Server started...`);
});
