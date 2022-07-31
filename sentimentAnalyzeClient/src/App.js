import './bootstrap.min.css';
import './App.css';
import EmotionTable from './EmotionTable.js';
import React from 'react';
var baseUrl = ".";


class App extends React.Component {
    /*
    We are setting the component as a state named innercomp.
    When this state is accessed, the HTML that is set as the
    value of the state, will be returned. The initial input mode
    is set to text
    */
  state = {innercomp:<textarea rows="4" cols="50" id="textinput"/>,
            mode: "text",
          sentimentOutput:[],
          sentiment:true
        }
  
  /*
  This method returns the component based on what the input mode is.
  If the requested input mode is "text" it returns a textbox with 4 rows.
  If the requested input mode is "url" it returns a textbox with 1 row.
  */
  renderOutput = (input_mode)=>{
    let rows = 1
    let mode = "url"
    //If the input mode is text make it 4 lines
    if(input_mode === "text"){
      mode = "text"
      rows = 10
    }
      this.setState({innercomp:<textarea rows={rows} cols="50" id="textinput"/>,
      mode: mode,
      sentimentOutput:[],
      sentiment:true
      });
  } 
  
  sendForSentimentAnalysis = () => {
    this.setState({sentiment:true});
    let mode = this.state.mode;
      let url = baseUrl+"/" + mode + "/sentiment?"+ mode + "="+document.getElementById("textinput").value;
    console.log(url);

    fetch(url).then((response)=>{
        response.json().then((data)=>{
        this.setState({sentimentOutput:data.polarity});
        console.log(data['polarity']);
        let output = data.polarity;
        let color = "white"
        switch(output) {
          case "positive": color = "green";break;
          case "neutral": color = "yellow";break;
          case "negative": color = "red";break;
          default: color = "black";
        }
        output = <div style={{color:color,fontSize:20}}>{output}</div>
        this.setState({sentimentOutput:output});
      })});
  }

  sendForEmotionAnalysis = () => {

    this.setState({sentiment:false});
    let mode = this.state.mode
    let url = baseUrl+"/" + mode + "/emotion?"+ mode + "="+document.getElementById("textinput").value;

    fetch(url).then((response)=>{
      response.json().then((data)=>{
      this.setState({sentimentOutput:<EmotionTable emotions={data}/>});
  })})  ;
  }
  

  render() {
    return (  
      <div className="App">
      <button className="btn btn-info" onClick={()=>{this.renderOutput('text')}}>Text</button>
        <button className="btn btn-dark"  onClick={()=>{this.renderOutput('url')}}>URL</button>
        <br/><br/>
        {this.state.innercomp}
        <br/>
        <button className="btn-primary" onClick={this.sendForSentimentAnalysis}>Analyze Sentiment</button>
        <button className="btn-primary" onClick={this.sendForEmotionAnalysis}>Analyze Emotion</button>
        <br/>
            {this.state.sentimentOutput}
      </div>
    );
    }
}

export default App;
