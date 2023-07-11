const { createToken, refreshToken, getInfo } = require("../controller/user");
const { jwtRefreshTokenValidate, jwtValidate } = require("../middleware/auth");
module.exports = function (app) {
  app.post("/getAccess", createToken);
  app.post("/refresh", jwtRefreshTokenValidate, refreshToken);
  app.get("/auth/data", jwtValidate, getInfo);
  app.get("/data", getInfo);
};
