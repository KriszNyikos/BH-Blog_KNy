const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('postsDB.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the SQlite database.');
  });

const posts = [
    {   id: 1,
        author: 'Habiszti',
        date: '2019-02-25T00:00:00.000Z',
        title: 'Ez itt egy cím',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices condimentum egestas. Aenean venenatis posuere malesuada. Proin quam lorem, tincidunt et cursus sed, aliquam at nulla. Nam ac sapien eu arcu tempor auctor ac vel massa. Phasellus non leo purus. Pellentesque sollicitudin augue finibus maximus lacinia. Sed tempor accumsan sem, nec condimentum mi lacinia et. Cras non suscipit ipsum, at condimentum urna. Ut ut condimentum elit, sed pretium odio. Phasellus placerat leo id suscipit gravida. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Etiam sagittis velit ac interdum lobortis. Aenean fringilla lacus id justo sollicitudin consequat. Sed sagittis mattis elementum. Donec ante augue, volutpat vitae convallis sed, consectetur scelerisque leo. ',
        slug: 'ez-itt-egy-cim'
    },
    {   id: 2,
        author: 'Horváth Béla',
        date: '2020-01-25T00:00:00.000Z',
        title: 'További írások',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices condimentum egestas. Aenean venenatis posuere malesuada. Proin quam lorem, tincidunt et cursus sed, aliquam at nulla. Nam ac sapien eu arcu tempor auctor ac vel massa. Phasellus non leo purus. Pellentesque sollicitudin augue finibus maximus lacinia. Sed tempor accumsan sem, nec condimentum mi lacinia et. Cras non suscipit ipsum, at condimentum urna. Ut ut condimentum elit, sed pretium odio. Phasellus placerat leo id suscipit gravida. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Etiam sagittis velit ac interdum lobortis. Aenean fringilla lacus id justo sollicitudin consequat. Sed sagittis mattis elementum. Donec ante augue, volutpat vitae convallis sed, consectetur scelerisque leo. ',
        slug: 'tovabbi-irasok'
    },

    {   id: 3,
        author: 'Kiss János',
        date: '2018-08-25T00:00:00.000Z',
        title: 'Volt egyszer egy',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices condimentum egestas. Aenean venenatis posuere malesuada. Proin quam lorem, tincidunt et cursus sed, aliquam at nulla. Nam ac sapien eu arcu tempor auctor ac vel massa. Phasellus non leo purus. Pellentesque sollicitudin augue finibus maximus lacinia. Sed tempor accumsan sem, nec condimentum mi lacinia et. Cras non suscipit ipsum, at condimentum urna. Ut ut condimentum elit, sed pretium odio. Phasellus placerat leo id suscipit gravida. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Etiam sagittis velit ac interdum lobortis. Aenean fringilla lacus id justo sollicitudin consequat. Sed sagittis mattis elementum. Donec ante augue, volutpat vitae convallis sed, consectetur scelerisque leo. ',
        slug: 'volt-egyszer-egy'
    },
    {   id: 4,
        author: 'Teszkó Tünde',
        date: '2017-03-25T00:00:00.000Z',
        title: 'Meg a kőleves',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices condimentum egestas. Aenean venenatis posuere malesuada. Proin quam lorem, tincidunt et cursus sed, aliquam at nulla. Nam ac sapien eu arcu tempor auctor ac vel massa. Phasellus non leo purus. Pellentesque sollicitudin augue finibus maximus lacinia. Sed tempor accumsan sem, nec condimentum mi lacinia et. Cras non suscipit ipsum, at condimentum urna. Ut ut condimentum elit, sed pretium odio. Phasellus placerat leo id suscipit gravida. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Etiam sagittis velit ac interdum lobortis. Aenean fringilla lacus id justo sollicitudin consequat. Sed sagittis mattis elementum. Donec ante augue, volutpat vitae convallis sed, consectetur scelerisque leo. ',
        slug: 'meg-a-koleves'
    },

    {   id: 5,
        author: 'Steve Andzselo',
        date: '2017-05-25T00:00:00.000Z',
        title: 'Ha egyszer én',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices condimentum egestas. Aenean venenatis posuere malesuada. Proin quam lorem, tincidunt et cursus sed, aliquam at nulla. Nam ac sapien eu arcu tempor auctor ac vel massa. Phasellus non leo purus. Pellentesque sollicitudin augue finibus maximus lacinia. Sed tempor accumsan sem, nec condimentum mi lacinia et. Cras non suscipit ipsum, at condimentum urna. Ut ut condimentum elit, sed pretium odio. Phasellus placerat leo id suscipit gravida. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Etiam sagittis velit ac interdum lobortis. Aenean fringilla lacus id justo sollicitudin consequat. Sed sagittis mattis elementum. Donec ante augue, volutpat vitae convallis sed, consectetur scelerisque leo. ',
        slug: 'ha-egyszer-en'
    }
]

db.serialize(function () {
    db.run("DROP TABLE posts");

})

db.serialize(function () {
    db.run("CREATE TABLE posts('author' TEXT, 'date' TEXT, 'title' TEXT, 'content' TEXT, slug TEXT);");
})

db.serialize(function () {
    posts.forEach(post => {
        db.prepare(`INSERT INTO posts VALUES (?,?,?,?,?)`)
            .run(post.author, post.date, post.title, post.content, post.slug)
    })
})

db.serialize(function () {
    db.all('SELECT rowid, author, date, title, content, slug FROM posts', function(err, result){
        if (err != null) {
            // hibakezelés
        }
       // console.log(result)
    })
})