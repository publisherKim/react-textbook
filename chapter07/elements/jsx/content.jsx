class Content extends React.Component {
  constructor(props) {
    super(props);
    this.handleRadio = this.handleRadio.bind(this)
    this.handleCheckbox = this.handleCheckbox.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this)

    this.state = {
      description: `With the right pattern, applications will be more scalable and easier to maintain.
If you aspire one day to become a Node.js architect (or maybe you're already one and want to extend your knowledge), this presentation is for you.`,
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
      selectedValue: 'node',
      firstName: ''
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
    console.log("select: ", event.target.value, event.target);
    this.setState({ selectedValue: event.target.value })
  }
  handleChange(event) {
    console.log(event.target.value)
  }
  handleFirstNameChange(event) {
    console.log('firstName: ', event.target.value)
    this.setState({ firstName: event.target.value})
  }
  handleInput(event) {
    console.log('onIjnput event: ', event.target.value, event.target.checked)
  }
  handleSubmit() {
    console.log(event.target.value, event.target.checked)
    fetch(this.props['data-url'], {method: 'POST', body: JSON.stringify(this.state)})
      .then((response)=>{return response.json()})
      .then((data)=>{console.log('Submitted: ', data)})
  }

  render() {
    return (
      <from>
        <textarea
          name="description"
          defaultValue={this.state.description}
          onChange={this.handleChange}
        ></textarea>
        <hr />
        <textarea
          name="description1"
          defaultValue={"Pro Express.js is for the reader\nwho wants to quickly get up-to-speed with Express.js, \nthe flexible Node.js framework"}
          onChange={this.handleChange}
        ></textarea>
        <hr />
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
        <hr />
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
        <hr />
        <select
          value={this.state.selectedValue}
          onChange={this.handleSelectChange}
        >
          <option value="ruby">Ruby</option>
          <option value="node">Node</option>
          <option value="python">Python</option>
        </select>
        <hr />
        <input
          type="text"
          onChange={this.handleChange}
          defaultValue="hi@azat.co"
        />
        <hr />
        <h2>input: first name [text]</h2>
        <input type="text" 
          name="first-name" 
          value={this.state.firstName}
          onChange={this.handleFirstNameChange} />
        <hr />
        <h2>input: button</h2>
        <input type="button" defaultValue="Send" onClick={this.handleSubmit} />
        <hr />
        <input type="text" name="title" value="Mr." readOnly />
      </from>
    );
  }
}