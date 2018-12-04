class Clock extends React.Component {
  render() {
    return React.createElement(
      "div",
      null,
      this.state.currentTime
    );
  }
}