var express = require('express');
var router = express.Router();
var ctrlAbout=require('../Controllers/about');
var ctrlBooks=require('../Controllers/books');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Conestoga BookStore' });
});



router.get('/about',ctrlAbout.about);
router.get('/books',ctrlBooks.bookList);
router.get('/books/:bookId',ctrlBooks.bookInfo);
router.route('/new')
.get(ctrlBooks.createNewBook)
.post(ctrlBooks.doAddNewFood);

module.exports = router;
