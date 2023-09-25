const express = require('express');
const path = require('path');

const app = express();
app.set('view engine', 'ejs');
const PORT = 3000;

const createPath = (page) => path.resolve(__dirname, 'ejs-html', `${page}.ejs`);

app.listen(PORT, 'localhost', (error) => {
    error ? console.log(error) : console.log(`listening port ${PORT}`);

    app.get('/', (req, res) => {
        const title = 'Home';
        res.render(createPath('index'), { title });
    });
    app.get('/contacts', (req, res) => {
        const title = 'Contacts';
        const contacts = [
            { name: 'Youtube', link: 'https://3dnews.ru/' },
            { name: 'Twitter', link: 'https://3dnews.ru/' },
        ];
        res.render(createPath('contacts'), { contacts, title });
    });
    app.get('/posts:id', (req, res) => {
        const title = 'Post';
        res.render(createPath('posts'), { title });
    });
    app.get('/posts', (req, res) => {
        const title = 'Posts';
        res.render(createPath('posts'), { title });
    });
    app.get('/add-post', (req, res) => {
        const title = 'Add post';
        res.render(createPath('add-post'), { title });
    });
    app.get('/contacts2', (req, res) => {
        res.redirect('/contacts');
    });

    app.use((req, res) => {
        const title = 'Error';
        res.status(404).render(createPath('error'), { title });
    });
});
