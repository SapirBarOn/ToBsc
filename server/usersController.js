const   mongoose = require('mongoose'),
        Users = require('./usersData'),
        //translate  = require('google-translate-api'),
        parser = require('json-parser'),
        http = require('http');

module.exports={

    allusers(){
        return users.find();
    }, 


    login(req,res){
        console.log(`login()`);
      //  console.log(`req.body.emailInput -> ${req.body.emailInput}`);
        console.log(`req.body.password -> ${req.body.password}`);

    Users.findOne({
        email : req.body.email
    }, (err,result)=>{
        if(err || !result){
         //   console.log(`userName not exists -> ${err}`);
            return res.status(500).json(`{email not exists:${err}}`);
        }

        if(req.body.password!==result.password){
            console.log(`password is wrong ()`);
            return res.status(405).json(`err:password is wrong`);
        }
    });
},

    checkUser(req, res){
        var result='';        
        users.find({},{"_id":0},
            (err,users) => {
                for (let i = 0; i < users.length; i++){
                    if (users[i].email==req.params.emailInput){
                            if (users[i].password==req.params.passInput)
                                result='true';
                            else result='password not correct';
                    }
                    else result='One of detailts are not correct';

                }
                res.json(result);

            });
    },

    insertNewUserDataBase(req,response){
        let firstNameInsert=req.params.firstNameInput,
            lastNameInsert= req.params.lastNameInput,
            newEmail=req.params.emailInput,
            passInsert= req.params.passInput
            newUser = new user({
            firstName: firstNameInsert,
            lastName: lastNameInsert,
            email: newEmail,
            password: passInsert,
            Engineering: null
            }),
            answerUser='data saved';


        newUser.save(
            (err) => {
                if (err){
                    console.log('errorrrr');
                    answerUser='error';                        
                }

               else
                   console.log('saved');
            });

        response.json(answerUser);

    },

    insertEngineering(req,res){
        console.log(`insertEngineering()`);
        console.log(`req.params.engineeringArray -> ${req.params.engineeringArray}`);
        Users.findOne({
        email : req.params.userEmail
    }, (err,result)=>{
        if(err || !result){
         //   console.log(`userName not exists -> ${err}`);
            return res.status(500).json(`{email not exists:${err}}`);
        }

        let arrayLength=req.params.engineeringArray.length;
        for (let e =0; e < arrayLength; e++){
            result.Engineering[e]=req.params.engineeringArray[e];

        }
        res.json('Data saved');
        //result.Engineering = req.params.engineeringArray;
    });    

    }


};