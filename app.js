// demo file from drive :E
const messagebird = require('messagebird')('TokenID');
const path = require('path');
const express = require("express");
const db = require(__dirname + '\\src\\db.js');


const app = express();
const port = 8000; 

app.set('view engine', 'ejs');

const staticPath = path.join(__dirname, '/views');
app.use(express.static(staticPath));
app.use(express.urlencoded({extended: true}));


app.get("/", (req, res)=>{
    res.render('index');
});

app.get("/auth", (req, res)=>{
    res.render('auth', {
        otp_check : '',
        t : '',
        m : ''
    });
});

app.post("/auth", (req, res)=>{
    if(!(req.body.OTP))
    {
        var tick = req.body.ticket;
        var mobile = req.body.phone_no;
        db.query("SELECT * FROM l3 where Ticket_NO = ? AND Phone_No = ?", [tick, mobile], (err, result, field)=>{
            if(err)
                console.log(err);
            else
            {
                if(result.length != 0)
                {
                    console.log(result);
                    var code = Math.floor(100000 + Math.random() * 900000);
                    console.log(code);
                    message();
                    db_update();
                    async function message(){
                    var mbody = code + " is your Verification code. Pls, don't share this with any one.";
                    var params = {
                        'originator': 'OTP',
                        'recipients': [ +919529644134 ],
                        'body': mbody
                    };

                    messagebird.messages.create(params, function (err, response) {
                        if (err) {
                        return console.log(err);
                        }
                        console.log(response);
                    });}
                    
                    async function db_update(){
                        db.query("UPDATE l3 set OTP =? where Ticket_NO = ? AND Phone_No = ?",[code, tick, mobile],(err, result)=>{
                            if(err){
                                console.log(err);
                            }
                            else
                                console.log(result);
                        } );
                    }

                    res.render('auth', {
                        otp_check: 'otp',
                        t : tick,
                        m : mobile
                    });
                }
                else{
                    console.log("* Data Not Found!!");
                    res.render('auth', {
                        otp_check : 'error',
                        t : tick,
                        m : mobile
                    });
                }
            }    
        });
    }
    if(req.body.OTP){
        let CODE = req.body.OTP;
        let tick = req.body.ticket;
        let mobile = req.body.phone_no;
        console.log(CODE, tick, mobile);
        db.query("SELECT OTP FROM l3 where Ticket_No = ? and Phone_No = ?", [tick, mobile], (err, result)=>{
            db_code = result[0].OTP;
            if(db_code == CODE)
            {
                console.log('true');
                res.redirect('/dashboard');
            }
            else
                console.log('false');
        });
    }
});

app.get("/dashboard", (req, res)=>{
    res.render('dashboard');
});

app.listen(port, ()=>{
    console.log(`* Listing on http://127.0.0.1:${port}`);
});
