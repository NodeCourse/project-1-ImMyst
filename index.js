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


 app.post('/api/post/addreview', (req, res) => {
     const { title, game, author, review, like, dislike } = req.body;
     Review
         .sync()
         .then(() => Review.create({ title, game, author, review, like, dislike }))
         .then(() => res.redirect('/'))
 });


app.listen(3000);
