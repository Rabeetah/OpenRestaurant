var config = require('config');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var auth = require('../../../middleware/auth');
var Customer = require('../../models/customer')
const sgMail =require('@sendgrid/mail');
const JWT_SECRET = config.get('jwtSecret');
const CLIENT_URL = config.get('client_url'); 
sgMail.setApiKey('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')

// sgMail.setApiKey('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')

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////      CUSTOMER USERPROFILE      ///////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * @route   POST routes/userprofile/customer/logincustomer
 * @desc    Login user
 * @access  Public
 */

exports.customerLogin = (async (req, res) => {
  const { email, password } = req.body;

  // Simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    // Check for existing user
    const user = await Customer.findOne({ email });
    if (!user) throw Error('Customer Does not exist');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw Error('Invalid credentials');

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '8760d' });
    if (!token) throw Error('Couldnt sign the token');

    res.status(200).json({
        token,
        user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        cart: user.cart
      }
    });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/**
 * @route   POST routes/userprofile/customer/registercustomer
 * @desc    Register new user
 * @access  Public
 */

exports.customerRegister = (async (req, res) => {
  const { name,email, password } = req.body;

  // Simple validation
  if ( !name || !email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    const user= await Customer.findOne({ email });
    if (user) throw Error('Customer already exists');

    const salt = await bcrypt.genSalt(10);
    if (!salt) throw Error('Something went wrong with bcrypt');

    const hash = await bcrypt.hash(password, salt);
    if (!hash) throw Error('Something went wrong hashing the password');

    const newCustomer = new Customer({
    
      email,
      name,

      password: hash
    });

    const savedCustomer = await newCustomer.save();
    if (!savedCustomer) throw Error('Something went wrong saving the user');

    const token = jwt.sign({
      email,
      password,
      name
    },
    "or_mymagickeyforactivation",
    {
      expiresIn:'15m'
    }
    ); 
    
    res.status(200).json({
      token,
      user: {
      _id: savedCustomer.id,
      name: savedCustomer.name,
      email: savedCustomer.email,
    }
  });
      // from:  "contactrabeeta@gmail.com",
// from:  "openrestaurantfyp@gmail.com",
    const emailData={
      from:  "contactopenrestaurant@gmail.com",
      to: email,
      subject:"Account activation link",
      html:`<h1> click to activate </h1>
      <p> ${CLIENT_URL}/customer/registercustomer/${token}</p>
      <hr/>
      <p>This email contains sensitive content</p>
      <p>${CLIENT_URL}</p>`
    }

    
    sgMail.send(emailData).then(sent=> {
      return res.json({
        message:'email has been sent'

      })
      
    }).catch(e=>{
      return 
      res.status(400).json({ error: e.message });
            })
    

    return res.status(200).json({
        token,
        user: {
        _id: savedCustomer.id,
        name: savedCustomer.name,
        email: savedCustomer.email,
        
      },
      message:'email has been sent'

    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

/**
 * @route   GET userprofile/cutsomer/customer
 * @desc    Get user data
 * @access  Private
 */

exports.getCustomer = (async (req, res) => {
    try{
        Customer.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user));
    }
    catch (e) {
        res.status(400).json({ error: e.message });
      }
});

exports.customerRegister = (async (req, res) => {
  const { name,email, password } = req.body;

  // Simple validation
  if ( !name || !email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    const user= await Customer.findOne({ email });
    if (user) throw Error('Customer already exists');

    const salt = await bcrypt.genSalt(10);
    if (!salt) throw Error('Something went wrong with bcrypt');

    const hash = await bcrypt.hash(password, salt);
    if (!hash) throw Error('Something went wrong hashing the password');

    /* const newCustomer = new Customer({
    
      email,
      name,

      password: hash
    });

    const savedCustomer = await newCustomer.save();
    if (!savedCustomer) throw Error('Something went wrong saving the user'); */

    const token = jwt.sign({
      email,
      password,
      name
    },
    "or_mymagickeyforactivation",
    {
      expiresIn:'30m'
    }
    );  
    
    res.status(200).json({
      token,
      /* user: {
      id: savedCustomer.id,
      name: savedCustomer.name,
      email: savedCustomer.email,
    } */
  });
     console.log(token,"llllllll")
    const emailData={
      from:  "contactopenrestaurant@gmail.com",

      to: email,
      subject:"Account activation link",
      html:`<h1> click to activate </h1>
      <p> ${CLIENT_URL}/user/customer/activate-account/${token}</p>
      <hr/>
      <p>This email contains sensitive content</p>
      <p>${CLIENT_URL}</p>`

      
      
      
  
    }

    
    sgMail.send(emailData).then(sent=> {
      return res.json({
        message:'email has been sent'

      })
      
    }).catch(e=>{
      return 
      res.status(400).json({ error: e.message });
            })
    

    return res.status(200).json({
        token,
        user: {
        id: savedCustomer.id,
       
        email: savedCustomer.email,
        
      },
      message:'email has been sent'
    

    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});


//Activation controller
exports.customerActivation = (async (req, res) => {
  const { token } = req.body;

  if (token) {
    //verify if token is valid
    jwt.verify(token, "or_mymagickeyforactivation" , async(err, decoded) => {
      if (err) {
        console.log('Activation error');
        return res.status(401).json({
          errors: 'Expired link. Signup again',
        });
      } else {
        //if valid save to db
        //get name and pw from token 
        const { name, email, password } = jwt.decode(token);

        const salt = await bcrypt.genSalt(10);
        if (!salt) throw Error('Something went wrong with bcrypt');
    
        const hash = await bcrypt.hash(password, salt);
        if (!hash) throw Error('Something went wrong hashing the password');
        const user = new Customer({
          name,
          email,
          password: hash,
        });

        user.save((err, user) => {
          if (err) {
            console.log('Save error', errorHandler(err));
            return res.status(401).json({
              errors: errorHandler(err)
            });
          } else {
            return res.json({
              success: true,
              message: user,
              message: 'Signup success'
            });
          }
        });
      }
    });
  } else {
    return res.json({
      message: 'error happening please try again'
    });
  }
});





// exports.getCustomer = (function(req, res, next) {
//   Customer.findById(req.params.cid).select('-password').exec(function(error, results) {
//       if (error) {
//           return next(error);
//       }
//       // Respond with valid data
//       res.json(results);
//   });
// });