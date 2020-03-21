
const {DbService} = require('../modell/dbservice')

const DbServiceObject = new DbService()

class PostController{

    post(title, content, author){
        let date = new Date()
        date = `${date.getFullYear()} ${date.getMonth()}. ${date.getDay()}.`

        DbServiceObject.writeData(author, date, title, content)
    }

    get(){
        return new Promise(function (resolve, reject){
            let datas = DbServiceObject.readData()
            datas.then(array => resolve(array))
        })
        
    }

}

module.exports = {
    PostController: PostController
}