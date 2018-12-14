class SliderValue extends React.Component {
  constructor(props) {
    super(props);
    this.handleSlide = this.handleSlide.bind(this);
    this.state = { sliderValue: 0 };
  }
  handleSlide(event) {
    console.log('event:::', event);
    this.setState({ sliderValue: event.detail.ui.value });
  }
  componentDidMont() {
    window.addEventListener('slide', this.handleSlide);
  }
  componentWillUnmount() {
    window.removeEventListener('slide', this.handleSlide);
  }
  render() {
    return React.createElement(
      'div',
      { className: '' },
      'Value: ',
      this.state.sliderValue
    );
  }
}