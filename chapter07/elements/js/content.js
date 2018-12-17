class Content extends React.Component {
  constructor(props) {
    super(props);
    this.handleRadio = this.handleRadio.bind(this);
    this.state = {
      radioGroup: {
        angular: false,
        react: true,
        polymer: false
      }
    };
  }
  handleRadio(event) {
    let obj = {};
    obj[event.target.value] = event.target.checked;
    this.setState({ radioGroup: obj });
  }
  render() {
    return React.createElement(
      "from",
      null,
      React.createElement("input", {
        type: "radio",
        name: "radioGroup",
        value: "angular",
        checked: this.state.radioGroup["angular"],
        onChange: this.handleRadio
      }),
      React.createElement("input", {
        type: "radio",
        name: "radioGroup",
        value: "react",
        checked: this.state.radioGroup["react"],
        onChange: this.handleRadio
      }),
      React.createElement("input", {
        type: "radio",
        name: "radioGroup",
        value: "polymer",
        checked: this.state.radioGroup["polymer"],
        onChange: this.handleRadio
      })
    );
  }
}