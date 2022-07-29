const express = require('express');
const app = new express();

/*This tells the server to use the client 
folder for all static resources*/
textRouter = express.Router();
urlRouter = express.Router();


app.use(express.static('client'));
app.use('/url', urlRouter);
app.use('/text', textRouter);
/*This tells the server to allow cross origin references*/
const cors_app = require('cors');
app.use(cors_app());

/*Uncomment the following lines to loan the environment 
variables that you set up in the .env file*/


//The default endpoint for the webserver
app.get("/",(req,res)=>{
    res.render('index.html');
  });

//The endpoint for the webserver ending with /url/emotion
urlRouter.get("/emotion", (req,res) => {

});

//The endpoint for the webserver ending with /url/sentiment
urlRouter.get("/sentiment", (req,res) => {
    return res.send("url sentiment for "+req.query.url);
});

//The endpoint for the webserver ending with /text/emotion
textRouter.get("/emotion", (req,res) => {
    return res.send({"happy":"10","sad":"90"});
});

textRouter.get("/sentiment", (req,res) => {
    return res.send("text sentiment for "+req.query.text);
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

