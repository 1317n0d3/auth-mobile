const sqlite3 = require("sqlite3").verbose();

const DBSOURCE = "./notes.db";

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  } else {
    console.log("Connected to the SQLite database.");
    db.run(
      `CREATE TABLE notes(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        note text NOT NULL,
        tags text,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL)`,
      (err) => {
        if (err) {
          // Table already created
        } else {
          // Table just created, creating some rows
          const insert = "INSERT INTO notes (note, tags) VALUES ($note, $tags)";
          db.run(insert, { $note: "test note 1", $tags: "test1" });
          db.run(insert, { $note: "test note 2", $tags: null });
        }
      }
    );
  }
});

module.exports = db;
