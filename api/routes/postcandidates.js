var express = require('express');
var router = express.Router();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

router.post("/", function (req, res) {
    let dbConnection = req.app.locals.db;
    let nuevoLove = {
        candidate: req.body.candidate,
        icon: req.body.icon,
        hour: req.body.hour,
        min: req.body.min,
        seg: req.body.seg,
    }
    dbConnection.collection("candidates").insertOne(nuevoLove, function (err, data) {
        if (err !== null) {
            console.log(err);
            res.send({ mensaje: `Ha habido un error ${err}` });
        } else {
            res.send(data)
        }
    });
});

router.get("/", function(req, res, next) {
    let dbConnection = req.app.locals.db;
    dbConnection.collection("candidates").find().toArray(function(err, data) {
        if (err != null) {
            console.log(err);
            res.send({ mensaje: "error: " + err });
        } else {
            res.json(data); 
        }
    });
  });


module.exports = router;
