
const sqlite3 = require("sqlite3").verbose();

let db = new sqlite3.Database(
  "/home/krisztiandev/Braining hub/BH-Blog_KNy/modell/postsDB.db",
  err => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Connected to the postsDB database.");
  }
);

module.exports = class BlogPostRepository {
  static getAllData() {
    return new Promise(function (resolve, reject) {
      db.serialize(function () {
        db.all(
          "SELECT rowid, author, date, title, content FROM posts",
          function (err, result) {
            if (err) {
              reject(err);
            }
            resolve(result);
          }
        );
      });
    });
  }

  static insertNewData(data) {
    db.serialize(function () {
      db.run(
        `INSERT INTO posts(author, date, title, content, slug) VALUES (?,?,?,?,?)`,
        [data.author, data.date, data.title, data.content, data.slug],
        function (err) {
          if (err) {
            return console.log(err.message);
          }
          console.log(`A row has been inserted with rowid ${this.lastID}`);
        }
      );
    });
  }


  static updateData(data) {
    let {id, title, content, slug, author } = data
    let insertData = [title, content, slug, author, id]
    let sql = `UPDATE posts
                  SET title = ?,
                  content = ?,
                  slug = ?,
                  author = ?
                  WHERE rowid = ?`

    db.run(sql, insertData,
      function (err) {
        if (err) {
          return console.log(err.message);
        }
        console.log(`A row has been updated with rowid ${this.lastID}`);
      }
    );

  }

  static getDataId(id) {
    return new Promise(function (resolve, reject) {
      db.serialize(function () {
        db.all(
          `SELECT rowid as id, author, date, title, content, slug FROM posts WHERE id = ${id}`,
          function (err, result) {
            if (err) {
              // hibakezelés
              reject(err.message);
            }
            let post = result.find(p => p);
            // console.log(post);
            resolve(post);
          }
        );
      });
    });
  }

  static getDataSlug(slug) {
    return new Promise(function (resolve, reject) {
      db.serialize(function () {
        db.all(
          `SELECT author, date, title, content, slug FROM posts WHERE slug = '${slug}'`,
          function (err, result) {
            if (err) {
              // hibakezelés
              reject(err.message);
            }
            // console.log(result)
            let post = result.find(p => p);
            // console.log(post);
            resolve(post);
          }
        );
      });
    });
  }
};
