const   mongoose = require('mongoose'),
        questions = require('./questionData'),
        subEng    = require('./subEngData'),
        //translate  = require('google-translate-api'),
        parser = require('json-parser'),
        http = require('http');

module.exports={

    allQuestion(){
        return questions.find();
    },

    getQuestionById(req,res){
        console.log(`getId()`);
        console.log(`req.params.idNum -> ${req.params.idNum}`);
        questions.findOne({
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
        for (let i=0; i<req.params.answers.length; i++){
            answersUser[i]=req.params.answers[i];
        }
       // let answersUser=[];
        console.log(userId);
        console.log(answersUser);
        let totalSoftware=0;
        let num=1;

        for (let ans=0; ans<req.params.answers.length; ans++){

                questions.findOne({
                questionId : num
                    }, (err,result)=>{
                        if(err || !result){
                            return res.status(500);
                            console.log(`id not exists`);
                        }
                        console.log(result.Wsoftware);
                        console.log(answersUser[ans]);
                        totalSoftware= totalSoftware+(result.Wsoftware*answersUser[ans]);
                });

                num++;
        }
        console.log(totalSoftware);

        // for (let ans=0; ans<req.params.answers.length; ans++){
               
        //        // console.log(`weightSoftware= ${weightSoftware[ans]}`);

        //         totalSoftware= totalSoftware+(weightSoftware[ans]*req.params.answers[ans]);
        // }

        console.log(`totalSoftware= ${totalSoftware}`);

                let userSubEng = new subEng({
                    userID: userId,
                    software: totalSoftware,
                    chemistry: 0,
                    electronic: 0,
                    medical: 0,
                    management: 0,
                    building: 0,
                    machine:0
                    });

                userSubEng.save(
                    (err) => {
                        if (err){
                            console.log('creat error');                      
                        }

                       else
                           console.log('user saved');
                    });

                res.json(totalSoftware);

    }

};