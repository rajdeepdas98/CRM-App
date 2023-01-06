
 const authController  = require("../controllers/auth.controller")
 console.log(require("../middlewares"));
 const { verifySignUp } = require("../middlewares");
 module.exports = (app) =>{
    
     app.post("/crm/api/v1/auth/signup" ,[ verifySignUp.validateSignUpRequestBody], authController.signup);
 
     app.post("/crm/api/v1/auth/signin" , [ verifySignUp.validateSignInRequestBody],authController.signin);
 }