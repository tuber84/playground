const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Post = require('./models/post');
const Contact = require('./models/contacts');

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

app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    const title = 'Home';
    res.render(createPath('index'), { title });
});

app.get('/contacts', (req, res) => {
    const title = 'Contacts';
    Contact.find()
        .then((contacts) =>
            res.render(createPath('contacts'), {
                contacts,
                title,
            })
        )
        .catch((error) => {
            console.log(error);
            res.render(createPath('error'), {
                title: 'Error',
            });
        });
});

app.delete('/posts/:id', (req, res) => {
    const title = 'new post';
    Post.findByIdAndDelete(req.params.id)
        .then((result) => res.sendStatus(200))
        .catch((error) => {
            console.log(error);
            res.render(createPath('error'), {
                title: 'Error',
            });
        });
});

app.get('/posts/:id', (req, res) => {
    const title = 'new post';
    Post.findById(req.params.id)
        .then((post) =>
            res.render(createPath('post'), {
                post,
                title,
            })
        )
        .catch((error) => {
            console.log(error);
            res.render(createPath('error'), {
                title: 'Error',
            });
        });
});

app.get('/edit/:id', (req, res) => {
    const title = 'Edit post';
    Post.findById(req.params.id)
        .then((post) =>
            res.render(createPath('edit-post'), {
                post,
                title,
            })
        )
        .catch((error) => {
            console.log(error);
            res.render(createPath('error'), {
                title: 'Error',
            });
        });
});

app.put('/edit/:id', (req, res) => {
    const { title, author, text } = req.body;
    const { id } = req.params;

    Post.findByIdAndUpdate(id, { title, author, text })
        .then((result) => res.redirect(`/posts/${id}`))
        .catch((error) => {
            console.log(error);
            res.render(createPath('error'), {
                title: 'Error',
            });
        });
});

app.get('/posts', (req, res) => {
    const title = 'list of post';
    Post.find()
        .sort({ createdAt: -1 })
        .then((posts) =>
            res.render(createPath('posts'), {
                posts,
                title,
            })
        )
        .catch((error) => {
            console.log(error);
            res.render(createPath('error'), {
                title: 'Error',
            });
        });
});

app.post('/add-post', (req, res) => {
    const { title, author, text } = req.body;
    const post = new Post({
        title,
        author,
        text,
    });
    post.save()
        .then((result) => res.redirect('/posts'))
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
