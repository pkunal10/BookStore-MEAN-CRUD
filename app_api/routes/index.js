var express = require('express');
var router = express.Router();
var ctrlBook=require('../controllers/book');

router.route('/books')
.get(ctrlBook.getBooks)
.post(ctrlBook.createBook);

router.route('/books/:bookId')
.get(ctrlBook.getBookById)
.put(ctrlBook.updateBook)
.delete(ctrlBook.DeleteBook);

module.exports=router;