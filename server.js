const express = require('express')
const app = express()
const db = require('./config/db.js')
const cors = require('./config/cors.js');
const bcrypt = require('bcrypt')
const { createResponse } = require('./utils/responseUtil');

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors)


app.get('/', async (req, res) => {
  res.send('its working')
})

app.post('/sign-in', async(req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json(createResponse(400, 'Email and password are required'));
  }

  try {
    // Fetch the user by email
    const user = await db('users').where({ email }).first();

    // If user is not found
    if (!user) {
      return res.status(401).json(createResponse(401, 'Invalid email or password'));
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);

    // If password does not match
    if (!isMatch) {
      return res.status(401).json(createResponse(401, 'Invalid email or password'));
    }

    // Assuming you generate a token or session here
    // const token = generateToken(user); // Replace with your token generation logic
    return res.status(200).json(createResponse(200, 'Sign-in successful', user)); // or { token }
  } catch (error) {
    console.error('Error signing in:', error);
    return res.status(500).json(createResponse(500, 'Internal server error'));
  }
})

app.post('/sign-up', async(req, res) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    return res.status(400).json(createResponse(400, 'Email, name, and password are required'));
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [user] = await db('users').insert({
      email: email,
      name: name,
      password: hashedPassword,
    }).returning('*');

    return res.status(201).json(createResponse(201, 'User created successfully', user));
  } catch (error) {
    console.error('Error inserting user:', error);
    return res.status(500).json(createResponse(500, 'Internal server error'));
  }
})




const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`app is running on port ${PORT}`))