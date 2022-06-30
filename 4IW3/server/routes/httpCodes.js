const { Router } = require("express");
const { HttpCode } = require("../models/mongo");
const {
  Error: { ValidationError },
} = require("mongoose");

const router = new Router();

router.get("/http-codes", async (req, res) => {
  try {
    const result = await HttpCode.find(req.query);
    res.json(result);
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
});

router.post("/http-codes", async (req, res) => {
  try {
    const result = await HttpCode.create(req.body);
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

router.delete("/http-codes/:id", async (req, res) => {
  try {
    const { deletedCount: result } = await HttpCode.deleteOne({
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

router.put("/http-codes/:id", async (req, res) => {
  try {
    const result = await HttpCode.findOneAndUpdate(
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

router.get("/http-codes/:id", async (req, res) => {
  try {
    const result = await HttpCode.findOne({ _id: req.params.id });
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
