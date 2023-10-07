const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const postRoutes = require('./routes/post-routes');
const contactRoutes = require('./routes/contacts-routes');

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

app.get('/add-post', (req, res) => {
    const title = 'Add post';
    res.render(createPath('add-post'), { title });
});
app.get('/contacts2', (req, res) => {
    res.redirect('/contacts');
});

app.use(postRoutes);
app.use(contactRoutes);

app.use((req, res) => {
    const title = 'Error';
    res.status(404).render(createPath('error'), { title });
});
