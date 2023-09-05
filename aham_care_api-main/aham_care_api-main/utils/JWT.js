const jwt = require("jsonwebtoken");

function generateAccessToken(user) {
  return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: "30d" });
}

function generateRefreshToken(user) {
  return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: "60d" });
}



function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.status(401).json({ error: "Access token expired" });

    req.user = user;
    next();
  });
}
module.exports = {generateAccessToken, generateRefreshToken, authenticateToken}