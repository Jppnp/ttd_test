const express = require("express");
const { pool, createTable } = require("./config/database");

const port = 8080;

const app = express();
app.use(express.json())
require("./routes/routes")(app);

createTable();

app.get("/setup", async (req, res) => {
  try {
    const input = [ "souffle cherry XL", "cake cherry XL", "ice-cream cherry XL", "souffle choco XL", "cake choco XL", "ice-cream choco XL",];
    await pool.query(`INSERT INTO datas (data) VALUES ($1)`, [input]);
    res.status(200).send({ message: "Succesfully added datas to database" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Running on port:${port}`);
});
