const jwt = require("jsonwebtoken");

const jwtValidate = (req, res, next) => {
  try {
    if (!req.headers["authorization"])
      return res.status(401).send({ message: "missing token" });

    const token = req.headers["authorization"].replace("Bearer ", "");
    console.log(`Token: ${token}`);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) throw new Error(err);
    });
    next();
  } catch (error) {
    return res.status(403).send({ message: "token is invalid" });
  }
};

const jwtRefreshTokenValidate = (req, res, next) => {
  try {
    if (!req.headers["authorization"])
      return res.status(401).send({ message: "missing refresh token" });

    const token = req.headers["authorization"].replace("Bearer ", "");

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) throw new Error(err);

      res.locals.id = decoded.id;
      res.locals.token = token;
    });
    next();
  } catch (err) {
    console.error(`error: ${err}`);
    return res.status(403).send({ message: "Refresh token is invalid" });
  }
};

module.exports = {
  jwtRefreshTokenValidate,
  jwtValidate,
};
