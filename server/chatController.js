const   mongoose = require('mongoose'),
        Questions = require('./questionData'),
        subEng    = require('./subEngData'),
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

    },

    calculateSubEng(req,res){
        let userId = req.params.userID;
        let answersUser=[];
        for (let ans=0; ans<req.params.answers.length; ans++){
            answersUser[ans]=req.params.answers[ans];
        }
        console.log(userId);
        console.log(answersUser);

        // let userSubEng= new subEng(){
        //     userID : userId,
        //     software:100,
            

        // }

    }

};