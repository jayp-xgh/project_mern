require('dotenv').config();

const User = require('./models/User');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = process.env.JWT_SECRET;
 
app.use(express.json());
mongoose.connect(process.env.CONNECTION_STRING);

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));

app.get('/test', (req, res) => {
    res.json('test ok');
});

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userDoc = await User.create({ 
            name, 
            email, 
            password: bcrypt.hashSync(password, bcryptSalt),
        });
        res.json(userDoc);
    } catch (err) {
        res.status(422).json(err);
    }   
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const userDoc = await User.findOne({ email });

    if(userDoc){
        const passOK = bcrypt.compareSync(password, userDoc.password);
        if(passOK){
            jwt.sign({email: userDoc.email, id:userDoc._id},
                jwtSecret, {}, (err, token) => { 
                if(err) throw err;
                res.cookie('token', token).json('pass ok');
            });
        } else {
            res.status(422).json('pass not ok');
        }
    } else{
        res.json('found');
    }
})
app.listen(4000);