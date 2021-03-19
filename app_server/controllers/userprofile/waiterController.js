var config = require('config');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var Waiter = require('../../models/waiter')
const JWT_SECRET = config.get('jwtSecret');
var multer = require('multer');
var _ = require('lodash');
var formidable = require('formidable');
const fs = require('fs');
const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, 'uploads/')
    }
});
const upload = multer({ storage: storage }); 

/////////////////////////////////////////////       PARAM OPERATIONS        //////////////////////////////////////////////

exports.WaiterById = (req, res, next, id)=>{
  Waiter.findById(id).exec((err, waiter)=>{
      if(err || !waiter){
          return res.status(400).json({
              error: "Waiter not found"
          });
      }
      req.profile = waiter;
      next();
  });
};

/////////////////////////////////////////////        GET OPERATIONS        //////////////////////////////////////////////

exports.viewWaiter = (function(req, res) {
  return res.json(req.profile);
});

exports.getAllWaiter = (function(req, res){
  var Waiter =Waiter.find()
  .select("-image")
  .then((waiter)=>{
      console.log("waiter");
      console.log(waiter);
      res.status(200).json(
        waiter 
      );
  })
  .catch(err=>console.log(err));
});

exports.waiterPhoto = (req, res, next) => {
  if(req.profile.image.data){
      res.set(("Content-Type" , req.profile.image.contentType));
      return res.send(req.profile.image.data)
  }
  next();
}

/////////////////////////////////////////////        PUT OPERATIONS        //////////////////////////////////////////////

exports.addPhoto = ((req,res,next) =>{
  let form = new formidable.IncomingForm()
   form.keepExtensions = true
   form.parse(req, (err, fields, files)=>{
       console.log("form parsed")
       if(err) {
           return res.status(400).json({
               error: "Photo could not be uploaded"
           })
       }
       console.log("Fids",fields)
       console.log(files)
       let Waiter = req.profile
       Waiter= _.extend(Waiter, fields)

       if(files.image){
        Waiter.image.data =fs.readFileSync(files.image.path)
        Waiter.image.contentType = files.image.type
       }
       Waiter.save((err, result)=>{
           if(err){ 
               return res.status(400).json({
                   error: err
               })
           }
           res.json(Waiter)
       })
   }) 
});



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////      WAITER USERPROFILE      ///////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * @route   POST routes/userprofile/waiter/loginwaiter
 * @desc    Login user
 * @access  Public
 */

exports.waiterLogin = (async (req, res) => {
    const { email, password } = req.body;
  
    // Simple validation
    if (!email || !password) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }
  
    try {
      // Check for existing user
      const user = await Waiter.findOne({ email });
      if (!user) throw Error('Waiter Does not exist');
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw Error('Invalid credentials');
  
      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: 3600 });
      if (!token) throw Error('Couldnt sign the token');
  
      res.status(200).json({
          token,
          user: {
          id: user._id,
          email: user.email,
          rest_id: user.rest_id
        }
      });
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
});

/**
 * @route   POST routes/userprofile/waiter/registerwaiter
 * @desc    Register new user
 * @access  Public
 */

exports.waiterRegister = (upload.single('image'),async (req, res) => {
    const { name, username, email, phonenumber, password, rest_id, image } = req.body;
  
    // Simple validation
    if (!name || !username || !email || !phonenumber || !password) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }
  
    try {
      const user= await Waiter.findOne({ email });
      if (user) throw Error('Waiter already exists');
  
      const salt = await bcrypt.genSalt(10);
      if (!salt) throw Error('Something went wrong with bcrypt');
  
      const hash = await bcrypt.hash(password, salt);
      if (!hash) throw Error('Something went wrong hashing the password');
  
      const newWaiter = new Waiter({
        name,
        username,
        email,
        phonenumber,
        password: hash,
        rest_id,
        image
      });
  
      const savedWaiter = await newWaiter.save();
      if (!savedWaiter) throw Error('Something went wrong saving the user');
  
      const token = jwt.sign({ id: savedWaiter._id }, JWT_SECRET, {
          expiresIn: 3600
        });  
  
      res.status(200).json({
          token,
          user: {
          id: savedWaiter.id,
          name: savedWaiter.name,
          username : savedWaiter.username,
          email: savedWaiter.email,
          phonenumber: savedWaiter.phonenumber,
          rest_id: savedWaiter.rest_id,
          image: savedWaiter.image,
        }
      });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
});

/**
 * @route   GET userprofile/waiter/waiter
 * @desc    Get user data
 * @access  Private
 */

exports.waiterProfile = (async (req, res) => {
    try{
        Waiter.findById(req.user.id)
        .select('-password')
        .then(user => res.json({
          id: user._id,
          name: user.name,
          username : user.username,
          email: user.email,
          phonenumber: user.phonenumber,
          rest_id: user.rest_id
        }));
    }
    catch (e) {
        res.status(400).json({ error: e.message });
      }
});