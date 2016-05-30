var express =  require("express");
var app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bookdatacenter');

var Book = require('./app/models/book');


app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

var port = process.env.PORT || 9999;

var router = express.Router();

router.use(function(req, res, next) {
	console.log("logging");
	next();
});

router.get('/', function(req, res) {
	res.json({message : 'welcome to book inventory api'});
});

router.route('/book')
	.post(function(req, res) {
		var book = new Book();
		book.name = req.body.name;

		book.save(function(err) {
			if(err) res.send(err);
			res.json({message: 'book created'});
		});
	})
	.get(function(req, res) {
		Book.find(function(err, books) {
			if(err) res.send(err);
			res.json(books);
		});
	});

router.route('/book/:bookid')
    .get(function(req, res) {
        Book.findById(req.params.bookid, function(err, book) {
            if (err)
                res.send(err);
            res.json(book);
        });
    });

app.use('/api', router);

app.listen(port);
