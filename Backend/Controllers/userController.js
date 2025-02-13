const jwt = require('jsonwebtoken');
const User = require('../Models/userModel');
const asyncHandler = require('express-async-handler'); 
const bcrypt = require('bcryptjs');
//@desc Register User
//@route Post /api/user/register
//@access public
const generateToken =(User) =>{
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is missing from .env file');
    }
    
    return jwt.sign({ id: User._id, role: User.role }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })

}

const registerUser = asyncHandler(async (req, res) => {
  // Fix: Destructure from req.body instead of res.body
  const { name, email, password, role } = req.body;

  if (!name || !email || !role || !password) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }

  // Fix: Correct variable name `userExists`
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashPassword,
    role,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user),
     
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }

});

//@desc Autenticate user 
//@route Post /api/user/login
//@access public
const loginUser =  asyncHandler(async( req,res)=>{ 
    const{email,password} =req.body

    const user = await User.findOne({email})
    if(user && ( await bcrypt.compare(password, user.password))){
      res.json({
        _id: user.id,
        name: user.name,
        email:user.email,
        token: generateToken(user)
        
      })
    }
    else{
      res.status(400)
      throw new Error('Invalid Credintial')
    }

    res.json({
        message: 'User Logged In'
    })
})
//@desc Get user data
//@route Get /api/user
//@access public
const getUser =  ( req,res)=>{
    const {_id,name,email,role} = req.user
    res.status(200).json({
        _id,
        name,
        email,
        role
    })
    

}
module.exports = {registerUser, loginUser,getUser};