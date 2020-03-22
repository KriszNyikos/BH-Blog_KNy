// a DAO jelenleg nem műküdik, az adatbázis műveletek a dbService-ben vannak tárolva.

const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('/home/krisztiandev/Braining hub/BH-Blog_KNy/modell/postsDB.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the postsDB database.');
});


function getAllPost(){
    return new Promise(function (reject, resolve){
        db.all('SELECT rowid, author, date, title, content FROM posts', function (err, result) {
           // console.log(err)
            if (err == null) {
                resolve(result)  
            }
            reject(err)
        })
    })
    
}


function insertNewPost(){
        db.run(`INSERT INTO posts(author, date, title, content) VALUES (?,?,?,?)`, [author, date, title, content], function (err) {
            if (err) {
                return console.log(err.message);
            }
            console.log(`A row has been inserted with rowid ${this.lastID}`);
        })
}


module.exports= {
    getAllPost,
    insertNewPost
}