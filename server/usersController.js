const   mongoose = require('mongoose'),
        Users = require('./usersData'),
        consts = require('./consts'),
        parser = require('json-parser'),
        http = require('http');
        options = {
            server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
            replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
        };


module.exports={

    allusers(){
        return Users.find();
    }, 


    login(req,res){
        console.log(`login()`);
        console.log(`req.body.password -> ${req.body.password}`);
        console.log(`req.body.email -> ${req.body.email}`);

        Users.findOne({
            email : req.body.email
        }, (err,result)=>{
            if(err || !result){
                return res.status(500).json(`{email not exists:${err}}`);
            }

            if(req.body.password!==result.password){
                console.log(`password is wrong ()`);
                return res.status(405).json(`err:password is wrong`);
            }

            else if((req.body.email == "admin@gmail.com" ) && (req.body.password == "admin")){
                                console.log(`admin`);

                return res.status(200).json(`admin`);
            }

            else  {
                console.log(`succses`);
                return res.status(200).json(`succses`);
            }
        });
    },


    createUser(req,response){
        let newUser = new user({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password:req.body.password ,
            }),
            answerUser='data saved';


        newUser.save(
            (err) => {
                if (err){
                    console.log('creat error');
                    answerUser='error';                        
                }

               else
                   console.log('user saved');
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