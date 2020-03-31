const BlogPost = require('../modell/BlogPost')


module.exports = class BlogPostRepository {
   constructor(db) {
     this.db = db
   }

  findAll() {
    const db = this.db
    return new Promise(function (resolve, reject) { 
      db.serialize(function () {
        db.all(
          "SELECT rowid, author, date, title, content FROM posts",
          function (err, result) {
            if (err) {

              reject(err);
            }
            result = result.map(row => new BlogPost(row.rowid, row.author, row.date, row.title, row.content, row.slug))
            resolve(result);
          });
      })
    });
  }

  insert(data) {
    const db = this.db
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


update(data) {
  let updateData = [data.title, data.content, data.slug, data.id]
  let sql = `UPDATE posts
                  SET title = ?,
                  content = ?,
                  slug = ?
                  WHERE rowid = ?`

  this.db.run(sql, updateData,
    function (err) {
      if (err) {
        return console.log(err.message);
      }
    }
  );

}

findById(id) {
  const db = this.db
  return new Promise(function (resolve, reject) {
    db.serialize(function () {
      db.all(
        `SELECT rowid as id, author, date, title, content, slug FROM posts WHERE id = ${id}`,
        function (err, result) {
          if (err) {
            // hibakezelés
            reject(err.message);
          }
          let post = result.find(row => new BlogPost(row.rowid, row.author, row.date, row.title, row.content, row.slug))
           console.log(post);

          resolve(post);
        }
      );
    });
  });
}

findBySlug(slug) {
  let db = this.db
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
          let post = result.find(row => new BlogPost(row.rowid, row.author, row.date, row.title, row.content, row.slug))
          // console.log(post);
          resolve(post);
        }
      );
    });
  });
}
};
