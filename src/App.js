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

function MainMenu(props) {
  const milestones = shuffle(data.milestones).slice(0, 5);
  const awards = shuffle(data.awards).slice(0, 5);
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
          <button onClick={props.buttonClick}>Randomize!</button>
        </div>
      </div>
    );
  }
  else if (props.whichScreen === 'randomizeScreen') {
    return (
      <div>
          <h1>Awards</h1>
          {awards.map(function(d, idx){
         return (<li key={idx}>{d.name}<br/>{d.description}</li>)
       })}
          <br/><br/>
          <h1>Milestones</h1>
          {milestones.map(function(d, idx){
         return (<li key={idx}>{d.name}<br/>{d.description}<br/></li>)
       })}
        </div>
    );
  }
  else return(null);
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentScreen: 'mainMenu',
      selectedAwards: [],
      selectedMilestones: [],
      awardsFunded: [],
      milestonesReached: [],
      options: []
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
