var config = require('config');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var Staff = require('../../models/staff')
const JWT_SECRET = config.get('jwtSecret');
var multer = require('multer');
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

/////////////////////////////////////////////       PARAM OPERATIONS        //////////////////////////////////////////////

exports.staffById = (req, res, next, id)=>{
  Staff.findById(id).exec((err, staff)=>{
      if(err || !staff){
          return res.status(400).json({
              error: "Staff not found"
          });
      }
      req.profile = staff;
      next();
  });
};

/////////////////////////////////////////////        GET OPERATIONS        //////////////////////////////////////////////

exports.viewStaff = (function(req, res) {
  return res.json(req.profile);
});

exports.getAllStaff = (function(req, res){
  var Staff =Staff.find()
  .select("-image")
  .then((staff)=>{
      console.log("staff");
      console.log(staff);
      res.status(200).json(
        staff 
      );
  })
  .catch(err=>console.log(err));
});

exports.staffPhoto = (req, res, next) => {
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
       let Staff = req.profile
       Staff= _.extend(Staff, fields)

       if(files.image){
        Staff.image.data =fs.readFileSync(files.image.path)
        Staff.image.contentType = files.image.type
       }
       Staff.save((err, result)=>{
           if(err){ 
               return res.status(400).json({
                   error: err
               })
           }
           res.json(Staff)
       })
   }) 
});



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////      STAFF USERPROFILE      ///////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * @route   POST routes/userprofile/staff/loginstaff
 * @desc    Login user
 * @access  Public
 */

exports.staffLogin = (async (req, res) => {
    const { email, password } = req.body;
  
    // Simple validation
    if (!email || !password) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }
  
    try {
      // Check for existing user
      const user = await Staff.findOne({ email });
      if (!user) throw Error('Staff Does not exist');
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw Error('Invalid credentials');
  
      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: 3600 });
      if (!token) throw Error('Couldnt sign the token');
  
      res.status(200).json({
          token,
          user: {
          id: user._id,
          email: user.email,
          is_customer_support: user.is_customer_support,
          rest_id: user.rest_id,
          username : user.username,
          email: user.email,
          phonenumber: user.phonenumber,
        }
      });
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
});

/**
 * @route   POST routes/userprofile/staff/registerstaff
 * @desc    Register new user
 * @access  Public
 */

exports.staffRegister = (upload.single('image'),async (req, res) => {
    const { name, username, email, phonenumber, password, rest_id, image } = req.body;
  
    // Simple validation
    if (!name || !username || !email || !phonenumber || !password) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }
  
    try {
      const user= await Staff.findOne({ email });
      if (user) throw Error('Staff already exists');
  
      const salt = await bcrypt.genSalt(10);
      if (!salt) throw Error('Something went wrong with bcrypt');
  
      const hash = await bcrypt.hash(password, salt);
      if (!hash) throw Error('Something went wrong hashing the password');
  
      const newStaff = new Staff({
        name,
        username,
        email,
        phonenumber,
        password: hash,
        rest_id,
        image, 
      });
  
      const savedStaff = await newStaff.save();
      if (!savedStaff) throw Error('Something went wrong saving the user');
  
      const token = jwt.sign({ id: savedStaff._id }, JWT_SECRET, {
          expiresIn: 3600
        });  
  
      res.status(200).json({
          token,
          user: {
          id: savedStaff.id,
          name: savedStaff.name,
          username : savedStaff.username,
          email: savedStaff.email,
          phonenumber: savedStaff.phonenumber,
          rest_id: savedStaff.rest_id,
          image: savedStaff.image,
          is_customer_support: savedStaff.is_customer_support,
        }
      });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
});

/**
 * @route   GET userprofile/staff/staff
 * @desc    Get user data
 * @access  Private
 */

exports.staffProfile = async (req, res) => {
    try{
      Staff.findById(req.user.id)
        .select('-password')
        .then(user => res.json({
          id: user._id,
          name: user.name,
          username : user.username,
          email: user.email,
          phonenumber: user.phonenumber,
          rest_id: user.rest_id,
          image: user.image,
          is_customer_support: user.is_customer_support,
        }));
    }
    catch (e) {
        res.status(400).json({ error: e.message });
      }
};