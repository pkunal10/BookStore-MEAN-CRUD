const mongoose = require('mongoose');
const book = mongoose.model('books');


module.exports.getBooks = function (req, res) {
    book
        .find()
        .exec(function (err, bookdata) {
            if (err) {
                res
                    .status(404)
                    .json(err);
                return;
            }
            res
                .status(200)
                .json(bookdata);
        });
};

module.exports.getBookById = function (req, res) {
    book
        .findById(req.params.bookId)
        .exec((err, bookdata) => {
            if (!bookdata) {
                return res
                    .status(404)
                    .json({
                        'message': 'Book not Found'
                    });
            } else if (err) {
                return res
                    .status(404)
                    .json(err);
            }
            res.status(200).json(bookdata);
        });
};

// module.exports.updateBook = function (req, res) {
//     var updateDoc = req.body;
//     delete updateDoc._id;
//     book.findOneAndUpdate(
//         {
//             _id: req.params.id
//         },
//         {
//             bookName: req.body.bookName,
//             type: req.body.type,
//             author: req.body.author,
//             price: req.body.price            
//         }, function (err, doc) {
//             if (err) {
//                 handleError(res, err.message, "Failed to update the book Details");
//             } else {
//                 updateDoc._id = req.params.id;
//                 res.status(200).json(updateDoc);
//             }
//         });
// }

module.exports.updateBook = function (req, res) {    
    if (!req.params.bookId) {
        res
            .status(404)
            .json({
                'message': 'Not Found, Book Id is required'
            });
        return;
    }
    book
        .findById(req.params.bookId)
        .exec((err, bookdata) => {
            if (!bookdata) {
                res
                    .status(404)
                    .json({
                        'message': 'book Id not found'
                    });
                return;
            } else if (err) {
                res
                    .status(400)
                    .json(err);
                return;
            }
            bookdata.bookName = req.body.bookName,
                bookdata.author = req.body.author,
                bookdata.type = req.body.type,
                bookdata.price = parseInt(req.body.price)
            bookdata.save((err, bookdata) => {
                if (err) {
                    res
                        .status(404)
                        .json(err);
                } else {
                    res
                        .status(200)
                        .json(bookdata);
                }
            });
        });
};

module.exports.DeleteBook = function (req, res) {
    const bookId = req.params.bookId;
    if (bookId) {
        book
            .findByIdAndRemove(bookId)
            .exec((err, bookdata) => {
                if (err) {
                    res
                        .status(404)
                        .json(err);
                    return;
                }
                res
                    .status(204)
                    .json(req.params.bookId);
            });
    } else {
        res
            .status(404)
            .json({ 'message': 'No Book id' });
    }
};

module.exports.createBook = function (req, res) {

    book
        .create({
            bookName: req.body.bookName,
            author: req.body.author,
            type: req.body.type,
            price: parseInt(req.body.price)
        }, (err, bookdata) => {
            if (err) {
                res
                    .status(404)
                    .json(err);
            } else {
                res.status(201).json(bookdata);
            }
        });
};