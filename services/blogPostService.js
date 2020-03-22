const {readData, writeData} = require('./dbservice')

function post(title, content, author){
    let date = new Date()
    date = `${date.getFullYear()} ${date.getMonth()}. ${date.getDay()}.`

    writeData(author, date, title, content)
}

function get(){
    return new Promise(function (resolve, reject){
        let datas = readData()
        datas.then(array => resolve(array))
    })
    
}

module.exports = {get, post}