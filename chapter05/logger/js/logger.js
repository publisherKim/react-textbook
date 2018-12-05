class Logger extends React.Component {
  constructor(props) {
    super(props);
    console.log('contructor');
  }
  componentWillMount() {
    console.log('componenwWillMount excute');
  }
  componentDidMount(e) {
    console.log('componentDidMount excute');
    console.log('DOM node: ', ReactDOM.findDOMNode(this));
  }
  componentWillReceiveProps(newProps) {
    console.log('componentWillReceiveProps excute');
    console.log('new props: ', newProps);
  }
  shouldComponentUpdate(newProps, newState) {
    console.log('shouldComponentUpdate excute');
    console.log('new props: ', newProps);
    console.log('new state: ', newState);
    return true;
  }
  componentWillUpdate(newProps, newState) {
    console.log('componentWillUpdate excute');
    console.log('new props: ', newProps);
    console.log('new state: ', newState);
  }
  componentDidUpdate(oldProps, oldState) {
    console.log('componentDidUpdate excute');
    console.log('old props: ', oldProps);
    console.log('old state: ', oldState);
  }
  componentWillUnmount() {
    console.log('componentWillUnmount');
  }
  render() {
    console.log('rendering... Display');
    return React.createElement(
      'div',
      null,
      this.props.time
    );
  }
}