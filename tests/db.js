
 const mongoose = require("mongoose");
 const {MongoMemoryServer} =require("mongodb-memory-server");
 
 let mongod ;

 module.exports.connect = async ()=>{
     if(!mongod){
         mongod = await MongoMemoryServer.create(); //create a running mongo server
         const uri = mongod.getUri();  // getUri() will return the URI of the running mongo server
         const mongooseOpts = {
             useUnifiedTopology : true,
             maxPoolSize : 10
         }
         mongoose.connect(uri, mongooseOpts);  // mongoose is now connected to MongoDB
     }
 }
 
 
 module.exports.closeDatabase = async () => {
     await mongoose.connection.dropDatabase();
     await mongoose.connection.close();
 
     if(mongod){
         await mongod.stop();
     }
 }
 

 module.exports.clearDatabase = () =>{
     const collections = mongoose.connection.collections ;
     for(const key in collections){
         const collection = collections[key];
         collection.deleteMany(); /// delete all the documents from this collection
     }
 }