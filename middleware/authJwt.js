const jwt = require("jsonwebtoken");

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token,process.env.JWT_KEY, (err, user) => {
    
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
      req.user = user._id;
     next();
  });
};

const authJwt = {
  verifyToken
};
module.exports = authJwt;
