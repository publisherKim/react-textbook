## 6장 React에서 이벤트 다루기
```
  - React에서 DOM 이벤트 다루기
  - React가 지원하지 않는 DOM 이벤트 다루기
  - React와 다른 라이브러리와 통합: jQuery UI 이벤트

  지금까지 살펴본 UI는 사용자 상호작용 없이 그저 데이터를 보여주는 것이 전부였다.
  예를 들어 앞서 만들었던 시계 컴포넌트에서 시간대를 설정하는 등의 사용자 입력을 받는 기능은 없었다.

  정적인 UI를 사용하는 경우는 많지 않다. 
  사용자 조작에 반응 할 수 있는 영리한 UI를 만들어야 하는 경우가 대부분이다.
  클릭이나 드래그 같은 사용자 입력은 어떻게 처리 가능할까?

  이벤트를 다루는 지식은 폼과 폼 요소를 다루는 데도 필요하다.
  리엑트는 특정 이벤트만을 지원하므로 리엑트가 지원하지 않는 이벤트를 다루는 방법도 찾아보자.
```

## 리엑트에서 DOM 이벤트 다루기
```javascript
  /*
  이벤트 핸들러를 정의해서 사용자 조작에 대응 할 수 있는 React 엘리먼트를 만드는 방법을 알아보자.
  JAX로 작성한 엘리먼트에 속성 값으로 이벤트 핸들러(함수 정의)를 정의한다.
  (JSX를 사용하지 않고 createElement()를 이용해서 일반적인 자바스크립트로 작성한 경우에는 속성으로 넘겨줄수 있다.)
  속성으로 사용하는 이벤트 이름은 표준 W3C DOM 이벤트를 onClick, onMouserOver처럼 카멜 표기법으로 작성한다.
    onClick={function() {...}}
    또는
    onClick={() => {}}
  
  예제 코드는 React에서 사용자가 버튼을 클릭했을 때 실행할 이벤트 리스너를 정의하고 있다.
  이벤트 리스너에서 this를 콘솔에 표시하도록 했다.
  여기서 event 객체는 내장 DOM 이벤트 객체를 개선한 것으로, 합성 이벤트(SyntheticEvent)라고 부른다.
    <button onClick={(function(event){
      console.log(this, event)
    }).bind(this)}>
      Save
    </button>
  
  bind()를 이용하면 이벤트 핸들러 함수가 클래스의 인스턴스인 React 엘리먼트에 대한 참조를 유지할 수 있다.
  만약 바인딩하지 않으면 use strict를 선언한 상탱서 this는 null이 된다.
  다음 경우에는 bind(this)로 바인딩하지 않는다.
    - this를 이용해서 해당 클래스를 참조할 필요가 없을 때
    - ES6+ 클래스 대신 예전 방식이 React.createClass()를 사용할 때, 이때는 createClass()가 자동으로 바인딩한다.
    - 화살표 함수(() => {})를 사용할 때

  onClick 이벤트에 대한 이벤트 핸들러를 클래스 메서드로 선언하면 좀 더 깔끔하다(handleSave()라고 이름을 지어보자)
  this와 event의 값을 출력하는 SaveButon 컴포넌트를 살펴보자.
  */
  // 이벤트 핸들러를 클래스 메서드 정의
    class SaveButton extends React.Component {
      handleSave(event) {
        console.log(this, event)
      }
      render() {
        return <button onClick={this.handleSave.bind(this)}>
          Save
        </button>
      }
    }

  /*
    또한, 클래스의 constructor에서 이벤트 핸들러를 클래스에 바인딩할 수도 있다.
    기능적으로는 차이가 없지만, render()에서 같은 메서드를 한 번 이상 사용한다면 
    생성자에서 바인딩하여 중복을 줄일 수 있다.
    SaveButton 컴포넌트의 생성자에서 이벤트 핸들러를 바인딩하면 다음과 같다.
  */
    class SaveButton extends React.Component {
      constructor(props) {
        super(props)
        this.handleSave = this.handleSave.bind(this)
      }
      handleSave(event) {
        console.log(this, event)
      }
      render() {
        return <button onClick={this.handleSave}>
          Save
        </button>
      }
    }
  /*
    이벤트 핸들러를 생성자에서 바인딩하면 중복을 제거할 수 있고, 모든 바인딩을 한 곳에서 작성할 수 있으므로 이 방법을 추천한다.

    표 6-1은 현재 React 버전 15에서 지원하는 이벤트 목록이다.
    리엑트에서 사용하는 다른 속성들과 일관성을 유지하기 위해 이벤트 이름에 카멜 표기법을 사용한다.
    이벤트 분류                                         React가 지원하는 이벤트
    마우스 이벤트                                       onClick, onContextMenu, onDoubleClick, onDrag, onDragEnd
                                                       onDragEnter, onDragExit, onDragLeave, onDragOver, onDragStart,
                                                       onDrop, onMouseDown, onMouseEnter, onMouseLeave
                                                       onMouseMove, onMouseOut, onMouseOver, onMouseUp
    키보드 이벤트                                       onKeyDown, onKeyPress, onKeyUp
    클립보드 이벤트                                     onCopy, onCut, onPaste
    폼 이벤트                                           onChange, onInput, onSubmit, onInvalid
    포커스 이벤트                                       onFocus, onBlur
    터치 이벤트                                         onTouchCancel, onTouchEnd, onTouchMove, onTouchStart
    UI 이벤트                                          onScroll
    휠 이벤트                                          onWheel
    영역선택 이벤트                                     onSelect
    이미지 이벤트                                       onLoad, onError
    애니메이션 이벤트                                   onAnimationStart, onAnimationEnd, onAnimationIteration
    트래지션 이벤트                                     onTransitionEnd
    
    표에서 알수 있듯이, React는 몇 가지 유형의 정규화된 이벤트를 지원한다.
    React가 지원하는 이벤트를 https://developer.mozilla.org/cn-US/docs/Web/Events에 
    정리된 표준 이벤트와 비교해 보면 React가 더 광범위하게 지원한다는 점을 알 수 있다.
    또한, React 팀은 향후에도 계속해서 이벤트를 추가로 지원할 것이다!
    좀더 자세한 정보와 이벤트 이름은 공식 문서(https://reactjs.org/docs/events.html)에서 확인할 수 있다.
  */
```

