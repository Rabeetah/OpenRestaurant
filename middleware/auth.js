var jwt = require('jsonwebtoken');
var config = require('config');

const JWT_SECRET = "or_myjwtsecretkey";

function auth(req, res, next) {
  const token = req.header('x-auth-token');
  console.log('mmmmmmmmmmmmmmmmmmmmmmmmm')
  // Check for token
  if (!token)
    return res.status(401).json({ msg: 'No token, authorizaton denied' });

  try { 
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    // Add user from payload
    req.user = decoded;
    console.log('ghsdgsjdghsgdhsabfdsbhfsjh')
    console.log(req.user);
    next();
  } catch (e) {
    res.status(400).json({ msg: 'Token is not valid' });
  }
};

module.exports = auth;