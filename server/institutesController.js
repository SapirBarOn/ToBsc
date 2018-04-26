const   mongoose = require('mongoose'),
        Institutes = require('./institutesData'),
        parser = require('json-parser'),
        http = require('http');
        options = {
            server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
            replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
        };

module.exports={

    getAllInstitutes(){
        return Institutes.find();
    },


    filterInstitutes(req,response){
        let location= req.body.location,
            subEng= req.body.subEng,
            dorms= req.body.dorms,
            uniSalary= req.body.uniSalary,
            type= req.body.institute;

            Institutes.find({$and:[
                    {type: type},                  
                    {location: location},
                    {dorms: dorms},
                    {subEng: subEng},
                    {uniSalary: uniSalary}
                ]
 
            },(err,result)=>{
                if(err){
                    console.log ('filter error');
                }

                
                else  {
                    console.log(`filter done`);
                    return response.status(200).json(result);
                }

            });
        }
};