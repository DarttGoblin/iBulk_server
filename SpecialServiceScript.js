const nodemailer = require("nodemailer");
const express = require("express");
const cors = require("cors");


const app = express();
const port = 9069;
var myPassword = "oriolukxhzzakbrq";

app.use(express.json())
app.use(express.text())
app.use(cors({origin: "*"}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.post("/", (req, res) => {
    var userSpecialService = req.body.specialTextAreaValue; 
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
        subject: 'iBulk Special Request',
        html: 
            `
                <div style="background-color: #f4f4f4; padding: 20px; border-radius: 10px; font-family: Arial, sans-serif; color: #333;">
                    <h2 style="color: black;">iBulk Special Request</h2>
                    <p style="font-size: 16px; margin-bottom: 20px;"><strong>Special Request:</strong><br> ${userSpecialService}</p>
                </div>
            `
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
