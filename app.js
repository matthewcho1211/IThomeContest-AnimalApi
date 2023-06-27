const express = require("express");
const app = express();

const mongoose = require("mongoose");
const Animal = require("./animal");

mongoose
  .connect("mongodb://127.0.0.1:27017/exampleDB")
  .then(() => {
    console.log("成功連接mongodb");
  })
  .catch((e) => {
    console.log(e);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/animals", async (req, res) => {
  try {
    let animalData = await Animal.find({}).exec();
    return res.send(animalData);
  } catch (e) {
    return res.status(500).send("搜尋資料發生錯誤");
  }
});

app.get("/animals/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let foundAnimal = await Animal.findOne({ _id: id }).exec();
    return res.send(foundAnimal);
  } catch (e) {
    return res.status(500).send("搜尋資料發生錯誤");
  }
});

app.post("/animals", async (req, res) => {
  try {
    let { name, age, species } = req.body;
    let newAnimal = new Animal({
      name: name,
      age: age,
      species: species,
    });

    let savedAnimal = await newAnimal.save();
    return res.send({
      msg: "資料儲存成功",
      savedObject: savedAnimal,
    });
  } catch (e) {
    return res.status(500).send("儲存資料發生錯誤");
  }
});

app.put("/animals/:_id", async (req, res) => {
  try {
    let { _id } = req.params;
    let { name, age, species } = req.body;
    let newAnimal = await Animal.findOneAndUpdate(
      { _id },
      { name, age, species },
      { new: true, runValidators: true, overwrite: true }
    );

    return res.send({
      msg: "資料更新成功",
      updatedAnimal: newAnimal,
    });
  } catch (e) {
    console.log(e);
    return res.status(400).send("更新資料發生錯誤");
  }
});

app.patch("/animals/:_id", async (req, res) => {
  try {
    let { _id } = req.params;
    let { name, age, species } = req.body;
    let newAnimal = await Animal.findOneAndUpdate(
      { _id },
      { name, age, species },
      { new: true, runValidators: true }
    );

    return res.send({
      msg: "資料更新成功",
      updatedAnimal: newAnimal,
    });
  } catch (e) {
    console.log(e);
    return res.status(400).send("更新資料發生錯誤");
  }
});

app.delete("/animals/:_id", async (req, res) => {
  try {
    let { _id } = req.params;
    let deleteAnimal = await Animal.deleteOne({ _id });
    return res.send(deleteAnimal);
  } catch (e) {
    return res.status(500).send("無法刪除資料");
  }
});

app.listen(3000, (req, res) => {
  console.log("伺服器運行中");
});
