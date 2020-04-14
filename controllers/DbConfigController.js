const { dbPath } = require("../config");
const fs = require('fs');
const config = require('../config.json')
//let dbPath = "./modell/postsDB.db"
//const sqlite3 = require("sqlite3").verbose(); 

module.exports = class DbConfigController {
    constructor(db) {
        this.db = db
    }

    renderConfig(req, res) {
        res.render('dbConfigView', {
            path: dbPath
        })
    }

    changePath(req, res) {
        const newPath = req.body.path
        let configFile
        fs.readFileSync('./config.json', 'utf8', (err, jsonString) => {
            if (err) {
                console.log("File read failed:", err)
                return
            }
            configFile = JSON.parse(jsonString)
            console.log(configFile)
        })

        configFile.dbPath = newPath

        fs.writeFileSync('./config.json', JSON.stringify(configFile), err => {
            if (err) {
                console.log('Error writing file', err)
            } else {
                console.log('Successfully wrote file')
            }
        })

    }
}

/* this.db.close((err) => {
         if (err) {
             return console.error(err.message);
         }
         console.log('Close the database connection on path');
     });

  this.db = new sqlite3.Database(path, sqlite3.OPEN_READWRITE, (err) => {
         if (err) {
             return console.error(err.message);
         }
         console.log(`Connected to the postsDB database. Path: ${path}`);
     }
     )*/
