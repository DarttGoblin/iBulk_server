const nodemailer = require("nodemailer");
const express = require("express");
const cors = require("cors");

const app = express();
const port = 10000;
var myPassword = "oriolukxhzzakbrq";

app.use(express.json())
app.use(express.text())
app.use(cors({origin: "*"}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// app.use(bodyParser.json());
app.post("/", (req, res) => {
    var userFeedback = req.body.submittedFeedback; 
    let resObject = {};

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'yassine.bazgour@gmail.com',
          pass: myPassword
        }
    });
    
    var mailOptions = {
        from: 'yassine.bazgour@gmail.com',
        to: 'yassine.bazgour@gmail.com',
        subject: 'iBulk feedback',
        text: userFeedback
    };

    try {
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
                resObject.success = false;
                resObject = { success: false, error: "Error sending email." };
            } else {
                console.log('Email sent: ' + info.response);
                resObject.success = true;
                console.log(resObject);
            }
            res.send(resObject);
        });
    }
    catch (error) {console.log(error);}
});

app.listen(port, () => console.log("Listening on port " + port));
