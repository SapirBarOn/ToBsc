const   mongoose = require('mongoose'),
        Questions = require('./questionData'),
        //translate  = require('google-translate-api'),
        parser = require('json-parser'),
        http = require('http');

module.exports={

    allQuestion(){
        return Questions.find();
    },

    getQuestionById(req,res){
        console.log(`getId()`);
        console.log(`req.params.idNum -> ${req.params.idNum}`);
        Questions.findOne({
        questionId : req.params.idNum
    }, (err,result)=>{
        if(err || !result){
         //   console.log(`userName not exists -> ${err}`);
            return res.status(500).json(`{id not exists:${err}}`);
        }

        res.json(result.questionData);
    });

    }

};