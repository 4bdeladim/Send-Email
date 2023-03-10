import express from "express"
import nodemailer from "nodemailer"
import bodyParser from "body-parser"
import dotenv from "dotenv"

dotenv.config()
const app = express()
const port = 9999 || process.env.PORT

app.use(express.static("static"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.post('/sendEmail', (req, res) => {
    try {
        const { message } = req.body 
        const mailTransporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });
         
        let mailDetails = {
            from: process.env.EMAIL,
            to: 'benabdeladim7@gmail.com',
            subject: 'Hi Mohammed Ali',
            text: message
        };
         
        mailTransporter.sendMail(mailDetails, function(err, data) {
            if(err) {
                res.status(404).json('Error Occurs');
            } else {
                res.status(200).json('Email sent successfully');
            }
        });
    } catch (error) {
        res.status(500).json("Something went wrong")
    }
})
app.listen(port)