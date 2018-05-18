const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');

const db = new Sequelize('project1_nodejs', 'user', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});


app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', 'public/views')
app.use(express.static('public'));

app.get('/add-review', (req, res) => {
    res.render('addreview');
});

const Review = db.define('reviews', {
        title : { type: Sequelize.STRING },
        game : { type: Sequelize.STRING},
        author : { type: Sequelize.STRING },
        review : { type: Sequelize.STRING },
        like : { type: Sequelize.INTEGER, defaultValue : 0 },
        dislike : { type: Sequelize.INTEGER, defaultValue : 0 }
    });

app.get('/', (req, res) => {
    Review
        .sync()
        .then(()=> {
          return Review.findAll();
        })
        .then((reviews) => {
            res.render('home', { reviews });
        });
});

app.post('/', (req, res) => {
    const { title, game, author, review, like, dislike } = req.body;
    Review
        .then(() => Review.create({ title, game, author, review, like, dislike }));
 });

 app.get('/', (req, res) => {
     Post
         .findAll({ include: [AddReview] })
         .then(posts => res.render('home', { posts }));
 });

 app.post('/api/post', (req, res) => {
     const { title, game, author, review, like, dislike } = req.body;
     Post
         .create({ title, game, author, review, like, dislike })
         .then(() => res.redirect('/'))
 });

 app.post('/api/post/:postID/addreview', (req, res) => {
     AddReview
         .create({ type: 'add', postId: req.params.reviewID })
         .then(() => res.redirect('/'));
 });
app.listen(3000);
