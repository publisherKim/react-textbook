class Content extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.state = {counter: 0}
  }
  handleClick(event) {
    this.setState({counter: ++this.state.counter})
  }
  render() {
    return (
      <div>
        <ClickCounerButon
          counter={this.state.counter}
          handler={this.handleClick}
        ></ClickCounerButon>
      </div>
    )
  }
}