import React, { Component } from 'react';
import './App.scss';
import AwardMilestone from './components/AwardMilestone';
import data from './data.json';

let NAMES = ["TERRAFORMER", "MAYOR", "GARDENER", "BUILDER", "PLANNER",
         "GENERALIST", "SPECIALIST", "ECOLOGIST", "TYCOON", "LEGEND",
         "DIVERSIFIER", "TACTICIAN", "POLAR EXPLORER", "ENERGIZER", "RIM SETTLER",
         "HOVERLORD",
         "LANDLORD", "SCIENTIST", "BANKER", "THERMALIST", "MINER",
         "CELEBRITY", "INDUSTRIALIST", "DESERT SETTLER", "ESTATE DEALER", "BENEFACTOR",
         "CULTIVATOR", "MAGNATE", "SPACE BARON", "EXCENTRIC", "CONTRACTOR",
         "VENUPHILE"]

let SYNERGIES = [
   ["",0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,  1,0,0,1,0,0,0,1,1,9,2,0,0,0,0,0],
   [0,"",3,0,0,0,0,0,0,0,0,0,4,0,0,0,  6,0,0,0,0,0,0,4,4,0,6,0,0,0,0,0],
   [0,0,"",0,0,0,0,1,0,0,0,0,4,0,0,0,  6,0,0,0,0,0,0,4,5,2,9,0,0,0,0,0],
   [0,0,0,"",0,0,0,0,4,0,0,0,0,0,0,0,  0,0,0,0,1,0,1,0,0,0,0,5,0,0,9,0],
   [0,0,0,0,"",0,0,0,0,0,0,0,0,0,0,0,  0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
   [0,0,0,0,0,"",0,0,0,0,0,0,0,0,0,0,  0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
   [0,0,0,0,0,0,"",0,0,0,0,0,0,4,0,0,  0,0,2,1,1,0,1,0,0,0,0,0,0,0,0,0],
   [0,0,0,0,0,0,0,"",2,0,2,0,0,0,0,0,  0,0,0,0,0,0,0,0,0,0,1,1,0,4,0,0],
   [0,0,0,0,0,0,0,0,"",0,1,1,0,0,1,0,  0,2,0,0,0,0,0,0,0,0,0,5,1,3,2,2],
   [0,0,0,0,0,0,0,0,0,"",0,0,0,0,0,0,  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,"",0,0,0,0,0,  0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,"",0,0,0,0,  0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,"",0,0,0,  4,0,0,0,0,0,0,5,2,0,3,0,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,"",0,0,  0,0,0,3,0,0,6,0,0,0,0,0,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,"",0,  0,0,0,0,0,2,0,0,0,0,0,1,3,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,"",  0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,5],

   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  "",0,0,0,0,0,0,7,7,0,8,0,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,"",0,0,0,0,0,0,0,0,0,2,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,"",0,0,0,0,0,0,1,0,0,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,0,"",0,0,0,0,0,0,0,0,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,0,0,"",0,7,0,0,0,0,0,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,0,0,0,"",0,0,0,0,0,1,3,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,0,0,0,0,"",0,0,0,0,0,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,0,0,0,0,0,"",5,1,7,0,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,0,0,0,0,0,0,"",1,8,0,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,0,0,0,0,0,0,0,"",3,0,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,0,0,0,0,0,0,0,0,"",0,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,0,0,0,0,0,0,0,0,0,"",2,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,0,0,0,0,0,0,0,0,0,0,"",0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,0,0,0,0,0,0,0,0,0,0,0,"",0,2],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,0,0,0,0,0,0,0,0,0,0,0,0,"",0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,""]
 ];

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
            <label className="switch">
              <input id="includeVenus" type="checkbox" />
              <span className="slider"></span>
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
            const style = {
              "background": d.backgroundColor
            }
            return (
              <AwardMilestone 
                name={d.name}
                description={d.description}
                style={style}
                key={idx}
              />
            )
          })} 
        </div>
        <h2>Awards</h2>
        <div className="am-list">
          {awards.map(function(d, idx){
          const style = {
              "background": d.backgroundColor
          }
          return (
            <AwardMilestone 
                name={d.name}
                description={d.description}
                style={style}
                key={idx+999}
              />
          )
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
