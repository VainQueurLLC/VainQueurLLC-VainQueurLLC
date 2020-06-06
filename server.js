const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const admin = require('./controllers/admin')
const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'shujaa',
    password : 'dost1234',
    database : 'smart-brain'
  }
});

const app = express();

app.use(cors())
app.use(bodyParser.json());

app.get('/', (req, res)=> { res.send('All Working') })
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/adminsignin', (req, res) => { admin.handleAdminSignin(req, res,db)})
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.post('/profile', (req, res) => { profile.handleProfileGet(req, res, db)})
app.post('/profilename', (req, res) => { profile.handleNameProfileGet(req, res, db)})
app.put('/image', (req, res) => { image.handleImage(req, res, db)})
app.put('/admin', (req, res) => { admin.transferEntries(req, res, db)})
app.post('/showuser', (req, res) => { admin.showUsers(req, res, db)})
app.put('/blockuser', (req, res) => { admin.blockUser(req, res, db)})
app.listen(process.env.PORT || 3001, ()=> {
  console.log('app is running on port 3000');
})
