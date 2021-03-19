var multer = require('multer');
var Item = require('../../models/item')
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

exports.itemById = (req, res, next, id)=>{
    Item.findById(id).exec((err, item)=>{
        if(err || !item){
            return res.status(400).json({
                error: "Item not found"
            });
        }
        req.profile = item;
        next();
    });
};

/////////////////////////////////////////////       POST OPERATIONS        //////////////////////////////////////////////

exports.addItem = (upload.single('image'), (req, res, next) => {
    Item.create(req.body)
            .then((item) => {
            console.log('Item has been Added ', item);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(item);
        }, (err) => next(err))
        .catch((err) => next(err));
});

/////////////////////////////////////////////        GET OPERATIONS        //////////////////////////////////////////////

exports.viewItem = (function(req, res) {
    return res.json(req.profile);
});

exports.getAllItems = (function(req, res){
    var item =Item.find()
    .select("-image")
    .then((item)=>{
        console.log("item");
        console.log(item);
        res.status(200).json(
            item 
        ); 
    })
    .catch(err=>console.log(err));
});

exports.getAllItemsForRestaurant = (function(req, res){
    var item =Item.find({rest_id: req.body.rid})
    .select("-image")
    .then((item)=>{
        console.log("item");
        console.log(item);
        res.status(200).json(
            item 
        ); 
    })
    .catch(err=>console.log(err));
});

exports.itemPhoto = (req, res, next) => {
    if(req.profile.image.data){
        res.set(("Content-Type" , req.profile.image.contentType));
        return res.send(req.profile.image.data)
    }
    next();
}

///////////////////////////////////////////        DELETE OPERATIONS        //////////////////////////////////////////////

exports.removeItem = (function(req, res, next) {
    Item.deleteOne({ _id: req.params.id }, function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});

/////////////////////////////////////////////        PUT OPERATIONS        //////////////////////////////////////////////

exports.editItem = (function(req, res, next) {
    Item.findByIdAndUpdate({_id:req.params.eid}, req.body).then(function() {
        Item.findOne({_id:req.params.eid}).then(function(Item){
             res.send(Item);
         });
    });
});

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
         let Item = req.profile
         Item= _.extend(Item, fields)
 
         if(files.image){
             Item.image.data =fs.readFileSync(files.image.path)
             Item.image.contentType = files.image.type
         }
         Item.save((err, result)=>{
             if(err){ 
                 return res.status(400).json({
                     error: err
                 })
             }
             res.json(Item)
         })
     }) 
 });

