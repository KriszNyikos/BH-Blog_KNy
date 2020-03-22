//const { getAllPost, insertNewPost } = require('../modell/DAO')


const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('/home/krisztiandev/Braining hub/BH-Blog_KNy/modell/postsDB.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the postsDB database.');
});


function readData() {
        return new Promise(function (resolve, reject){
            db.serialize(function () {
              db.all('SELECT rowid, author, date, title, content FROM posts', function (err, result) {
                    if (err != null) {
                        // hibakezelés
                        reject(err)
                    }
                    resolve(result)
                })
            })
        })

    }

function writeData(author, date, title, content) {
        db.serialize(function () {
            db.run(`INSERT INTO posts(author, date, title, content) VALUES (?,?,?,?)`, [author, date, title, content], function (err) {
                if (err) {
                    return console.log(err.message);
                }
                console.log(`A row has been inserted with rowid ${this.lastID}`);
            })
        })
    }


module.exports = {
    readData, writeData
}