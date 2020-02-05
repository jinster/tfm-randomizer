import React, { Component } from 'react';
import './App.scss';
import AwardMilestone from './components/AwardMilestone';
import data from './data.json';
import _ from 'lodash';

function shuffle(array) {
  var i = array.length,
      j = 0,
      temp;

  while (i--) {
      j = Math.floor(Math.random() * (i+1));
      temp = array[i];
      array[i] = array[j];
      array[j] = temp;

  }

  return array;
}

function findHighestConflictScore(arr) {
  let newHighScore = 0;
  _.forEach(arr, function(val1) {
    _.forEach(arr, function(val2) {
      if (data.synergies[val1][val2] > newHighScore) {
        newHighScore = data.synergies[val1][val2];
      }
    })
  })
  return newHighScore;
}

function generateMilestonesAndAwards() {

  const milestonesArr = Array(checkVenus() ? 16 : 15).fill().map((x,i)=>i);
  const awardsArr =  Array(checkVenus() ? 16 : 15).fill().map((x,i)=>i + 16);

  let highestConflictScore = 99;
  let array = [];

  while (highestConflictScore >= 5) {
    array = [];
    let tempMiles = [...milestonesArr];
    let tempAwards = [...awardsArr];
  
    tempMiles = shuffle(tempMiles).slice(0, checkVenus() ? 6 : 5);
    tempAwards = shuffle(tempAwards).slice(0, checkVenus() ? 6 : 5);
  
    array = _.concat(tempMiles, tempAwards);
    array = _.sortBy(array);
  
    highestConflictScore = findHighestConflictScore(array);
    console.log(highestConflictScore);
    if (!checkSynergyOpt()) {
      break;
    }
  }

  return array;
}


function checkVenus() {
  return (document.getElementById("includeVenus").checked);
}

function checkSynergyOpt() {
  return (document.getElementById("preventSynergies").checked);
}

function MainMenu(props) {
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
            <p>Prevent high conflict synergies?</p>
            <label className="switch">
              <input id="preventSynergies" type="checkbox" defaultChecked={true}/>
              <span className="slider"></span>
            </label>
          </div>
          <div className="wrapper">
            <button className="randomize-btn" onClick={props.buttonClick}>Randomize!</button>
          </div>
        </div>
      </div>
    );
  }
  else if (props.whichScreen === 'randomizeScreen') {
    const array = generateMilestonesAndAwards();
    const isVenus = checkVenus() ? 6 : 5;
    return (
      <div className="randomize-screen">
        <h2>Milestones</h2>
        <div className="am-list">
          {array.map(function(d, idx){
            if (idx >= isVenus) {
              return null;
            }
            return (
              <AwardMilestone
                name={data.names[d]}
                description={data.description[d]}
                style={data.backgroundColor[d]}
                key={idx}
              />
            )
          })}
        </div>
        <h2>Awards</h2>
        <div className="am-list">
          {array.map(function(d, idx){
              if (idx < isVenus) {
                return null;
              }
              return (
                <AwardMilestone
                  name={data.names[d]}
                  description={data.description[d]}
                  style={data.backgroundColor[d]}
                  key={idx}
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
