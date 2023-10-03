const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Post = require('./models/post');

const app = express();
app.set('view engine', 'ejs');
const PORT = 3000;
const db =
    'mongodb+srv://tuber:1529Liga2884@cluster0.4pks7de.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp';

mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => console.log('connected to db'))
    .catch((error) => console.log(error));

const createPath = (page) => path.resolve(__dirname, 'ejs-html', `${page}.ejs`);

app.listen(PORT, 'localhost', (error) => {
    error ? console.log(error) : console.log(`listening port ${PORT}`);
});

app.use(morgan(':method :url :status :res[content-lenght] - response-time ms'));

app.use(express.urlencoded({ extended: false }));

app.use(express.static('styles')); // подключаем стили,добавляем папку стилей в исключение

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
app.get('/posts/:id', (req, res) => {
    const title = 'new post';
    const post = {
        id: '1',
        text: 'sdafgsdgsdksdaadkj   fgsdfgdfg  dfgsgsdf  34j  dsfsdfgd  wfsg lghlasl',
        title: 'Заготоловок поста',
        date: '02.10.2023',
        author: 'YuRock',
    };
    res.render(createPath('post'), { title, post });
});
app.get('/posts', (req, res) => {
    const title = 'какой то текст';
    const posts = [
        {
            id: '1',
            text: 'sdafgsdgsdksdaadkj   fgsdfgdfg  dfgsgsdf  34j  dsfsdfgd  wfsg lghlasl',
            title: 'Заготоловок поста',
            date: '02.10.2023',
            author: 'YuRock',
        },
    ];

    res.render(createPath('posts'), { title, posts });
});

app.post('/add-post', (req, res) => {
    const { title, author, text } = req.body;
    const post = new Post({
        title,
        author,
        text,
    });
    post.save()
        .then((result) => res.send(result))
        .catch((error) => {
            console.log(error);
            res.render(createPath('error'), { title: 'Error' });
        });
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
