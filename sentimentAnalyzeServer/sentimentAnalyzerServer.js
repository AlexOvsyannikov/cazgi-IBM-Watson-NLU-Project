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
    console.log(new Date(), req.ip, req.method, req.route, req.query);
    next();
})
textRouter.use((req, res, next) => {
    console.log(new Date(), req.ip, req.method, req.route, req.query);
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
    let apiResponse = await instance.getEmotions(req.query['text']);
    return res.send(apiResponse);
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

