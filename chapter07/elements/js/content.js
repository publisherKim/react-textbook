class Content extends React.Component {
  constructor(props) {
    super(props);
    this.handleRadio = this.handleRadio.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.state = {
      radioGroup: {
        angular: false,
        react: true,
        polymer: false
      },
      checkboxGroup: {
        node: false,
        react: true,
        express: false,
        mongodb: false
      }
    };
  }
  handleRadio(event) {
    let obj = {};
    obj[event.target.value] = event.target.checked;
    this.setState({ radioGroup: obj });
  }
  handleCheckbox(event) {
    let obj = Object.assign(this.state.checkboxGroup);
    obj[event.target.value] = event.target.checked;
    this.setState({ checkboxGroup: obj });
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
      }),
      React.createElement("input", { type: "checkbox",
        name: "checkboxGroup",
        value: "node",
        checked: this.state.checkboxGroup["node"],
        onChange: this.handleCheckbox
      }),
      React.createElement("input", { type: "checkbox",
        name: "checkboxGroup",
        value: "React",
        checked: this.state.checkboxGroup["React"],
        onChange: this.handleCheckbox
      }),
      React.createElement("input", { type: "checkbox",
        name: "checkboxGroup",
        value: "Express",
        checked: this.state.checkboxGroup["Express"],
        onChange: this.handleCheckbox
      }),
      React.createElement("input", { type: "checkbox",
        name: "checkboxGroup",
        value: "MongoDB",
        checked: this.state.checkboxGroup["MongoDB"],
        onChange: this.handleCheckbox
      })
    );
  }
}