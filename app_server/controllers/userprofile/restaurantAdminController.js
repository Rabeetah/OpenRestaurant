var config = require('config');
var bcrypt = require('bcrypt');
var multer = require('multer');
var jwt = require('jsonwebtoken');
var auth = require('../../../middleware/auth');
var _ = require('lodash');
var formidable = require('formidable');
const fs = require('fs');
const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, 'uploads/')
    }
});
const upload = multer({ storage: storage }); 
var Restaurantadmin = require('../../models/restaurant_admin')
const JWT_SECRET = config.get('jwtSecret');

/////////////////////////////////////////////       PARAM OPERATIONS        //////////////////////////////////////////////

exports.restaurantAdminById = (req, res, next, id)=>{
  Restaurantadmin.findById(id).exec((err, restaurantAmin)=>{
      if(err || !restaurantAmin){
          return res.status(400).json({
              error: "Restaurantadmin not found"
          });
      }
      req.profile = restaurantAmin;
      next();
  });
};

/////////////////////////////////////////////        GET OPERATIONS        //////////////////////////////////////////////

exports.viewRestaurantAdmin = (function(req, res) {
  return res.json(req.profile);
});

exports.getAllRestaurantAdmin = (function(req, res){
  var restaurantAmdin =RestaurantAdmin.find()
  .select("-image")
  .then((restaurantAmdin)=>{
      console.log("restaurantAmdin");
      console.log(restaurantAmdin);
      res.status(200).json(
        restaurantAmdin 
      );
  })
  .catch(err=>console.log(err));
});

exports.restaurantAdminPhoto = (req, res, next) => {
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
       let RestaurantAdmin = req.profile
       RestaurantAdmin= _.extend(RestaurantAdmin, fields)

       if(files.image){
        RestaurantAdmin.image.data =fs.readFileSync(files.image.path)
        RestaurantAdmin.image.contentType = files.image.type
       }
       RestaurantAdmin.save((err, result)=>{
           if(err){ 
               return res.status(400).json({
                   error: err
               })
           }
           res.json(RestaurantAdmin)
       })
   }) 
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////      RESTAURANT ADMIN USERPROFILE      /////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * @route   POST routes/userprofile/restaurantadmin/loginrestaurantadmin
 * @desc    Login user
 * @access  Public
 */

exports.restaurantAdminLogin = (async (req, res) => {
    const { email, password } = req.body;
  
    // Simple validation
    if (!email || !password) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }
  
    try {
      // Check for existing user
      const user = await Restaurantadmin.findOne({ email });
      if (!user) throw Error('Restaurant Admin Does not exist');
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw Error('Invalid credentials');
  
      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: 3600 });
      if (!token) throw Error('Couldnt sign the token');
  
      res.status(200).json({
          token,
          user: {
          id: user._id,
          email: user.email,
          name:user.name,
          username: user.username,
          phonenumber: user.phonenumber
        }
      });
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
});

/**
 * @route   POST routes/userprofile/restaurantadmin/registerrestaurantadmin
 * @desc    Register new user
 * @access  Public
 */

exports.restaurantAdminRegister = (upload.single('image'), async (req, res) => {
    const { name, username, email, phonenumber, password, image } = req.body;
  
    // Simple validation
    if (!name || !username || !email || !phonenumber || !password) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }
  
    try {
      const user= await Restaurantadmin.findOne({ email });
      if (user) throw Error('Restaurant Admin already exists');
  
      const salt = await bcrypt.genSalt(10);
      if (!salt) throw Error('Something went wrong with bcrypt');
  
      const hash = await bcrypt.hash(password, salt);
      if (!hash) throw Error('Something went wrong hashing the password');
  
      const newRestaurantAdmin = new Restaurantadmin({
        name,
        username,
        email,
        phonenumber,
        password: hash, 
        image
      });
  
      const savedRestaurantAdmin = await newRestaurantAdmin.save();
      if (!savedRestaurantAdmin) throw Error('Something went wrong saving the user');
  
      const token = jwt.sign({ id: savedRestaurantAdmin._id }, JWT_SECRET, {
          expiresIn: 3600
        });  
  
      res.status(200).json({
          token,
          user: {
          id: savedRestaurantAdmin.id,
          name: savedRestaurantAdmin.name,
          username : savedRestaurantAdmin.username,
          email: savedRestaurantAdmin.email,
          phonenumber: savedRestaurantAdmin.phonenumber,
          image: savedRestaurantAdmin.image,
        }
      });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
});

/**
 * @route   GET userprofile/restaurantadmin/restaurantadmin
 * @desc    Get user data
 * @access  Private
 */

exports.restaurantAdminProfile = async (req, res) => {
    try{
        Restaurantadmin.findById(req.user.id)
        .select('-password')
        .then(user => res.json({
          id: user._id,
          name: user.name,
          username : user.username,
          email: user.email,
          phonenumber: user.phonenumber
        }));
    }
    catch (e) {
        res.status(400).json({ error: e.message });
      }
};

