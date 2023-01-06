
 const db = require("../db");
 const jwt = require("jsonwebtoken");
 const config = require("../../configs/auth.config");
 const request  = require("supertest");
 const app = require("../../server");
 const User = require("../../models/user.model");

 let token ;
 beforeAll( async ()=>{
 
     token = jwt.sign({id : "vish01"}, config.secret, {
         expiresIn : 120
     });
 
     console.log("Before all test");
     await db.clearDatabase();
     
     await User.create({
         name : "Vishwa",
         userId : "vish01",
         email : "kankvish@gmail.com",
         userType : "ADMIN",
         password : "Welcome1",
         userStatus : "APPROVED"
     });
 });
 

 afterAll( async ()=>{
     console.log("After all the code has been executed");
     await db.closeDatabase();    
 })

 describe("Find all users",  ()=>{
 
     it("find all the users", async () =>{
 
         const res = await request(app).get("/crm/api/v1/users").set("x-access-token", token);
 
 
         //Code for the validation
         expect(res.statusCode).toEqual(200);
         expect(res.body).toEqual(
             expect.arrayContaining([
                 expect.objectContaining({
                     "name" : "Vishwa",
                     "userid" :"vish01",
                     "email" : "kankvish@gmail.com",
                     "userTypes" : "ADMIN",
                     "userStatus" : "APPROVED"
                 })
             ])
         )
 
     })
 
 });
 
 describe ("Find user based in userId", ()=>{
     it("test the endpoint /crm/api/v1/users/:id " , async ()=>{
          //Complete the code inside this.
          
          //Execution of the code
          const res = await request(app).get("/crm/api/v1/users/vish01").set("x-access-token", token);
 
          //Valiation of the code
          expect(res.statusCode).toEqual(200);
         expect(res.body).toEqual(
             expect.arrayContaining([
                 expect.objectContaining({
                     "name" : "Vishwa",
                     "userid" :"vish01",
                     "email" : "kankvish@gmail.com",
                     "userTypes" : "ADMIN",
                     "userStatus" : "APPROVED"
                 })
             ])
         );
 
     });
 })