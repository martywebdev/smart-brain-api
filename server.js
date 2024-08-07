require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()

////////MIDDLEWARES

// Use built-in middleware to parse JSON request bodies
app.use(express.json());

// Use built-in middleware to parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
    origin: process.env.CORS_ALLOWED_ORIGIN,
    methods: process.env.CORS_METHODS || 'GET,POST,PUT,DELETE',
    allowedHeaders: process.env.CORS_ALLOWED_HEADERS || 'Content-Type,Authorization',
    credentials: true, // Allow credentials
}

app.use(cors(corsOptions))

// sample data
const users = [
    {
        "id": "eaa7",
        "email": "martywebdevelopment@gmail.com",
        "password": "password",
        "name": "Marty"
    },
    {
      "id": "1",
      "email": "Sincere@april.biz",
      "password": "password"
    },
    {
      "id": "2",
      "email": "Shanna@melissa.tv",
      "password": "password"
    },
    
  ]



app.get('/', (req, res) => {
    res.send(users)
})

app.post('/sign-in', (req, res) => {

    if(req.body.email === users[0].email && req.body.password === users[0].password) {
       return res.json(users[0]);
    } 
    
    return res.status(401).json({ message: 'Invalid Login' });
   
})

app.post('/sign-up', (req, res) => {
    const {email, name, password} = req.body

    users.push({
        name,
        email,
        password,
        joined: new Date()
    })

    return res.json(users[users.length - 1])
})

app.get('/profile/:id', (req, res) => {
    const {id} = req.params
    const user = users.filter(user => user.id == id)
    if(user) {
      return  res.json(user)
    }

    return res.status(404).json('no such user')
   
})
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`app is running on port ${PORT}`))