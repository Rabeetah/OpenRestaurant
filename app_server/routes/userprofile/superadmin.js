var express = require('express');
var router = express.Router();
const authSuperAdminController = require("../../controllers/userprofile/superAdminController");
var authenticate = require('../../../authenticate');


  // /api/superadmin/auth
  router.put("/",authenticate.verifyUser, authenticate.verifyAdmin,authSuperAdminController.loggedinuser);
  router.get("/all", authenticate.verifyUser, authenticate.verifyAdmin ,authSuperAdminController.allusers);
  router.post("/signup",authSuperAdminController.signup);
  router.post("/login",authSuperAdminController.login);
  router.get("/logout",authSuperAdminController.logout);

module.exports = router;
