class Button extends React.Component {
  render() {
    return React.createElement(
      'button',
      { className: 'btn' },
      this.props.buttonLabel
    );
  }
}

Button.defaultProps = { buttonLabel: 'submit' };

Button.propTypes = {
  handler: propTypes.func.isRequired,
  title: propTypes.string,
  email(props, propName, componentName) {
    let emailRegularExpression = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if (!emailRegularExpression.test(props[propName])) {
      return new Error('Email validation failed!');
    }
  }
};