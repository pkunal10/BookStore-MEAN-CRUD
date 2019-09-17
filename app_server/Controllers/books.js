const request = require('request');
const apiOptions = {
    server: 'http://localhost:3000'
};

const _renderListpage = function (req, res, body) {
    res.render('list-display', { title: "Books", Books: body });
}

const _renderDetailspage = function (req, res, body) {
    res.render('details', { title: "Book Details", Book: body });
}


module.exports.bookList = function (req, res) {
    const path = '/api/books';
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {},
    };
    request(
        requestOptions,
        (err, statusCode, body) => {

            _renderListpage(req, res, body);
        }
    );
};
module.exports.bookInfo = (req, res) => {
    const path = `/api/books/${req.params.bookId}`;
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {},
    };
    request(
        requestOptions,
        (err, statusCode, body) => {

            _renderDetailspage(req, res, body);
        }
    );  
};

module.exports.doAddNewFood = (req, res) => {
    const path = `/api/books/`;
    const postdata = {
        bookName: req.body.bookName,
        author: req.body.author,
        type: req.body.type,        
        price: req.body.price
    };

    const requestOption = {
        url: apiOptions.server+path,
        method: "post",
        json: postdata
    };

    request(requestOption,
        (err, responseCode, body) => {
            // if (responseCode === 201) {
            //     res.redirect('/');
            // }
            console.log(body);
        }
    );
};

module.exports.createNewBook = (req, res) => {
    res.render('create', { title: "Create New Book" });
};