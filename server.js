require('dotenv').config();

const express = require('express');
const app = express();

const Person = require('./models/Person')
const db = require('./db')
const passport = require('./auth')



const PORT = process.env.PORT || 9000

app.use(passport.initialize());
const localauthmiddleware = passport.authenticate('local', {session: false})



const bodyParser = require('body-parser');

app.use(bodyParser.json());


// middleware

const login = (req, res, next) =>{
        const currentDate = new Date();
        console.log(currentDate.toDateString());
            next()
}


app.get('/', login,  function (req, res) {
    res.send("new hello world")
})

app.post('/person', async (req, res) => {
    try {
        const data = req.body;
        const newPerson = new Person(data);
        const response = await newPerson.save();
        console.log("Data saved");
        res.status(200).json(response);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get('/person', async (req, res) => {
    try {
        const data = await Person.find();
        console.log("Data fetched");
        res.status(200).json(data);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
})

app.get('/person/:workType', async (req, res) => {
    try {
        const workType = req.params.workType;

        if (workType == 'chef' || workType == 'manager' || workType == 'waiter') {
            const response = await Person.find({ work: workType })
            console.log("response fetched")
            res.status(200).json(response);
        }

        else {
            res.status(400).json({ error: "invalid work type" })
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }

    
    })

    

    app.listen(PORT, () => {
        console.log('server  run at 9000')
    
    })




