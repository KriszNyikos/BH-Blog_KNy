
module.exports = class BlogPostService {
  constructor(blogPostRepository) {
    this.blogPostRepository = blogPostRepository
  }


  insertNewPost(insertPost) {
    this.blogPostRepository.insert(insertPost);
  }

  updatePost(data) {
    this.blogPostRepository.update(data);
  }


  findAllPost() {
    return this.blogPostRepository.findAll()
  }


  findPostById(id) {
    return this.blogPostRepository.findById(id)
  }

  findPostBySlug(slug) {
    return this.blogPostRepository.findBySlug(slug)
  }

  findByWord(word) {
    return this.blogPostRepository.findByWord(word)
  }

  sortDateASC(array) {
    let arr = array.sort((a, b) => {
      return a.date - b.date
    })
    // console.log('My sorted list', arr)
    return arr

  }

  sortDateDESC(array) {
    let arr = array.sort((a, b) => {
      return b.date - a.date
    })
    // console.log('My sorted list', arr)
    return arr

  }

   archiveList(array) {

      let obj = {}
      const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];

      try {
        array.forEach(element => {
          if (!obj[element.date.getFullYear()]) {
            obj[element.date.getFullYear()] = {}
          }

          if (!obj[element.date.getFullYear()][monthNames[element.date.getMonth()]]) {
            obj[element.date.getFullYear()][monthNames[element.date.getMonth()]] = {}
          }

          obj[element.date.getFullYear()][monthNames[element.date.getMonth()]][element.id] = element.title
        });

      } catch (error) {
        throw error
      }

    return obj
      //console.log(obj)
  }

};
