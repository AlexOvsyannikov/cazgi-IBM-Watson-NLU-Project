const express = require('express');
const app = new express();
const axios = require('axios').default;

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

urlRouter.use((req, res, next) =>{
    console.log(new Date(), req.ip, req.method, req.baseUrl, req.query);
    next();
})
textRouter.use((req, res, next) => {
    console.log(new Date(), req.ip, req.method, req.baseUrl, req.query);
    next();
})
/*Uncomment the following lines to loan the environment 
variables that you set up in the .env file*/
const dotenv = require('dotenv');
dotenv.config();

const api_key = process.env.API_KEY;
const api_url = process.env.API_URL;

class apiInstance {
    constructor(host) {
        this.host = host;
    }

    async getEmotions(text) {
        let response = await axios.postForm(this.host+'/emotion', {text: text, key: api_key});
        return response.data;
    }

    async getSentiment(text){
        let response = await axios.postForm(this.host+'/sentiment', {text: text, key: api_key});
        return response.data;
    }
}

function getInstance(){
    return new apiInstance(api_url);
}

var instance = getInstance();

//The default endpoint for the webserver
app.get("/",(req,res)=>{
    res.render('index.html');
  });

//The endpoint for the webserver ending with /url/emotion
urlRouter.get("/emotion", async (req, res) => {
    try{
        let apiResponse = await instance.getEmotions(req.query['url']);
        return res.send(apiResponse);
    }
    catch (err){
        console.log(err)
        return res.status(500).send('Something went wrong')
    }
});

//The endpoint for the webserver ending with /url/sentiment
urlRouter.get("/sentiment", async (req, res) => {
    try{
        let apiResponse = await instance.getSentiment(req.query['url']);
        return res.send(apiResponse);
    }
    catch (err){
        console.log(err)
        return res.status(500).send('Something went wrong')
    }
});

//The endpoint for the webserver ending with /text/emotion
textRouter.get("/emotion", async (req, res) => {
    try{
        let apiResponse = await instance.getEmotions(req.query['text']);
        return res.send(apiResponse);
    }
    catch (err){
        console.log(err)
        return res.status(500).send('Something went wrong')
    }
});

textRouter.get("/sentiment", async (req, res) => {
    try{
        let apiResponse = await instance.getSentiment(req.query['text']);
        return res.send(apiResponse);
    }
    catch (err){
        console.log(err)
        return res.status(500).send('Something went wrong')
    }
});

let server = app.listen(process.env.PORT || 80, () => {
    console.log('Listening', server.address().port)
})

