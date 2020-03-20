
const posts = [
    {   id: 1,
        author: 'Habiszti',
        date: '2020 02. 25.',
        title: 'Ez itt egy cím',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices condimentum egestas. Aenean venenatis posuere malesuada. Proin quam lorem, tincidunt et cursus sed, aliquam at nulla. Nam ac sapien eu arcu tempor auctor ac vel massa. Phasellus non leo purus. Pellentesque sollicitudin augue finibus maximus lacinia. Sed tempor accumsan sem, nec condimentum mi lacinia et. Cras non suscipit ipsum, at condimentum urna. Ut ut condimentum elit, sed pretium odio. Phasellus placerat leo id suscipit gravida. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Etiam sagittis velit ac interdum lobortis. Aenean fringilla lacus id justo sollicitudin consequat. Sed sagittis mattis elementum. Donec ante augue, volutpat vitae convallis sed, consectetur scelerisque leo. '
    },
    {   id: 2,
        author: 'Habiszti',
        date: '2020 02. 25.',
        title: 'Ez itt egy cím',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices condimentum egestas. Aenean venenatis posuere malesuada. Proin quam lorem, tincidunt et cursus sed, aliquam at nulla. Nam ac sapien eu arcu tempor auctor ac vel massa. Phasellus non leo purus. Pellentesque sollicitudin augue finibus maximus lacinia. Sed tempor accumsan sem, nec condimentum mi lacinia et. Cras non suscipit ipsum, at condimentum urna. Ut ut condimentum elit, sed pretium odio. Phasellus placerat leo id suscipit gravida. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Etiam sagittis velit ac interdum lobortis. Aenean fringilla lacus id justo sollicitudin consequat. Sed sagittis mattis elementum. Donec ante augue, volutpat vitae convallis sed, consectetur scelerisque leo. '
    },

    {   id: 3,
        author: 'Habiszti',
        date: '2020 02. 25.',
        title: 'Ez itt egy cím',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices condimentum egestas. Aenean venenatis posuere malesuada. Proin quam lorem, tincidunt et cursus sed, aliquam at nulla. Nam ac sapien eu arcu tempor auctor ac vel massa. Phasellus non leo purus. Pellentesque sollicitudin augue finibus maximus lacinia. Sed tempor accumsan sem, nec condimentum mi lacinia et. Cras non suscipit ipsum, at condimentum urna. Ut ut condimentum elit, sed pretium odio. Phasellus placerat leo id suscipit gravida. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Etiam sagittis velit ac interdum lobortis. Aenean fringilla lacus id justo sollicitudin consequat. Sed sagittis mattis elementum. Donec ante augue, volutpat vitae convallis sed, consectetur scelerisque leo. '
    },

    {   id: 4,
        author: 'Habiszti',
        date: '2020 02. 25.',
        title: 'Ez itt egy cím',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices condimentum egestas. Aenean venenatis posuere malesuada. Proin quam lorem, tincidunt et cursus sed, aliquam at nulla. Nam ac sapien eu arcu tempor auctor ac vel massa. Phasellus non leo purus. Pellentesque sollicitudin augue finibus maximus lacinia. Sed tempor accumsan sem, nec condimentum mi lacinia et. Cras non suscipit ipsum, at condimentum urna. Ut ut condimentum elit, sed pretium odio. Phasellus placerat leo id suscipit gravida. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Etiam sagittis velit ac interdum lobortis. Aenean fringilla lacus id justo sollicitudin consequat. Sed sagittis mattis elementum. Donec ante augue, volutpat vitae convallis sed, consectetur scelerisque leo. '
    },

    {   id: 5,
        author: 'Habiszti',
        date: '2020 02. 25.',
        title: 'Ez itt egy cím',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices condimentum egestas. Aenean venenatis posuere malesuada. Proin quam lorem, tincidunt et cursus sed, aliquam at nulla. Nam ac sapien eu arcu tempor auctor ac vel massa. Phasellus non leo purus. Pellentesque sollicitudin augue finibus maximus lacinia. Sed tempor accumsan sem, nec condimentum mi lacinia et. Cras non suscipit ipsum, at condimentum urna. Ut ut condimentum elit, sed pretium odio. Phasellus placerat leo id suscipit gravida. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Etiam sagittis velit ac interdum lobortis. Aenean fringilla lacus id justo sollicitudin consequat. Sed sagittis mattis elementum. Donec ante augue, volutpat vitae convallis sed, consectetur scelerisque leo. '
    }
]

class PostController{

    write(title, content, author){
        let date = new Date()

        let element = {}
        element.author = author
        element.id = (posts[posts.length-1].id) + 1
        element.title = title
        element.content = content
        element.date = `${date.getFullYear()} ${date.getMonth()}. ${date.getDay()}.` 
        posts.push(element)
        console.log(posts)
    }

}


module.exports = {
    posts : posts,
    PostController: PostController
}