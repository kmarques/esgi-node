const { Router } = require("express");
const { uuidv7 } = require("uuidv7");

function UserRouter({ validator }) {
  const router = new Router();

  const users = [];

  router.get("/users", function (req, res) {
    // res.status(200).send(JSON.stringify(user)); <=>
    res.json(users);
  });

  router.post("/users", function (req, res, next) {
    try {
      const id = uuidv7();
      validator(req.body);
      const user = { id, ...req.body };
      users.push(user);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  });

  router.get("/users/:id", function (req, res, next) {
    const user = users.find((u) => u.id === req.params.id);
    if (user) {
      res.json(user);
    } else {
      // res.status(404).end(); <=>
      res.sendStatus(404);
    }
  });

  router.put("/users/:id", function (req, res, next) {
    try {
        validator(req.body);
      const id = req.params.id;
      let userIndex = users.findIndex((u) => u.id === id);
      const user = { id, ...req.body };
      let code = 200;
      if (userIndex === -1) {
        users.push(user);
        code = 201;
      } else {
        users.splice(userIndex, 1, user);
      }
      res.status(code).json(user);
    } catch (error) {
      next(error);
    }
  });

  router.patch("/users/:id", function (req, res, next) {
    try {
        validator(req.body);
      const id = req.params.id;
      const userIndex = users.findIndex((u) => u.id === id);
      if (userIndex === -1) {
        return res.sendStatus(404);
      }

      const user = { ...users[userIndex], ...req.body };
      users[userIndex] = user;
      res.json(user);
    } catch (error) {
      next(error);
    }
  });

  router.delete("/users/:id", function (req, res, next) {
    let deleted = false;
    users = users.filter((u) => {
      if (u.id === req.params.id) {
        deleted = true;
        return false;
      }
      return true;
    });
    res.sendStatus(deleted ? 204 : 404);
  });

  return router;
}

module.exports = UserRouter;
