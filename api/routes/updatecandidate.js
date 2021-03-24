var express = require('express');
var router = express.Router();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

router.put("/", function (req, res, next) {
    let dbConnection = req.app.locals.db;
    dbConnection.collection("persons").updateOne({"nombre":req.body.nombre}, { $set: { "status": "ko" } }, function (err, data) {
        if (err != null) {
            console.log(err);
            res.send({ mensaje: "error: " + err });
        }
        else{console.log(data)}
    });
});

module.exports = router;