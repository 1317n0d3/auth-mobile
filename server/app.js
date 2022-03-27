const sqlite3 = require("sqlite3").verbose();
const express = require("express");

const app = express();
const port = 3000 || process.env.PORT;

app.get("/", (req, res) => {
  res.json({ message: "alive" });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

let db = new sqlite3.Database("./notes.db", (err) => {
  if (err) {
    console.log(err.message);
  }

  console.log("connected to notes.db");
});

db.serialize(() => {
  db.run(
    `CREATE TABLE notes(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    note text NOT NULL,
    tags text NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL);`
  );

  db.run(
    `INSERT into notes(note, tags) values ('first note', 'test'), ('second note', 'test');`,
    (err, row) => {
      if (err) {
        console.log(err.message);
      }

      console.log("Values has been added ", row);
    }
  );

  db.run(`SELECT * FROM notes`, (err, row) => {
    console.log(row.id + ": " + row.info);
  });
});
