const express = require('express');
const soap = require('soap');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const url = 'https://passport.psu.ac.th/authentication/authentication.asmx?wsdl';

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("port", process.env.PORT);

app.post("/login", (req, res) => {
    soap.createClient(url, (err, client) => {
        if (err) console.error(err);
        else {
            let user = {}
            user.username = req.body.username
            user.password = req.body.password

            client.GetStaffDetails(user, function (err, response) {
                // client.GetStudentDetails(args, function(err, response) {
                if (err) console.error(err);
                else {
                    console.log(response);
                    res.send(response);
                }
            });
        }
    });
})

app.use("*", (req, res) => res.status(404).send('404 Not found'));

const server = app.listen(app.get("port"), () => {
    console.log(`Express running → PORT ${server.address().port}`);
});