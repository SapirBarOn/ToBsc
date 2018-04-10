const mongoose = require('mongoose'),
    schema = mongoose.Schema;


    subEngSchema = new schema({
    userID: {type:String, index:1,required:true},
    software: Number,
    chemistry: Number,
    electronic: Number,
    medical: Number,
    management: Number,
    building: Number,
    machine:Number
}, {collection: 'subEngineering'}),


 subEngineering= mongoose.model('subEngineering',subEngSchema);
module.exports=subEngineering;


console.log(`required paths: ${subEngSchema.requiredPaths()}`);
console.log(`indexes: ${JSON.stringify(subEngSchema.indexes())}`);
