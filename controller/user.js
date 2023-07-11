const { sign } = require("jsonwebtoken");
require("dotenv").config();
const { pool } = require("../config/database");

function getInfo(req, res) {
  try {
    pool.connect((err, client, done) => {
      client.query(`SELECT data FROM datas`, (err, result) => {
        res.status(200).send(result.rows);
      });
    });
  } catch (err) {
    res.status(500).send({ message: "Internal database error while query" });
  }
}

const jwtGenerate = (user) => {
  const accessToken = sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "2m",
    algorithm: "HS256",
  });

  return accessToken;
};

const jwtRefreshTokenGenerate = (user) => {
  console.log(`User id when create key: ${user.id}`);
  const refreshToken = sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "10m",
    algorithm: "HS256",
  });

  return refreshToken;
};

const users = [
  { id: 1, name: "John", refresh: null },
  { id: 2, name: "Tom", refresh: null },
];

const createToken = (req, res) => {
  const { name } = req.body;

  const user = users.findIndex((e) => e.name === name);

  if (!name || user < 0) {
    return res.status(404).send({ message: "Not found name" });
  }

  console.log(`User after find: ${users[user].id}`);
  const access_token = jwtGenerate(users[user]);
  const refresh_token = jwtRefreshTokenGenerate(users[user]);

  console.log(`Create Token Function:::${access_token}:::${refresh_token}`);

  users[user].refresh = refresh_token;
  console.log(`Refresh Token: ${users[user].refresh}`)

  res.status(200).json({
    access_token,
    refresh_token,
  });
};

function refreshToken(req, res) {
  const user = users.find((e) => e.id === res.locals.id);

  const userIndex = users.findIndex((e) => e.refresh == res.locals.token);

  console.log(`User Refresh::${user.refresh}, index::${res.locals.token}`);
  if (!user || userIndex < 0)
    return res.status(401).send({ message: "Refresh token is invalid" });

  const access_token = jwtGenerate(users[userIndex]);
  const refresh_token = jwtRefreshTokenGenerate(users[userIndex]);

  users[userIndex].refresh = refresh_token;

  res.status(200).json({
    access_token,
    refresh_token,
  });
}

module.exports = {
  refreshToken,
  createToken,
  getInfo,
};
