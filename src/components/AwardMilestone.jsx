import React from 'react';

class AwardMilestone extends React.Component {
  constructor(props) {
    super(props);
    this.state = { bigTitle: true };
  }
  
  onToggle(event) {
    this.setState({
      bigTitle: !this.state.bigTitle
    });
  }

  render() {
    const props = this.props;
    return (
      <div className="am-item" >
        {this.state.bigTitle
        ? <div className="award-milestone" style={{background: props.style}} onClick={this.onToggle.bind(this)} key={props.idx} ><h3>{props.name}</h3></div> 
        : <div className="award-milestone-secondary" onClick={this.onToggle.bind(this)} key={props.idx + 999}><p className="title">{props.name} </p><div className="description">{props.description}</div>
        </div>
        }
      </div>
    )
  }
}

export default AwardMilestone;
