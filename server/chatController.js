const   mongoose = require('mongoose'),
        questions = require('./questionData'),
        subEng    = require('./subEngData'),
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

    getWeightsById(req,res){
        questions.findOne({
        questionId : req.params.idQus
            }, (err,result)=>{
                if(err || !result){
                    return res.status(500);
                    console.log(`id not exists`);
               }
                res.json([result.Wsoftware,result.Wchemistry,result.Welectronic,result.Wmedical,result.Wmanagement,result.Wbuilding,result.Wmachine]);
            });
    },

    calculateSubEng(req,res){
        let userId = req.params.userID;
        let num=1;
        let totalSoftware=100,
            totalChemistry=100,
            totalElectronic=100,
            totalMedical=100,
            totalManagement=100,
            totalBuilding=100,
            totalMachine=100;

        let answersUser=[];
        for (let i=0; i<req.params.answers.length; i++){
            answersUser[i]=req.params.answers[i];
        }
        console.log(userId);
        console.log(answersUser);

        for (let j=0; j<req.params.answers.length; j++){
            totalSoftware=totalSoftware-(req.params.softwareArr[j]*answersUser[j]);
            totalChemistry=totalChemistry-(req.params.chemistryArr[j]*answersUser[j]);
            totalElectronic=totalElectronic-(req.params.electronicArr[j]*answersUser[j]);
            totalMedical=totalMedical-(req.params.medicalArr[j]*answersUser[j]);
            totalManagement=totalManagement-(req.params.managementArr[j]*answersUser[j]);
            totalBuilding=totalBuilding-(req.params.buildingArr[j]*answersUser[j]);
            totalMachine=totalMachine-(req.params.machineArr[j]*answersUser[j]);
        }
            let userSubEng = new subEng({
            userID: userId,
            software: totalSoftware,
            chemistry: totalChemistry,
            electronic: totalElectronic,
            medical: totalMedical,
            management: totalManagement,
            building: totalBuilding,
            machine:totalMachine
            });

            userSubEng.save(
                (err) => {
                    if (err){
                        console.log('creat error');                      
                    }

                    else
                       console.log('user saved');
                            res.json('save');
                    });

    }

};