import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userModel from './Models/User.mjs';
import cors from 'cors';
import bodyParser from 'body-parser';
import session from 'express-session';
import crypto from 'crypto'
import cookieParser from 'cookie-parser';

import jwt from 'jsonwebtoken';
import MongoStore from 'connect-mongo';


dotenv.config();

const app = express();
app.use(cors({
  origin: true,
  credentials: true
}));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());



mongoose.connect(process.env.MDB_URL).then(() =>
  app.listen(5000, () => {
    console.log('server is runnign ')

  })
);


app.get('/', (req, res) => {
  res.send('Root Path ')
})

app.post('/register', (req, res) => {

  const newUser = new userModel(req.body)
  newUser.save()
  res.status(201).json('Created')

})

app.post('/login', async (req, res) => {
  const { userEmail, password } = req.body;
  try {
    const userFound = await userModel.findOne({ userEmail: userEmail })

    //  If we finds user
    if (userFound) {

      if (userFound.password === password) {

        const payload = { id: userFound._id };
        const secret = process.env.JWT_SECRET;

        const token = jwt.sign(payload, 'secret', {
          expiresIn: '30min'
        });

        console.log(token)

        res.cookie('rememberToken', token, { expires: new Date(Date.now() + 1800000), httpOnly: true });  // 1800000 is 1800000 millisec

        res.status(200).json('Logged in ')




      }

    } else {
      res.status(404).json('Not Found ')
    }


  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }


})

const verifyToken = (req, res, next) => {

  // ------------ verify without cookie 
  //   const authheader = req.headers['authorization'];
  //   const token = authheader.split(' ')[1]
  //   console.log(token)

  //  jwt.verify(String(token),'secret', (err, data)=>{
  //     if(err){
  //       return res.json('Wrong Toekn ')
  //     }
  //     console.log(data)
  //     const userID = data.id;
  //     req.id = userID;
  //  } )

  //   verify with cookie 

  const cookie = req.cookies;
  const token = cookie.rememberToken

  if (!token) {
    return res.status(400).json('No Token Found ')
  }

  jwt.verify(String(token), 'secret', (err, data) => {
    if (err) {
      return res.json('Wrong Toekn ')
    }

    const userID = data.id;
    req.id = userID;
  })




  next()
};


const getUser = async (req, res, next) => {
  const id = req.id;
  let user;

  try {
    user = await userModel.findById(id, "-password")
    console.log(user)
    res.status(200).json('Yes you have got it ')
  } catch (err) {
    return new Error(err)
  }
}



app.get('/alldaat', verifyToken, getUser, (req, res) => {
  // // Access the cookie using req.cookies
  // const myCookie = req.cookies.jwToken;
  // const decoded = jwt.verify(token, process.env.JWT_SECRET);
  // console.log(decoded)
  // res.json(myCookie)
  // // Handle the request
});


app.get('/Logout', verifyToken, (req, res) => {
  const cookie = req.cookies;
  const token = cookie.rememberToken

  console.log(token)
  jwt.verify(String(token), 'secret', (err, data) => {
    if (err) {
      return res.status(403).json('Wrong Toekn ')
    }

    res.clearCookie(`rememberToken`);
    req.cookies[`rememberToken`] = '';
    return res.status(200).json('Successfully Logged out ')

  })
})
