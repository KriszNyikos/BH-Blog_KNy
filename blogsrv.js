
const express = require('express')
const app = express()
const port = 3000

const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/'
}));

app.set('view engine', 'handlebars');

app.engine('handlebars', exphbs());

app.use(express.static('public'))

const blogName = 'Blog oldal'

const posts = [
    {
        author: 'Habiszti',
        date: '2020 02. 25.',
        title: 'Ez itt egy cím',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices condimentum egestas. Aenean venenatis posuere malesuada. Proin quam lorem, tincidunt et cursus sed, aliquam at nulla. Nam ac sapien eu arcu tempor auctor ac vel massa. Phasellus non leo purus. Pellentesque sollicitudin augue finibus maximus lacinia. Sed tempor accumsan sem, nec condimentum mi lacinia et. Cras non suscipit ipsum, at condimentum urna. Ut ut condimentum elit, sed pretium odio. Phasellus placerat leo id suscipit gravida. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Etiam sagittis velit ac interdum lobortis. Aenean fringilla lacus id justo sollicitudin consequat. Sed sagittis mattis elementum. Donec ante augue, volutpat vitae convallis sed, consectetur scelerisque leo. '
    },
    {
        author: 'Habiszti',
        date: '2020 02. 25.',
        title: 'Ez itt egy cím',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices condimentum egestas. Aenean venenatis posuere malesuada. Proin quam lorem, tincidunt et cursus sed, aliquam at nulla. Nam ac sapien eu arcu tempor auctor ac vel massa. Phasellus non leo purus. Pellentesque sollicitudin augue finibus maximus lacinia. Sed tempor accumsan sem, nec condimentum mi lacinia et. Cras non suscipit ipsum, at condimentum urna. Ut ut condimentum elit, sed pretium odio. Phasellus placerat leo id suscipit gravida. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Etiam sagittis velit ac interdum lobortis. Aenean fringilla lacus id justo sollicitudin consequat. Sed sagittis mattis elementum. Donec ante augue, volutpat vitae convallis sed, consectetur scelerisque leo. '
    },

    {
        author: 'Habiszti',
        date: '2020 02. 25.',
        title: 'Ez itt egy cím',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices condimentum egestas. Aenean venenatis posuere malesuada. Proin quam lorem, tincidunt et cursus sed, aliquam at nulla. Nam ac sapien eu arcu tempor auctor ac vel massa. Phasellus non leo purus. Pellentesque sollicitudin augue finibus maximus lacinia. Sed tempor accumsan sem, nec condimentum mi lacinia et. Cras non suscipit ipsum, at condimentum urna. Ut ut condimentum elit, sed pretium odio. Phasellus placerat leo id suscipit gravida. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Etiam sagittis velit ac interdum lobortis. Aenean fringilla lacus id justo sollicitudin consequat. Sed sagittis mattis elementum. Donec ante augue, volutpat vitae convallis sed, consectetur scelerisque leo. '
    },

    {
        author: 'Habiszti',
        date: '2020 02. 25.',
        title: 'Ez itt egy cím',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices condimentum egestas. Aenean venenatis posuere malesuada. Proin quam lorem, tincidunt et cursus sed, aliquam at nulla. Nam ac sapien eu arcu tempor auctor ac vel massa. Phasellus non leo purus. Pellentesque sollicitudin augue finibus maximus lacinia. Sed tempor accumsan sem, nec condimentum mi lacinia et. Cras non suscipit ipsum, at condimentum urna. Ut ut condimentum elit, sed pretium odio. Phasellus placerat leo id suscipit gravida. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Etiam sagittis velit ac interdum lobortis. Aenean fringilla lacus id justo sollicitudin consequat. Sed sagittis mattis elementum. Donec ante augue, volutpat vitae convallis sed, consectetur scelerisque leo. '
    },

    {
        author: 'Habiszti',
        date: '2020 02. 25.',
        title: 'Ez itt egy cím',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices condimentum egestas. Aenean venenatis posuere malesuada. Proin quam lorem, tincidunt et cursus sed, aliquam at nulla. Nam ac sapien eu arcu tempor auctor ac vel massa. Phasellus non leo purus. Pellentesque sollicitudin augue finibus maximus lacinia. Sed tempor accumsan sem, nec condimentum mi lacinia et. Cras non suscipit ipsum, at condimentum urna. Ut ut condimentum elit, sed pretium odio. Phasellus placerat leo id suscipit gravida. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Etiam sagittis velit ac interdum lobortis. Aenean fringilla lacus id justo sollicitudin consequat. Sed sagittis mattis elementum. Donec ante augue, volutpat vitae convallis sed, consectetur scelerisque leo. '
    }



]


app.get('/', (req, res) => {
    res.render('main_layout',{
        posts: posts,
        blogName: blogName
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
