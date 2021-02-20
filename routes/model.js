var express = require('express');
var router = express.Router();
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var Products = require('../mongoose-model/Model.js');

server.listen(4000)

io.on('connection', function (socket) {
    socket.on('newdata', function (data) {
        io.emit('new-data', { data: data });
    });
    socket.on('updatedata', function (data) {
      io.emit('update-data', { data: data });
    });
});

router.get('/', function(req, res) {
    Products.find(function (err, products) {
        if (err) return next(err);
        res.json(products);
    });
});

// get data by id
router.get('/:id', function(req, res, next) {
    Products.findById(req.params.id, function (err, products) {
        if (err) return next(err);
        res.json(products);
    });
});
  
// post data
router.post('/', function(req, res, next) {
    Products.create(req.body, function (err, products) {
        if (err) {
            console.log(err);
            return next(err);
        }
        res.json(products);
    });
});
  
// put data
router.put('/:id', function(req, res, next) {
    Products.findByIdAndUpdate(req.params.id, req.body, function (err, products) {
        if (err) {
            console.log(err);
            return next(err);
        }
        res.json(products);
    });
});
  
// delete data by id
router.delete('/:id', function(req, res, next) {
    Products.findByIdAndRemove(req.params.id, req.body, function (err, products) {
        if (err) return next(err);
        res.json(products);
    });
});

module.exports = router;