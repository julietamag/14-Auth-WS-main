const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { generateToken, validateToken } = require("../config/tokens");
const { validateUser } = require("../middleware/auth");

router.post("/register", (req, res, next) => {
  User.create(req.body)
    .then((user) => res.status(201).send(user))
    .catch(next);
});

router.post("/login", (req, res, next) => {
  const { password, email } = req.body;

  User.findOne({ where: { email: email } }).then((user) => {
    if (!user) return res.send(401);

    user.validatePassword(password).then((isValid) => {
      if (!isValid) {
        return res.sendStatus(401);
      } else {
        const payload = {
          email: user.email,
          name: user.name,
          lastname: user.lastname,
        };
        const tokenGen = generateToken(payload);
        res.cookie("token", tokenGen);
        res.sendStatus(201);
      }
    });
  });
});

router.get("/secret", validateUser, (req, res, next) => {
  res.send(req.user);
});

router.get("/me", validateUser, (req, res) => {
  res.send(req.user);
});

router.post('/logout', (req, res, next) => {
  res.clearCookie('token').send(204)
})

// Don´t modify this route, keep it at the bottom.
router.use("/", function (req, res) {
  res.sendStatus(404);
});

module.exports = router;
