class Content extends React.Component {
  render() {
    let number = 1
    return (
      <div>
        <Button buttonLabel="start"></Button>
        <Button title={number}></Button>
        <Button></Button>
        <Button email="not-a-valid-email"></Button>
        <Button mail="hi@azat.co"></Button>
      </div>
    )
  }
}