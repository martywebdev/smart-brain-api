const bcrypt = require('bcrypt');
const db = require('../../config/db');
const { createResponse } = require('../utils/responseUtil')

const signIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json(createResponse(400, 'Email and password are required'));
  }

  try {
    const user = await db('users').where({ email }).first();

    if (!user) {
      return res.status(401).json(createResponse(401, 'Invalid email or password'));
    }

    const isMatch = await bcrypt.compare(password, user.password);

    // Remove the password field before sending the response
    delete user.password;
    
    if (!isMatch) {
      return res.status(401).json(createResponse(401, 'Invalid email or password'));
    }

    return res.status(200).json(createResponse(200, 'Sign-in successful', user));
  } catch (error) {
    console.error('Error signing in:', error);
    return res.status(500).json(createResponse(500, 'Internal server error'));
  }
};

const signUp = async (req, res) => {
    const { email, name, password } = req.body;
  
    if (!email || !name || !password) {
      return res.status(400).json(createResponse(400, 'Email, name, and password are required'));
    }
  
    try {
      // Check if the email already exists in the database
      const existingUser = await db('users').where({ email }).first();
  
      if (existingUser) {
        return res.status(409).json(createResponse(409, 'Email already in use'));
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Insert the new user
      const [user] = await db('users').insert({
        email,
        name,
        password: hashedPassword,
      }).returning(['id', 'email', 'name']);
  
      return res.status(201).json(createResponse(201, 'User created successfully', user));
    } catch (error) {
      console.error('Error inserting user:', error);
  
      // Check if the error is due to a unique constraint violation (just in case)
      if (error.code === '23505') { // 23505 is the PostgreSQL error code for unique violation
        return res.status(409).json(createResponse(409, 'Email already in use'));
      }
  
      return res.status(500).json(createResponse(500, 'Internal server error'));
    }
  };
  
module.exports = {
  signIn,
  signUp,
};
