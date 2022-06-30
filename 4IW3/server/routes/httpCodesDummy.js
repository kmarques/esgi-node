const { Router } = require("express");

const router = new Router();

router.get("/http-codes", (req, res) => {
  try {
    res.json([
      {
        code: 200,
        message: "OK",
      },
    ]);
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
});

router.post("/http-codes", (req, res) => {
  try {
    res.status(201).json({
      id: 1,
      ...req.body,
    });
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

router.delete("/http-codes/:id", (req, res) => {
  try {
    if (/** not exist */ false) {
      res.sendStatus(404);
    } else res.sendStatus(204);
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
});

router.put("/http-codes/:id", (req, res) => {
  try {
    if (/** not exist */ false) {
      res.sendStatus(404);
    } else {
      res.json({
        id: 1,
        code: 200,
        message: "OK",
        ...req.body,
      });
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

router.get("/http-codes/:id", (req, res) => {
  try {
    if (/** not exist */ false) {
      res.sendStatus(404);
    } else {
      res.json({
        id: 1,
        code: 200,
        message: "ok",
      });
    }
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
});

module.exports = router;
