class Mouse extends React.Component {
  render() {
    return <div>
      <div
        style={{ border: '1px solid red' }}
        onMouseOverCapture={
          (event => {
            console.log('mouse over on capture event')
            console.dir(event, this)
          }).bind(this)
      }
        onMouseOver={
          ((event) => {
            console.log('mouse is over with event')
            console.dir(event)
          }).bind(this)
        }
      >
        Open DevTools and move your mouse cursor over here
        캡처가 일어난후 마우스 오버 이벤트가 발생한다.
      </div>      
    </div> 
  }
}