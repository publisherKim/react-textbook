class Note extends React.Component {
  confirmLeave(e) {
    let confirmationMessage = 'Do you really want to close?';
    e.returnValue = confirmationMessage;
    return confirmationMessage;
  }
  componentDidMount() {
    console.log('Attaching confirmLeave event listener for beforeunload');
    window.addEventListener('beforeunload', this.confirmLeave);
  }
  componentWillUnmount() {
    console.log('Removing confirmLeave event listener for beforeunload');
    window.removeEventListener('beforeunload', this.confirmLeave);
  }
  render() {
    console.log('Render');
    return React.createElement(
      'div',
      null,
      React.createElement(
        'p',
        null,
        '\uBD80\uBAA8 \uCEF4\uD3EC\uB10C\uD2B8\uB294 ',
        this.props.secondsLeft,
        '\uCD08 \uB4A4\uC5D0 \uC81C\uAC70\uB41C\uB2E4.'
      ),
      React.createElement('input', { type: 'text' })
    );
  }
}