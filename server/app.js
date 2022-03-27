const sqlite3 = require("sqlite3").verbose();
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);

const port = 3000 || process.env.PORT;

app.get("/", (req, res) => {
  res.json({ message: "alive" });
});

app.get("/notes", (req, res) => res.send(JSON.stringify()));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// let db = new sqlite3.Database("./notes.db", (err) => {
//   if (err) {
//     console.log(err.message);
//   }

//   console.log("connected to notes.db");
// });
