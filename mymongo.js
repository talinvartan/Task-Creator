var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
console.log('Connection to MongoDB');

var TestModel = mongoose.model('Test', {
    testName: String,
    question: String,
    correctAnswer: String,
    wrongAnswers: []
});

var test1 = new TestModel({
    testName: 'JavaScript',
    question: 'Who is the creator of the JavaScript language ?',
    correctAnswer: 'Brendan Eich',
    wrongAnswer: ['Lary Pate', 'Mark Zuckerberg', 'Bill Gates']
});


test1.save(function (err, results) {
 console.log(err);
 console.log(results);
 });


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