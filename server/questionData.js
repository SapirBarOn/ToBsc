
const mongoose = require('mongoose'),
    schema = mongoose.Schema;


    questionSchema = new schema({
    questionId: {type: Number, index:1,required:true},
    questionData: String,
}, {collection: 'question'}),


 question= mongoose.model('question',questionSchema);
module.exports=question;


console.log(`required paths: ${questionSchema.requiredPaths()}`);
console.log(`indexes: ${JSON.stringify(questionSchema.indexes())}`);
