var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
console.log('Connection to MongoDB');

var TaskModel = mongoose.model('Task', {
    description: String,
    status: Number,
    priority: Number,
    tags: String,
    notes: String
});

var task1 = new TaskModel({
    description: 'Learn iOS 7 programming',
    status: 1,
    priority: 1,
    tags: 'iWatch, iOS',
    notes: 'Nov 14 hackathon'
});

/*task1.save(function (err, results) {
 console.log(err);
 console.log(results);
 });*/



router.get('/', function (req, res) { // req.query.
    TaskModel.find(function (err, results) {
        if (err) {
            console.log(err);
            res.status(500).json({ details: results });
        }
        else {
            console.log(results);
            res.status(200).json(results);
        }
    });
});

router.post('/', function (req, res) {
    console.log(req.body);
    (new TaskModel(req.body)).save(function (err, results) {
        if (err) {
            console.log(err);
            res.status(500).json({ details: results });
        }
        else {
            console.log(results);
            res.status(200).json(results);
        }
    });
});

router.delete('/:id', function (req, res) {
    setTimeout(function () {
        TaskModel.remove({ _id: req.params.id }, function (err, results) {
            if (err) {
                console.log(err);
                res.status(500).json({ details: results });
            }
            else {
                console.log(results);
                res.status(200).json(results);
            }
        });
    }, 500);

});

module.exports = router;