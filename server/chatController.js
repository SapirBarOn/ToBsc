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
       // let answersUser=[];
        console.log(userId);
        console.log(req.params.answers);
        let totalSoftware=100,
            weightSoftware;

        for (let ans=0; ans<req.params.answers.length; ans++){
                Questions.findOne({
                    questionId : 1
                }, (err,result)=>{
                    if(err || !result){
                        return res.status(500).json(`{id not exists:${err}}`);
                    }

                    res.json(result);
                });
                //     Questions.findOne({
                //     questionId : ++ans

                // }, (err,result)=>{
                //     if(err || !result){
                //         return res.status(500).json(`{id not exists:${err}}`);
                //     }
                //     console.log(`questionId= ${questionId}`);

                //     weightSoftware= result.Wsoftware;
                //     console.log(`weightSoftware= ${weightSoftware}`);

                //    //all 
                // });
            
                // totalSoftware= totalSoftware-(weightSoftware*req.params.answers[ans]);
                // //all
        }
// console.log(`totalSoftware= ${totalSoftware}`);

//         let userSubEng = new subEng({
//             userID: userId,
//             software: 0,
//             chemistry: 0,
//             electronic: 0,
//             medical: 0,
//             management: 0,
//             building: 0,
//             machine:0
//             });

//         userSubEng.save(
//             (err) => {
//                 if (err){
//                     console.log('creat error');                      
//                 }

//                else
//                    console.log('user saved');
//             });

//         res.json(totalSoftware);

    }

};