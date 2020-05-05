const BlogPost = require('../modell/BlogPost')
const fs = require('fs')
//const {dbPath} = require('../config.json')


module.exports = class BlogPostRepository {
  constructor(db, dateService) {
    this.db = db
    this.dateService = dateService
  }

  findAll() {
    return new Promise((resolve, reject) => {
      const dbPath = JSON.parse(fs.readFileSync("./config.json")).dbPath
      const db = this.db(dbPath)
      db.serialize(() => {
        db.all(
          "SELECT rowid, author, date, title, content FROM posts",
          (err, result) => {
            if (err) {
              reject(err);
            }
            result = result.map(row => new BlogPost(row.rowid, row.author, row.date = !row.date ? row.date : new Date(row.date), row.title, row.content, row.slug))
            //console.log(result)
            resolve(result);
          });

          db.close((err) => {
            if (err) {
              return console.error(err.message);
            }
            console.log(`Close the database connection. File: ${dbPath}`);
          });
      })
    });
  }

  insert(data) {
    const dbPath = JSON.parse(fs.readFileSync("./config.json")).dbPath
    const db = this.db(dbPath)
    let {author, date, title, content, slug} = data

    date = date ? this.dateService.toISO(data.date) : null
    console.log(date)

    db.serialize(() => {
      let sql = `INSERT INTO posts(author, date, title, content, slug) VALUES (?,?,?,?,?)`
      let datas = [author, data, title, content, slug]
      db.run(
        sql,
        datas,
        function (err) {
          if (err) {
            return console.log(err.message);
          }
          console.log(`A row has been inserted with rowid ${this.lastID}`);
        }
      );
      db.close((err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log(`Close the database connection. File: ${dbPath}`);
      });
    });
  }


  update(data) {
    const dbPath = JSON.parse(fs.readFileSync("./config.json")).dbPath
    const db = this.db(dbPath)
    let {id, date, title, content, slug} = data
    
    date = date ? this.dateService.toISO(data.date) : null

    let updateData = [title, date, content, slug, id]
    let sql = `UPDATE posts
                  SET title = ?,
                  date= ?, 
                  content = ?,
                  slug = ?
                  WHERE rowid = ?`

    db.run(sql, updateData,
      function (err) {
        if (err) {
          return console.log(err.message);
        }
      }
    );

    db.close((err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log(`Close the database connection. File: ${dbPath}`);
    });

  }
  
  findByWord(word){
    const dbPath = JSON.parse(fs.readFileSync("./config.json")).dbPath
    return new Promise((resolve, reject) => {
      const db = this.db(dbPath)
      db.serialize(() => {
        db.all(
          `SELECT rowid, author, date, title, content FROM posts
            WHERE author LIKE '%${word}%' 
            OR title LIKE '%${word}%'
            OR content LIKE '%${word}%'`,
          function (err, result) {
            if (err) {
              reject(err);
            }
            result = result.map(row => new BlogPost(row.rowid, row.author, row.date = !row.date ? row.date : new Date(row.date), row.title, row.content, row.slug))
            console.log(result)
            resolve(result);
          });

          db.close((err) => {
            if (err) {
              return console.error(err.message);
            }
            console.log(`Close the database connection. File: ${dbPath}`);
          });
      })
    });
  }

  findById(id) {
    return new Promise((resolve, reject) => {
      const dbPath = JSON.parse(fs.readFileSync("./config.json")).dbPath
      const db = this.db(dbPath)
      db.serialize(() => {
        db.all(
          `SELECT rowid as id, author, date, title, content, slug FROM posts WHERE id = ${id}`,
          function (err, result) {
            if (err) {
              // hibakezelés
              reject(err.message);
            }
            console.log(result)
            let post = result.find(row => new BlogPost(row.rowid, row.author, row.date, row.title, row.content, row.slug))
            post.date = !post.date ? null : new Date(post.date)

            resolve(post);
          }
        );

        db.close((err) => {
          if (err) {
            return console.error(err.message);
          }
          console.log(`Close the database connection. File: ${dbPath}`);
        });
      });
    });
  }

  findBySlug(slug) {
    return new Promise((resolve, reject) => {
      const dbPath = JSON.parse(fs.readFileSync("./config.json")).dbPath
      const db = this.db(dbPath)
      db.serialize(() => {
        db.all(
          `SELECT author, date, title, content, slug FROM posts WHERE slug = '${slug}'`,
          function (err, result) {
            if (err) {
              // hibakezelés
              reject(err.message);
            }
            // console.log(result)
            let post = result.find(row => new BlogPost(row.rowid, row.author, new Date(row.date), row.title, row.content, row.slug))
            post.date = new Date(post.date)

            resolve(post);
          }
        );

        db.close((err) => {
          if (err) {
            return console.error(err.message);
          }
          console.log(`Close the database connection. File: ${dbPath}`);
        });
      });
    });
  }
};
