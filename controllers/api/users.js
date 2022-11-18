const User = require('../../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

async function create(req, res) {
 try {
  // Add the user to the database
  const user = await User.create(req.body)
  // Create JWT token
  const token = createJWT(user)
  // send token to client
  res.json(token)
 } catch (err) {
  console.log(err);
  res.status(400).json(err)
 }
}

async function login(req, res) {
  console.log(req.body)
  // Baby step...
  try{
    // Find the user in the database
    const user = await User.findOne({ email: req.body.email });
    console.log(user)
    if (!user) throw new Error();
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error();
    res.json( createJWT(user) );
    // send token to client
    // res.json(token)

  } catch (err){
    res.status(400).json(`Bad Credentials`)
  }
}


/*-- Helper Functions --*/
function createJWT(user){
  return jwt.sign({user}, process.env.SECRET, {expiresIn: '24h'})
}

module.exports = {
    create,
    login
}