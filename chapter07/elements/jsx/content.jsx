class Content extends React.Component {
  constructor(props) {
    super(props);
    this.handleRadio = this.handleRadio.bind(this)
    this.handleCheckbox = this.handleCheckbox.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleChange = this.handleChange.bind(this)
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
      },
      selectedValue: 'node'
    }
  }
  handleRadio(event) {
    let obj = {};
    obj[event.target.value] = event.target.checked;
    this.setState({ radioGroup: obj });
  }
  handleCheckbox(event) {
    let obj = Object.assign(this.state.checkboxGroup)
    obj[event.target.value] = event.target.checked
    this.setState({checkboxGroup: obj})
  }
  handleSelectChange(event) {
    this.setState({ selectedValue: event.target.value })
    console.log(event.target.value, event.target)
  }
  handleChange(event) {
    console.log(event.target.value)
  }
  render() {
    return (
      <from>
        <input
          type="radio"
          name="radioGroup"
          value="angular"
          checked={this.state.radioGroup["angular"]}
          onChange={this.handleRadio}
        />
        <input
          type="radio"
          name="radioGroup"
          value="react"
          checked={this.state.radioGroup["react"]}
          onChange={this.handleRadio}
        />
        <input
          type="radio"
          name="radioGroup"
          value="polymer"
          checked={this.state.radioGroup["polymer"]}
          onChange={this.handleRadio}
        />
        <input type="checkbox" 
          name="checkboxGroup"
          value="node"
          checked={this.state.checkboxGroup["node"]}
          onChange={this.handleCheckbox}
        />
        <input type="checkbox"
          name="checkboxGroup"
          value="React"
          checked={this.state.checkboxGroup["React"]}
          onChange={this.handleCheckbox}
        />
        <input type="checkbox"
          name="checkboxGroup"
          value="Express"
          checked={this.state.checkboxGroup["Express"]}
          onChange={this.handleCheckbox}
        />
        <input type="checkbox"
          name="checkboxGroup"
          value="MongoDB"
          checked={this.state.checkboxGroup["MongoDB"]}
          onChange={this.handleCheckbox}
        />
        <select
          value={this.state.selectedValue}
          onChange={this.handleSelectChange}
        >
          <option value="ruby">Ruby</option>
          <option value="node">Node</option>
          <option value="python">Python</option>
        </select>
        <input
          type="text"
          onChange={this.handleChange}
          defaultValue="hi@azat.co"
        />
      </from>
    );
  }
}