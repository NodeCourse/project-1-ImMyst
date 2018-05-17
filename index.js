const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');

const db = new Sequelize('project1_nodejs', 'user', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});

const Article = db.define('article', {
    title: { type: Sequelize.TEXT },
    content: { type: Sequelize.TEXT }
});

app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', 'public/views')
app.use(express.static('public'));

app.get('/', (req, res) => {
    Article
        .findAll()
        .then((articles) => articles.map(article => article.dataValues))
        .then((articles) => {
            res.render('homepage', { articles });
        });
});

app.post('/', (req, res) => {
    const { title, content } = req.body;
    Article
        .sync()
        .then(() => Article.create({ title, content }))
        .then(() => res.redirect('/'));
});


app.listen(3000);
