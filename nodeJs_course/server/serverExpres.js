const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();
const methodOverride = require('method-override');
const postRoutes = require('./routes/post-routes');
const postApiRoutes = require('./routes/api-post-routes');
const contactRoutes = require('./routes/contacts-routes');
const createPath = require('./helpers/create-path');

const app = express();
app.set('view engine', 'ejs');

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((res) => console.log('connected to db'))
    .catch((error) => console.log(error));

app.listen(process.env.PORT, 'localhost', (error) => {
    error
        ? console.log(error)
        : console.log(`listening port ${process.env.PORT}`);
});

app.use(morgan(':method :url :status :res[content-lenght] - response-time ms'));

app.use(express.urlencoded({ extended: false }));

app.use(express.static('styles')); // подключаем стили,добавляем папку стилей в исключение

app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    const title = 'Home';
    res.render(createPath('index'), { title });
});

app.use(postRoutes);
app.use(contactRoutes);
app.use(postApiRoutes);

app.use((req, res) => {
    const title = 'Error';
    res.status(404).render(createPath('error'), { title });
});
