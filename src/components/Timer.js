import React from "react";

function formatTime(seconds) {
  if (seconds < 60) {
    return `${seconds} secs`;
  } else if (seconds >= 60 && seconds <= 3600) {
    const minutes = Math.trunc(seconds / 60);
    seconds = seconds % 60;
    return `${minutes} min ${seconds} sec`;
  } else {
    return `${Math.trunc(seconds / 3600)} hr ${seconds % 3600} min`;
  }
}

class Timer extends React.Component {
  constructor() {
    super();
    this.state = {
      initialTime: Date.now(),
      timer: Date.now(),
    };
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    this.timerId = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  tick() {
    let haveWon = this.props.haveWon;
    if (haveWon) clearInterval(this.timerId);
    this.setState({
      timer: Date.now(),
    });
  }

  render() {
    return (
      <>
        <span>{this.props.haveWon && "Have Completed in "}</span>
        {formatTime(
          Math.trunc((this.state.timer - this.state.initialTime) / 1000)
        )}
      </>
    );
  }
}

export default Timer;
