var express = require('express');
var router = express.Router();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


router.get("/", function (req, res, next) {
    let dbConnection = req.app.locals.db;
     dbConnection.collection("candidates").find({ "nombre": req.body.nombre }).toArray(function (err, data) {
        console.log(data)
        if (err != null) {
            console.log(err);
            res.send({ mensaje: "error: " + err });
        } else {
            res.json(data); 
        }
    });
});



module.exports = router;