#### 캡처 및 버블링 단계
```
  리엑트는 명령형이 아니라 선언형 스타일이므로 객체를 조작할 필요가 없고,
  jQuery처럼 $('.btn').click(handleSave) 같은 방식으로 이벤트를 등록하지 않는다.
  대신에 onClick={handleSave}처럼 JSX에 속성으로 이벤트를 선언한다.
  마우스 이벤트를 선언한다면 속성의 이름은 표6-1에 정리된 이벤트 중 하나를 사용한다.
  속성 값에는 이벤트 핸들러를 전달한다.

  예를 들어 마우스오버 이벤트를 정의하려면 다음 예제 코드처럼 onMouseOver를 사용할 수 있다.
  붉은 외곽선이 있는 <div>에 마우스 커서를 옮기면 "mouse is over"라는 문구를 개발자 도구 콘솔에서 확인할 수 있다.

  <div
    style={{border: '1px solid red'}}
    onMouseOver={() => {console.log('mouse is over')}}
  >
    Open DevTools and move your mouse cursor over here
  </div>

  위에서 살펴본 onMouseOver 같은 이벤트 버블링 단계의 이벤트에서 실행된다.
  이미 알고 있겠지만, 버블링이나 타깃 단계에 앞서 캡처 단계가 있다.
  첫 번째는 캡쳐 단계(capture phase)로 window에서 대상 요소까지다.
  다음이 대상 요소에 도착한 대상 단계(target pahse)다.
  그 후 비로소 버블링 단계(bubbling phase)가 되고,
  p180 그림 6-2처럼 이벤트가 트리를 따라 window로 다시 돌아간다.
  그림 6-2 이벤트 전파 단계
                                          window

                                          document

                                          <html>

                                          <body>

                                          <table>

                                          <tbody>
                    <tr>                                            <tr>
          <td>                    <td>                <td>                        <td>
          Shaby                   Aeolian             Over  
          Grove                                       the River,                  Dorian
                                                      Charie
  
  대상 요소와 그 상위 요소에 같은 이벤트가 있을 때 단계 간의 구분이 중요해진다.
  버블링 모드에서는 이벤트가 가장 내부에 있는 대상 요소에서 이벤트를 캡처한 후,
  대상 요소의 부모 요소를 시작으로 외부의 상위 요소로 이벤트가 전파된다.
  캡처 모드에서는 이벤트가 가장 바깥 쪽의 요소에 의해 캡처된 후 내부 요소로 전판된다.

  캡처 단계를 위한 이벤트 리스너를 등록할 때는 이벤트 이름 뒤에 Capture를 추가하여 작성 한다.
  예를 들어 마우스오버 이벤트의 캡처 단계를 처리하려면, onMouseOver라고 쓰는 대신 onMouseOverCaputer로 정의한다.
```