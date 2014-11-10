// utitlities for server communications

function comms_server() {
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
}/**
 * Created by talinvartan on 10/31/14.
 */
