const { Router } = require("express");
const { User } = require("../models/mongo");
const {
  Error: { ValidationError },
} = require("mongoose");

const router = new Router();

router.get("/users", async (req, res) => {
  try {
    const result = await User.find(req.query);
    res.json(result);
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
});

router.post("/users", async (req, res) => {
  try {
    const result = await User.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    if (error instanceof ValidationError) {
      console.error(error);
      res.status(422).json({
        code: "must be an integer",
        message: "must have at least 1 character",
      });
    } else {
      res.sendStatus(500);
      console.error(error);
    }
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    const { deletedCount: result } = await User.deleteOne({
      _id: req.params.id,
    });
    if (!result) {
      res.sendStatus(404);
    } else res.sendStatus(204);
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
});

router.put("/users/:id", async (req, res) => {
  try {
    const result = await User.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (!result) {
      res.sendStatus(404);
    } else {
      res.json(result);
    }
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(422).json({
        code: "must be an integer",
        message: "must have at least 1 character",
      });
    } else {
      res.sendStatus(500);
      console.error(error);
    }
  }
});

router.get("/users/:id", async (req, res) => {
  try {
    const result = await User.findOne({ _id: req.params.id });
    if (!result) {
      res.sendStatus(404);
    } else {
      res.json(result);
    }
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
});

module.exports = router;
