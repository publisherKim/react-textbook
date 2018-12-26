class Content extends React.Component {
  constructor(props) {
    super(props)
    this.submit = this.submit.bind(this)
    this.prompt = 'please enter your email to win $1,000,000'
  }
  submit(event) {
    let emailAddress = this.refs.emailAddress
    let comments = this.refs.comments
    console.log(ReactDOM.findDOMNode(emailAddress).value)
    console.log(ReactDOM.findDOMNOde(comments).value)
  }
  render() {
    return (
      <div className="well">
        <p>{this.prompt}</p>
        <div className="form-group">
          Email: <input ref="emailAddress" className="form-control" type="text" placeholder="hi@azat.co" />
        </div>
        <div className="form-group">
          Comments: <textarea ref="comments" className="from-control" placeholder="I like your website" />
        </div>
        <div className="form-group">
          <a className="btn btn-primary" value="submit" onClick={this.submit}>Submit</a>
        </div>
      </div>
    )
  }
}