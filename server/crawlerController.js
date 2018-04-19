const  Crawler = require("crawler"),
        parser = require('json-parser'),
        express = require('express');
        http = require('http');
        options = {
            server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
            replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
        };
    module.exports={
        getCrawler(req,res){
            var c = new Crawler({
                callback :function(error,res){
                    if(error){
                        console.log(`callback() -> ${error}`);
                        console.log(error)
                        //return res.status(404).send("djktjdktgjfk");
                         return getAnswer(error)
                    }
                    else{
                        return getAnswer(res);
                    }
                    
                }    
            })

            c.queue('https://www.afeka.ac.il/candidate-information/candidate-information-bsc/contact-us');
            function getAnswer(result,error){
                if (error) {
                console.log(`callback() -> ${error}`);
                return res.status(500).json('errr');
                }
                else{
                var $ = result.$; 
                console.log($("title").text());
                return res.status(200).json($('article').children('p+p+p+p+p+p+p').text());
                }
            }
        }
    }