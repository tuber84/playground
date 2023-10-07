const express = require('express');
const Post = require('../models/post');
const router = express.Router();

router.delete('/posts/:id', (req, res) => {
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

router.get('/posts/:id', (req, res) => {
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

router.get('/edit/:id', (req, res) => {
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

router.put('/edit/:id', (req, res) => {
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

router.get('/posts', (req, res) => {
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

router.post('/add-post', (req, res) => {
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

module.exports = router;
