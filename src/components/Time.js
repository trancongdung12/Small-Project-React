import React, { Component } from 'react';

class Time extends Component {
    constructor(props){
        super(props);
        this.state =  {curTime : new Date()}
    }
    componentDidMount() {
        this.timerID = setInterval(
          () => this.tick(),
          1000
        );
      }
     componentWillUnmount() {
         clearInterval(this.timerID);
     }
     tick() {
        this.setState({
            curTime : new Date()
        });
      }
    render() {
        return (
            <div>   
                <p>Current Time : {this.state.curTime.toLocaleString()}</p>
            </div>
        );
    }
}

export default Time;
