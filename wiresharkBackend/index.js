const express = require("express");
var bodyParser = require('body-parser')
var app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
const {
    spawn
} = require('child_process');

app.post("/submit", (req, res) => {
    // res.send("Hello World!");
    var dataToSend;
    const time = parseInt(req.body.time)
    if(time<15){
        return res.status(400).json("Timeout should be greator than 15")
    }
    // spawn new child process to call the python script
    const python = spawn('python', ['main1.py',time]);
    // collect data from script
    python.stdout.on('data', function (data) {
        console.log('Pipe data from python script ...');
        dataToSend = data.toString();
        console.log(dataToSend);
    });
    // in close event we are sure that stream from child process is closed
    python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        // send data to browser
        if(code!=0){
            res.status(400).send("Python file error")
        }
        console.log(dataToSend)
        res.status(200).send(dataToSend)
    });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
