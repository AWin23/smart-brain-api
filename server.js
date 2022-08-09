const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

 const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1', //localhost
      user : 'A.Win', //add your user name for the database 
      port: '', // add your port number here
      password : '', //add your correct password in here
      database : 'smart-brain' //database name
    }
  });



const app = express();

app.use(bodyParser.json());
const database = {
    users: [
        {
            id: '123',
            name: 'John',
            password: 'cookies',
            email: 'john@gmail.com',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Sally',
            password: 'bananes',
            email: 'sally@gmail.com',
            entries: 0,
            joined: new Date()
        }
    ]
}

app.use(cors())
app.use(bodyParser.json());

app.get('/', (req, res)=> { res.send(database.users);})

//Bcrypt generates a hash and stores it(the user password)
app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)} )
app.post('/register',(req, res) => {register.handleRegister(req,res, db, bcrypt) })
app.get('/profile/:id' , (req, res ) => {profile.handleProfileGet(req,res,db)})
app.put('/image', (req, res) => {image.handleImage(req,res,db)})
app.post('/imageurl', (req, res) => {image.handleApiCall(req,res)})



app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
})


// .then(entries => {
//     // If you are using knex.js version 1.0.0 or higher this now 
//     // returns an array of objects. Therefore, the code goes from:
//     // entries[0] --> this used to return the entries
//     // TO
//     // entries[0].entries --> this now returns the entries
//     res.json(entries[0].entries);
//   })


/* 
API Skeleton
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST 
/profile/:userId --> GET = user 
/image --> PUT --> user

*/