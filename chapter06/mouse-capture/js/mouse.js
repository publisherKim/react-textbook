class Mouse extends React.Component {
  render() {
    return React.createElement(
      'div',
      null,
      React.createElement(
        'div',
        {
          style: { border: '1px solid red' },
          onMouseOverCapture: (event => {
            console.log('mouse over on capture event');
            console.dir(event, this);
          }).bind(this),
          onMouseOver: (event => {
            console.log('mouse is over with event');
            console.dir(event);
          }).bind(this)
        },
        'Open DevTools and move your mouse cursor over here \uCEA1\uCC98\uAC00 \uC77C\uC5B4\uB09C\uD6C4 \uB9C8\uC6B0\uC2A4 \uC624\uBC84 \uC774\uBCA4\uD2B8\uAC00 \uBC1C\uC0DD\uD55C\uB2E4.'
      )
    );
  }
}