var multer = require('multer');
var Deal = require('../../models/deal')
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

exports.dealById = (req, res, next, id)=>{
    Deal.findById(id).exec((err, deal)=>{
        if(err || !deal){
            return res.status(400).json({
                error: "Deal not found"
            });
        }
        req.profile = deal;
        next();
    });
};

/////////////////////////////////////////////       POST OPERATIONS        //////////////////////////////////////////////

exports.addDeal = (upload.single('image'), (req, res, next) => {
    Deal.create(req.body)
            .then((deal) => {
            console.log('Deal has been Added ', deal);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(deal);
        }, (err) => next(err))
        .catch((err) => next(err));
});

/////////////////////////////////////////////        GET OPERATIONS        //////////////////////////////////////////////

exports.viewDeal = (function(req, res) {
    return res.json(req.profile);
});

exports.getAllDeals = (function(req, res){
    var deal =Deal.find()
    .select("-image")
    .then((deal)=>{
        console.log("deal");
        console.log(deal);
        res.status(200).json(
            deal 
        );
    })
    .catch(err=>console.log(err));
});

exports.dealPhoto = (req, res, next) => {
    if(req.profile.image.data){
        res.set(("Content-Type" , req.profile.image.contentType));
        return res.send(req.profile.image.data)
    }
    next();
}

///////////////////////////////////////////        DELETE OPERATIONS        //////////////////////////////////////////////

exports.removeDeal = (function(req, res, next) {
    Deal.deleteOne({ _id: req.params.id }, function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});

/////////////////////////////////////////////        PUT OPERATIONS        //////////////////////////////////////////////

exports.editDeal = (function(req, res, next) {
    Deal.findByIdAndUpdate({_id:req.params.did}, req.body).then(function() {
        Deal.findOne({_id:req.params.did}).then(function(Deal){
             res.send(Deal);
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
         let Deal = req.profile
         Deal= _.extend(Deal, fields)
 
         if(files.image){
            Deal.image.data =fs.readFileSync(files.image.path)
            Deal.image.contentType = files.image.type
         }
         Deal.save((err, result)=>{
             if(err){ 
                 return res.status(400).json({
                     error: err
                 })
             }
             res.json(Deal)
         })
     }) 
 });
