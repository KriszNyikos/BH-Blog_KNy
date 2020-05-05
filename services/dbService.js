
const sqlite3 = require("sqlite3").verbose(); 



 module.exports = function db(dbPath){
        return db = new sqlite3.Database(dbPath, (err) => {
            if (err) {
              return console.error(err.message);
            }
            console.log(`Connected to the postsDB database. File: ${dbPath}`);
          }
        )
    }
