
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Registeruser = require('./model');
const jwt = require('jsonwebtoken');
const middleware = require('./middleware');
const cors = require('cors');

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

app.post('/login', async (req, res) => {
        try {
            const {email, password} = req.body;
            let exist = await Registeruser.findOne({email});
            if (!exist) {
              return res.status(400).send('User Not Found');
            }
            if (exist.password !== password) {
              return res.status(400).send('Invalid credentials');
            }
            let payload = {
              user: {
                id : exist.id
              }
            }
            jwt.sign(payload, 'jwtSecret', {expiresIn:3600000},
              (err, token) => {
                if (err) throw err;
                return res.json({token})
              }
            )
        }
        catch (err) {
          console.log(err);
          return res.status(500).send('Server Error')
        }
   }
)

app.get('/myprofile', middleware, async(req, res) => {
  try {
      let exist = await Registeruser.findById(req.user.id);
      if (!exist) {
        return res.status(400).send('User not found')
      }
      res.json(exist);
  }
  catch(err) {
    console.log(err);
    return res.status(500).send('server error')
  }
})

app.listen(5000, () => {
  console.log('server running.....')
});
