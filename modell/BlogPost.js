module.exports = class BlogPost {
    constructor(id, author, date, title, content, slug) {
        this.id = id || null
        this.author = author || null
        this.date = date || null
        this.title = title || null
        this.content = content || null
        this.slug = slug ||null
    }
}
