
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Registeruser = require('./model');

mongoose.connect("mongodb+srv://shahul123:shahul123@mernauth.gjvajxp.mongodb.net/?retryWrites=true&w=majority&appName=mernauth",
  {
    ssl: true, 
    tlsAllowInvalidCertificates: false,
    
  }
).then(
  () => console.log("db connection established")
).catch(
  (err) => console.error('Connection error:', err)
);

app.use(express.json());

app.post('/register', async (req, res) => {
    try {
        const {username, email, password, confirmpassword} = req.body;
        let exist = await Registeruser.findOne({email:email})
        if (exist) {
            return res.status(400).send('User Already Exist')
        }
        if (password !== confirmpassword) {
            return res.status(400).send('Password are not matching')
        }
        let newUser = new Registeruser({
            username,
            email,
            password,
            confirmpassword
        })
        await newUser.save();
        res.status(200).send('Registeruser successfully')
    }
    catch(error) {
        console.log(error)
        return res.status(500).send('Internal server error')
    }
})

app.listen(5000, () => {
  console.log('server running.....')
});
