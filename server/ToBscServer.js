const   express    = require('express'),
        bodyParser = require('body-parser'),
        userList  = require('./usersController'),
        chatController  = require('./chatController'),
        request    = require('request'),
        app        = express(),
        port       = process.env.PORT || 3000;

let engineeringArray=[];

app.set('port',port);
app.use('/', express.static('./public'));
app.use(
    (req,res,next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

app.get('/', (req, res) => {
   res.sendFile(`${__dirname}/index.html`);
 });

app.get('/getAllData',
   (req,res)=>{
      userList.allusers().then(docs => res.json(docs));
});

app.post('/login', userList.login);

app.get('/checkingUser/:emailInput/:passInput', userList.checkUser);

app.get('/createNewAccount/:firstNameInput/:lastNameInput/:emailInput/:passInput', userList.insertNewUserDataBase);


app.get('/getAllChat',
   (req,res)=>{
      chatController.allQuestion().then(docs => res.json(docs));
});

app.get('/getQuestion/:idNum', chatController.getQuestionById);

app.get('/addEngineering/:userEmail/:engineeringArray', userList.insertEngineering);

app.listen(port,
    () => {
        console.log(`listening on port ${port}`);
    });