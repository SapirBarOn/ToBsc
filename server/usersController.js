const   mongoose = require('mongoose'),
        Users = require('./usersData'),
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
                console.log ('error');
                return res.status(500).json(`{email not exists:${err}}`);
            }

            if(req.body.password!==result.password){
                console.log(`password is wrong ()`);
                return res.status(405).json(`password is wrong`);
            }

            else if((req.body.email == "admin@gmail.com" ) && (req.body.password == "admin")){
                console.log(`admin`);
                return res.status(200).json(result);
           
            }

            else  {
                console.log(`login result--->>>${result}`);
                return res.status(200).json(result);
            }
        });
    },


    createUser(req,response){
        let newUser = new user({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password:req.body.password ,
            });

        newUser.save(
            (err) => {
                if (err){
                    console.log('creat error');
                }

               else
                   console.log('user saved');
            });

        response.json(newUser);
    }

};