import React, { Component } from 'react';

class Award extends Component {
   
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

export default Award;
