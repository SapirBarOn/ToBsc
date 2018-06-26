const   mongoose = require('mongoose'),
        scholarships = require('./scholarshipData'),
        parser = require('json-parser'),
        http = require('http');
        options = {
            server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
            replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
        };

module.exports={

    getAllScholarships(){
        return scholarships.find();
    },

    filterScholarships(req,response){
        let location= req.body.location,
            origin= req.body.origin,
            volunteering= req.body.volunteering,
            reservist= req.body.reservist,//חייל מילואים
            veteran= req.body.veteran;//חייל משוחרר
        let Iraq='עיראק',
            Ethiopia='אתיופיה',
            Iran='איראן',
            Russia='רוסיה',
            TheDruze='העדה הדרוזית',
            TheArabic='העדה הערבית',
            EdaHaredit='העדה החרדית',
            Yemen='תימן',
            north='צפון',
            South='דרום',
            center='מרכז',
            Samaria='שומרון',
            sharon='שרון',
            Jerusalem='ירושלים';
            yesReservist='כן'
            noReservist='לא',
            yesVeteran='כן',
            noVeteran='לא',
            yesVolunteering='כן',
            noVolunteering='לא'

            if (origin=='עיראק'){
                Ethiopia='';
                Iran='';
                Russia='';
                TheDruze='';
                TheArabic='';
                EdaHaredit='';
                Yemen='';
            }
            else if (origin=='אתיופיה'){
                Iraq='',
                Iran='';
                Russia='';
                TheDruze='';
                TheArabic='';
                EdaHaredit='';
                Yemen='';
            }
            else if (origin=='איראן'){
                Ethiopia='';
                Iraq='',
                Russia='';
                TheDruze='';
                TheArabic='';
                EdaHaredit='';
                Yemen='';
            }
            else if (origin=='רוסיה'){
                Ethiopia='';
                Iran='';
                Iraq='',
                TheDruze='';
                TheArabic='';
                EdaHaredit='';
                Yemen='';
            }
            else if (origin=='העדה הדרוזית'){
                Ethiopia='';
                Iran='';
                Iraq='',
                Russia='';
                TheArabic='';
                EdaHaredit='';
                Yemen='';
            }
            else if (origin=='העדה הערבית'){
                Ethiopia='';
                Iran='';
                Iraq='',
                Russia='';
                TheDruze='';
                EdaHaredit='';
                Yemen='';
            }
            else if (origin=='העדה החרדית'){
                Ethiopia='';
                Iran='';
                Iraq='',
                Russia='';
                TheDruze='';
                TheArabic='';
                Yemen='';
            }
            else if (origin=='תימן'){
                Ethiopia='';
                Iran='';
                Iraq='',
                Russia='';
                TheDruze='';
                TheArabic='';
                EdaHaredit='';
            }
    
            if(location=='צפון'){
                South='';
                center='';
                Samaria='';
                sharon='';
                Jerusalem='';
            }

            else if(location=='דרום'){
                north='';
                center='';
                Samaria='';
                sharon='';
                Jerusalem='';
            }

            else if(location=='מרכז'){
                South='';
                north='';
                Samaria='';
                sharon='';
                Jerusalem='';
            }
            else if(location=='שרון'){
                South='';
                center='';
                Samaria='';
                north='';
                Jerusalem='';
            }

            else if(location=='שומרון'){
                South='';
                center='';
                north='';
                sharon='';
                Jerusalem='';
            }
            else if(location=='ירושלים'){
                South='';
                center='';
                Samaria='';
                sharon='';
                north='';
            }

            if(volunteering=='כן'){
                noVolunteering='';
            }

            else if(volunteering=='לא'){
                yesVolunteering='';
            }

            if(reservist=='כן'){
                noReservist='';
            }

            else if(reservist=='לא'){
                yesReservist='';
            }

            if(veteran=='כן'){
                noVeteran='';
            }
            else if(veteran=='לא'){
                yesVeteran='';
            }

         

            scholarships.find({$and:[
                    { $or : [ { origin : Iraq }, { origin : Ethiopia },{ origin : Iran },{ origin : Russia },
                    { origin : TheDruze },{ origin : TheArabic },{ origin : EdaHaredit },{ origin : Yemen }] },
                    { $or : [ { location : north }, { location : South },
                     { location : center }, { location : Jerusalem }, { location : Samaria }, { location : sharon } ] },
                    { $or : [ { volunteering : noVolunteering }, { volunteering : yesVolunteering } ] },                   
                    { $or : [ { reservist : noReservist }, { reservist : yesReservist } ] }, 
                    { $or : [ { veteran : noVeteran }, { veteran : yesVeteran } ] }, 
                     
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
}
