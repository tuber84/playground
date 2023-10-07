const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
});

const Contact = mongoose.model('Contact', contactSchema); //применяем созданную ранее схему к модели

module.exports = Contact;
