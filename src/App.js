import React, { Component } from 'react';
import './App.css';
import data from './data.json';

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function check() {
  return (document.getElementById("includeVenus").checked);
}

function MainMenu(props) {
  var milestones = [];
  var awards = []
  if (props.whichScreen === 'mainMenu') {
    return (
      <div className="App-main-menu">
        <div className="App-header">
         <h1 className="App-title">
           Terraforming Mars
         </h1>
         <h3>
           Milestone and Awards Randomizer
         </h3>
        </div>

        <div className="App-button">
          <div className="wrapper">
            <p>Include Venus Next?</p>
            <label class="switch">
              <input id="includeVenus" type="checkbox" />
              <span class="slider"></span>
            </label>
          </div>
          <div className="wrapper">
            <button onClick={props.buttonClick}>Randomize!</button>
          </div>
        </div>
      </div>
    );
  }
  else if (props.whichScreen === 'randomizeScreen') {
    if (!check()) {
      milestones = shuffle(data.milestones).filter(e => e.isVenus == null).slice(0, 5);
      awards = shuffle(data.awards).filter(e => e.isVenus == null).slice(0, 5);
    }
    else {
      milestones = shuffle(data.milestones).slice(0, 6);
      awards = shuffle(data.awards).slice(0, 6);
    }
    return (
      <div className="randomize-screen">
        <h2>Milestones</h2>
        <div className="am-list">
          {milestones.map(function(d, idx){
          return (<div className="award-milestone"><p className="title">{d.name}</p><div className="description">{d.description}</div></div>)
          })}
        </div>
        <h2>Awards</h2>
        <div className="am-list">
          {awards.map(function(d, idx){
          return (<div className="award-milestone"><p className="title">{d.name}</p><div className="description">{d.description}</div></div>)
          })} 
        </div>         
      </div>
    );
  }
  else return(null);
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentScreen: 'mainMenu'
    }
  }

  randomizeButton = () => {

    this.setState({
      currentScreen: 'randomizeScreen'
    });
  }
    
  render() {
    const screen = this.state.currentScreen;
    return (
      <div className="App">
        <MainMenu 
          whichScreen={screen} 
          buttonClick={this.randomizeButton}
        />
      </div>
    );
  }
}

export default App;
