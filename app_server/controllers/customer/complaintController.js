var Complain = require('../../models/complain')
const sgMail =require('@sendgrid/mail');
sgMail.setApiKey('key')

exports.complainRegister = (async (req, res) => {
    const { name, email, subject, complain, customerid} = req.body;
  
    try {
  
      const newComplain = new Complain({
        subject,
        email,
        name,
        complain,
        customerid,
      });
  
      const savedComplain = await newComplain.save();
      if (!savedComplain) throw Error('Something went wrong saving the user');
      
    //   res.status(200).json({
    //     user: {
    //     customerid: savedComplain.customerid,
    //     name: savedComplain.name,
    //     email: savedComplain.email,
    //     subject: savedComplain.subject,
    //     complain: savedComplain.complain
    //   }
    // });
  
      const emailData={
        from:  "email",
  
        to: email,
        subject:"Your Complaint Feedback",
        html:`<p>THANKYOU FOR REACHING US.</p>
        <p> Your Complain has been registered. We will get back to you soon.</p>
        <p> Regards, </p>
        <p> Open Restaurant Support Team</p>`  
      }
  
      
      sgMail.send(emailData).then(sent=> {
        return res.status(200).json({
          user: {
            customerid: savedComplain.customerid,
            name: savedComplain.name,
            email: savedComplain.email,
            subject: savedComplain.subject,
            complain: savedComplain.complain
        },
        message:'YOUR COMPLAIN HAS BEEN REGISTERED. CHECK YOUR EMAIL.'
  
      });
        
      }).catch((e)=>{
        res.status(400).json({ error: e.message });
        })
      
  
      
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  });

  exports.viewComplains = (function(req, res, next) {
    Complain.find().exec(function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});
  