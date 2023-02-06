const { generateToken, validateToken } = require("../config/tokens");

const validateUser = function (req, res, next) {
  const token = req.cookies.token;
  const payload = validateToken(token);
  req.user = payload;
  if (payload) return next();
  res.sendStatus(401); // Unauthorized
};

module.exports = { validateUser };
