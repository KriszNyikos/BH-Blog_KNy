const BlogPost = require('../modell/BlogPost')


module.exports = class BlogPostRepository {
  constructor(db, dateService) {
    this.db = db
    this.dateService = dateService
  }

  findAll() {
    return new Promise((resolve, reject) => {
      this.db.serialize(() => {
        this.db.all(
          "SELECT rowid, author, date, title, content FROM posts",
          function (err, result) {
            if (err) {
              reject(err);
            }
            result = result.map(row => new BlogPost(row.rowid, row.author, row.date = !row.date ? row.date : new Date(row.date), row.title, row.content, row.slug))
            //console.log(result)
            resolve(result);
          });
      })
    });
  }

  insert(data) {
    let {author, date, title, content, slug} = data

    date = date ? this.dateService.toISO(data.date) : null
    console.log(date)

    this.db.serialize(() => {
      let sql = `INSERT INTO posts(author, date, title, content, slug) VALUES (?,?,?,?,?)`
      let datas = [author, data, title, content, slug]
      this.db.run(
        sql,
        datas,
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
    let {id, date, title, content, slug} = data
    
    date = date ? this.dateService.toISO(data.date) : null

    let updateData = [title, date, content, slug, id]
    let sql = `UPDATE posts
                  SET title = ?,
                  date= ?, 
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
  
  findByWord(word){
    return new Promise((resolve, reject) => {
      this.db.serialize(() => {
        this.db.all(
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
      })
    });
  }

  findById(id) {
    return new Promise((resolve, reject) => {
      this.db.serialize(() => {
        this.db.all(
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
      });
    });
  }

  findBySlug(slug) {
    let db = this.db
    return new Promise((resolve, reject) => {
      this.db.serialize(() => {
        this.db.all(
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
      });
    });
  }
};
