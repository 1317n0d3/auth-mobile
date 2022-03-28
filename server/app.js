const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const db = require("./database");

const port = 3000 || process.env.PORT;

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.patch("/api/notes/:id", (req, res, next) => {
  const data = {
    note: req.body.note,
    tags: req.body.tags,
  };

  db.run(
    `UPDATE notes set 
      note = COALESCE(?,note), 
      tags = COALESCE(?,tags)
      WHERE id = ?`,
    [data.note, data.tags, req.params.id],
    function (err, result) {
      if (err) {
        res.status(400).json({ error: res.message });
        return;
      }
      res.json({
        message: "success",
        data: data,
        changes: this.changes,
      });
    }
  );
});

app.post("/api/notes/", (req, res, next) => {
  const errors = [];

  if (!req.body.note) {
    errors.push("No note specified");
  }
  if (errors.length) {
    res.status(400).json({ error: errors.join(",") });
    return;
  }

  const data = {
    note: req.body.note,
    tags: req.body.tags,
  };

  const sql = "INSERT INTO notes (note, tags) VALUES (?,?)";
  const params = [data.note, data.tags];

  db.run(sql, params, function (err, result) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: data,
      id: this.lastID,
    });
  });
});

app.get("/api/notes", (req, res, next) => {
  const sql = "select * from notes";
  const params = [];

  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

app.get("/api/notes/:id", (req, res, next) => {
  const sql = "select * from notes where id = ?";
  const params = [req.params.id];
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: row,
    });
  });
});

app.get("/", (req, res) => {
  res.json({ message: "alive" });
});

app.use(function (req, res) {
  res.status(404);
});

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
