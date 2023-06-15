require('dotenv').config();

const User = require('./models/User');
const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
 
app.use(express.json());
mongoose.connect(process.env.CONNECTION_STRING);

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));
//test
app.get('/test', (req, res) => {
    res.json('test ok');
});

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userDoc = await User.create({ 
            name, 
            email, 
            password: bcrypt.hashSync(password, bcryptSalt)
        });
        res.json(userDoc);
    } catch (err) {
        res.status(422).json(err);
    }   
});

app.listen(4000);