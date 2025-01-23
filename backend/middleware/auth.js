const jwt = require('jsonwebtoken');

async function VerifyUser(req, res, next) {
    const token = req.headers["authorization"];
    console.log("Token",token)
    if (!token) {
      return res.status(401).send("Unauthorized");
    }
  
    try {
      const isVerified = jwt.verify(token, "KODNEST");
      req.user = isVerified.id;
      next();
    } catch (err) {
        console.log(err)
      res.status(401).send("Unauthorized");
    }
  }

  module.exports = VerifyUser;