class ClickCounterButton extends React.Component {
  render() {
    return React.createElement(
      "button",
      {
        onClick: this.props.handler,
        className: "btn btn-danger"
      },
      "Increase volume (Current volume is ",
      this.props.counter,
      ")"
    );
  }
}