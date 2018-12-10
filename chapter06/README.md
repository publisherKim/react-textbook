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
```javascript
  /*
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
  */
  // 캡처 이벤트에 이어지는 버블링 이벤트
  class Mouse extends React.Component {
    render() {
      return <div>
        <div
          style={{border: '1px solid red'}}
          onMouseOverCapture={
            ((event) => {
              console.log('mouse over on capture event')
              console.dir(event, this)
            }).bind(this)}
          onMouseOver={
            (event => {
              console.log('mouse over on bubbling event')
              console.dir(event, this)
            }).bind(this)
          }
        >Open DevTools and move your mouse cursor over here</div>
      </div>
    }
  }
  /*
    1 픽셀의 붉은 외곽선이 있는 컨테이너 내부에 텍스트가 입력되어 있고, 여기로 커서를 옮기면 된다.
    각각의 마우스오버 이벤트는 이벤트 객체와 함께 이벤트의 종류를 콘솔에 출력한다.
    (console.dir()의 사용으로 인해 그림 6-3의 개발자 도구에서는 Proxy 아래에 감춰져 있다.)

    당연하지만, 캡처 이벤트가 먼저 출력된다. 이런 동작 원리를 응용해서 이벤트 전파를 중지시키거나 
    이벤트 간의 우선순위를 정할 수 있다.

    이벤트가 UI의 기초이므로, React가 이벤트를 어떻게 구현했는지 이해하는 것은 중요하다.
  */
```

#### React 이벤트 살펴보기
```html
  <!--
  jQuery나 일반적인 자바스크립트에서는 DOM 노드에 직접 이벤트 리스너를 연결하지만, 
  React에서는 다른 방법으로 이벤트를 처리한다. 
  이벤트를 노드에 직저 연결하는 방법은 UI 라이프사이클에서 이벤트를 추가하거나 제거할 때 문제가 생길 수 있다.
  예를 들어 계정 목록을 다룰 때 각 계정을 삭제, 편집하거나 새로운 계정을 목록에 추가하는 상황을 생각해보자.
  각각 고유의 id를 가진 <li> 요소를 계정으로 하는 HTML을 살펴보자.
  -->
  <ul id="account-list">
    <li id="account-1">Account #1</li>
    <li id="account-2">Account #2</li>
    <li id="account-3">Account #3</li>
    <li id="account-4">Account #4</li>
    <li id="account-5">Account #5</li>
    <li id="account-6">Account #6</li>
  </ul>
  <!--
  계정 목록에서 계정의 삭제나 추가가 빈번하게 이뤄진다면, 이벤트를 다루는 것이 복잡해질 것이다.
  더 나은 방법은 부모 요소(account-list)에 하나의 이벤트 리스너를 두고, 버블링되는 이벤트를 처리하는 것이다.
  (이벤트를 하위 요소에서 처리하지 않으면 DOM 트리를 따라 위로 버블링된다. 이벤트 위임 부모에서 관리)
  React는 내부적으로 상위 요소 및 대상 요소에 연결된 이벤트를 매핑에서 추적한다.
  React가 부모 요소(document)에서 대상 요소를 추적할 수 있다.
  -->
  <!--
  p183 그림6-4 DOM 이벤트 발생 / 2~3 상위요소로 버블링 / 4. 일반적인 React 이벤트 리스너(버블링 단계)가
  이벤트를 처리하는 위치. 
  React 이벤트는 최상위(Document)에서 처리된다.
  Document                    →                                                이벤트 핸들러
                              4. 이벤트 핸들러가 이벤트를 처리한다.
  3. 버블링을 거쳐 최상위인
  Document에 전달된 이벤트를
  React 이벤트 리스너가 잡아낸다.      
                                ul (Parent)
  2. 부모 요소로 이벤트 버블링                  li
                                              li
                                              li
                                              li    ← 1. DOM 이벤트(예: 계정 추가)
  
  예제 코드 6.2의 Mouse 컴포넌트를 다시 살펴보면 부모 요소를 통한 이벤트 위임에 대해 알 수 있다.
  Mouse 컴포넌트에는 마우스오버 이벤트를 처리하는 <div> 엘리먼트가 있는데, 여기서 이벤트를 추적해보자.

  Chrome, Firefox의 개발자 도구를 열고, Elements 탭 또는 Inspector(검사기) 탭에서 data-reactroot
  요소를 선택하고(또는 Chrome이나 Firefox의 문맥 메뉴에서 요소 검사를 이용해도 좋다)
  개발자 도구의 콘솔에서 $0를 입력하고 Enter를 누르면 <div>에 접근할 수 있다.
  알아두면 좋은 요령이다.

  신기하게도 DOM 노드인 <div>에는 연결된 이벤트 리스너가 없다.
  그림 6-5에서 $0는 <div>이며, reactroot 요소다. 특정 DOM 노드(<div> 요소)에 연결된 이벤트 리스너를 확인하려면
  개발자 도구 콘솔에서 전역 메서드인 getEventListeners($0)를 실행한다.

  결과는 빈 객체 {}다. React는 reactroot 노드인 <div>에 이벤트 리스너를 연결하지도 않았다.
  <div> 요소에 마우스를 올리면 콘솔에 로그가 출력되는 것을 확인할 수 있다. 이벤트가 정상적으로 처리되고 있는 것이다.
  이벤트 리스너는 어디에 있는 것일까?
  같은 절차를 <div id="content"> 요소나 붉은 외곽선이 있는 <div> 요소(reactroot의 자식)에도 실행해보자.
  콘솔에서 $0로 Elements 탭에서 현재 선택한 요소에 접근할 수 있다.
  새로운 요소를 선택하고 콘솔에 getEventListeners($0)를 실행해보자. 여전히 아무 결과가 없는가?

  그렇다면 콘솔에 다음과 같이 작성해서 document에 연결된 이벤트가 있는지 확인해보자.
    getEventListener(document)
  
  드디어 이벤트 Object {mouseover: Array[1]}를 찾았다. p185 그림 6-6과 같다. 
  React가 이벤트 리스너를 최상위 부모인 document 요소에 연결했다는 것을 알 수 있다. 
  이벤트는 <div> 같은 개별 노드나 data-reactroot 요소에 연결되지 않았다.

  콘솔에서 다음과 같이 실행하면 이 이벤트를 제거할 수 있다.
  document.removeEventListener('mouseover', getEventListeners(document).mouseover[0].listener, false)

  "mouse is over"라는 메시지를 더 이상 확인할 수 없다. document에 연결했던 이벤트 리스너는 이제 사라졋다.
  React가 이벤트를 각 요소가 아닌 document에 연결한다는 점을 확인할 수 있었다.
  이 덕분에 React는 좀 더 빠르게 동작하는데, 특히 목록을 다룰 때 그렇다.
  jQuery에서 개별 요소에 이벤트를 연결하는 점과 비교할 수 있는 부분이다.
  성능을 생각한 React를 칭찬할 수 밖에 없다.

  만약 마우스오버를 다루는 두 엘리먼트처럼 같은 종류의 이벤트를 사용하는 다른 엘리먼트가 있다면, 
  하나의 이벤트에 연결되고 React가 내부적으로 올바른 자식 엘리먼트(대상 엘리먼트)와 매핑하여 처리한다.
  그림 6-7에서도 확인할 수 있다. 이벤트가 시작된 대상 요소에 대한 정보는 이벤트 객체에서 확인할 수 있다.
  cf: p186 그림 6-7 React는 최상위에서 이벤트 리스너를 재사용하므로 
      마우스오버 이벤트를 연결한 엘리먼트가 여러 개 있더라도 각 종류별로 하나의 이벤트 리스너만 사용 하는 것을 확인할 수 있다.
  -->
```

#### React 합성 이벤트 객체 다루기
```javascript
  /*
  브라우저에 따라 W3C 명세(www.w3.org/TR/DOM-Level-3-Events 참조)를 다르게 구현할 수 있다.
  DOM 이벤트를 다룰 때, 이벤트 핸들러에 전달되는 이벤트 객체에 다른 프로퍼티나 메서드가 있을 수도 있다.

  브라우저 간의 차이로 인해 이벤트를 처리하는 코드를 작성할 때 크로스 브라우징 문제를 경험할 수 있다.
  예를 들어 IE8에서 대상 요소를 가져오려면 event.srcElement에 접근하지만, Chrome, Safari, Firefox 브라우저에서는 
  event.target으로 접근한다.

  var target = event.target || event.srcElement
  console.log(target.value)

  당연한 이야기지만, 크로스 브라우징 문제는 10년 전에 비해 많이 나아졌다. 
  그렇다고는 해도 잘 알려지지 않은 브라우저 간의 구현 차이 때문에 명세를 읽고 디버깅을 하는 데 시간을 쓰고 싶어 하는 사람은 없을 것이다.

  크로스 브라우징 문제가 좋지 않은 것은 다른 브라우저에서도 같은 사용자 경험을 제공해야 하기 때문이다.
  일반적으로 브라우저 API의 차이를 처리하기 위해 if/else 문 같은 코드를 더 작성해야 한다.
  서로 다른 브라우저에서 테스트해야 하는 불편함도 있다.
  즉, 크로스 브라우징 문제를 고치거나 우회하는 방법을 찾아내는 것은 CSS 문제, IE8 문제, 
  힙합 안경을 쓴 깐깐한 디자이너를 상대하는 것보다 훨씬 더 골치 아픈 일이다.

  React의 해결책은 브라우저 내장 이벤트를 감싸는 것이다. 
  웹 페이지를 실행하는 브라우저의 구현에 관계없이 이벤트가 W3C 명세를 따르도록 만들었다.
  내부적으로 React는 합성 이벤트(SyntheticEvent)를 위한 특별한 클래스를 사용한다.
  SyntheticEvent 클래스의 인스턴스를 이벤트 핸들러에 전달하는 것이다.
  예를 들어 합성 이벤트 객체에 접근하려면 다음 예제 코드 6.3처럼 이벤트 핸들러 함수에 인자로 event를 추가할 수 있다.
  또한, 그림 6-8처럼 이벤트 객체를 콘솔에서 확인할 수 있다.
  */
  // 합성 이벤트를 받는 이벤트 핸들러
  class Mouse extends React.Component {
    render() {
      return <div>
        <div
          style={{border: '1px solid red'}}
          onMouseOVer={((event) => {  // event 인자를 정의한다.
            console.log('mouse is over with event')
            console.dir(event)    // 합성이벤트 객체에 접근해서 console.dir로 콘솔에 노출하도록 한다.
          })}
        ></div>
      </div>
    }
  }
  /*
    이벤트 핸들러 코드를 컴포넌트 메서드나 독립적인 함수로 옮길 수 있다.
    예를 들어 ES6+/ES2015+ 클래스에 handleMouseOver() 메서드를 생성하고, 
    render()가 반환하는 부분에서 {this.handleMouseOver.bind(this)}로 참조할 수 있다.
    bind()는 메서드에 정확한 this 값을 전달하기 위해 사용된다.
    앞서 예제에서 살펴본 것처럼 화살표 함수를 사용하면 this 바인딩이 자동으로 이뤄진다.
    createClass() 문법을 사용할 때도 자동 바인딩 된다.
    클래스를 사용할 때는 직접 바인딩해야 한다.
    메서드에서 this를 사용하지 않는다면 바인딩을 하지 않고,
    onMouseOver={this.handleMouseOver}라고 작성할 수 있다.

    handleMouseOver()라는 이름은 5장에서 살펴본 라이프사이클 이벤트와 달리 임의로 정한 것이며,
    자기 자신이나 함께 일하는 팀이 이해할 수 있는 이름이라면 규칙을 따를 필요는 없다.
    대부분의 경우, React에서 이벤트 핸들러를 작성할 때는 일반적인 클래스 메서드와 구분하기 위해
    handle을 앞에 붙이고 mouseOver 같은 이벤트 이름을 넣거나, save처럼 수행하는 동작을 이름으로 사용한다.
  */
  // 이벤트 핸들러를 클래스 메서드로 작성하고 render()에서 바인딩 한다.
  class Mouse extends React.Component {
    handleMouseOver(event) {
      console.log('mouse is over with event')
      console.dir(event.target)
    }
    render() {
      return <div>
        <div
          style={{border: '1px solid red'}}
          onMouseOver={this.handleMouseOver.bind(this)}
        >
          Open DevTools and move your mouse cursor over here
        </div>
      </div>
    }
  }
  /*
  이벤트의 프로퍼티와 메서드는 stopPropagation(), preventDefault(), target, currentTarget처럼
  대부분의 브라우저 내장 이벤트와 같다.
  내장 프로퍼티나 메서드를 찾을 수 없을 때는 nativeEvent를 통해서 브라우저의 내장 이벤트에 접근할 수 있다.
    event.nativeEvent
  
  React 버전 15의 합성 이벤트 인터페이스에 포함되어 있는 몇 가지 프로퍼티와 메서드를 살펴보면 다음과 같다.
    - currentTarget: 이벤트를 캡처한 요소의 DOMEventTarget(대상 요소 또는 부모 요소일 수 있다.)
    - target: DOMEventTarget, 이벤트가 발생한 요소
    - nativeEvent: DOMEvent, 바라우저 내장 이벤트 객체
    - preventDefault(): 링크나 폼 전송 버튼처럼 기본 동작을 방지하는 메서드
    - isDefaultPrevented(): 기본 동작이 방지 되었을 때 실행하면 true를 반환한다.
    - stopPropagation(): 이벤트 전파 중단
    - isPropagationStopped(): 이벤트 전파가 중단 되었을 때 실행하면 true를 반환한다.
    - type: 태그명 문자열
    - presist(): 합성 이벤트를 이벤트 폴에서 꺼낸 후 사용자 코드에서 이벤트에 대한 참조를 유지할 수 있도록 한다.
    - isPersistent(): 합성 이벤트를 이벤트 풀에서 꺼낸 경우 실행하면 true를 반환한다.

    이벤트 객체의 target 프로퍼티는 이벤트가 캡처된 곳이 아니라 이벤트가 발생한 DOM 노드로 currentTarget과는 차이가 있다.
    (https://developer.mozilla.org/ko/docs/Web/API/Event/target)

    대부분의 경우 UI를 만들 때는 이벤트 캡처뿐만 아니라 입력상자의 텍스트가 필요한 경우도 있는데, 
    event.target.value로 접근한다.

    이벤트 핸들러가 한 번 실행되고 나면 합성 이벤트는 null이 되어 더 이상 사용할 수 없다.
    그래서 같은 이벤트 핸들러가 실행된 후에 이벤트 객체에 접근하기 위해 전역변수에 담거나 
    콜백함수에서 비동기적으로 사용하려고 생각한 사람도 있을 것이다.
    예를 들면 다음 예제 코드처럼 이벤트 객체에 참조를 전역변수 e에 저장한다고 가정할 경우
  */
  // 합성 이벤트는 이벤트 핸들러 실행 후 null이 된다.
  class Mouse extends React.Component {
    handleMouseOver(event) {
      console.log('mouse is over with event')
      window.e = event // 안티패턴
      console.dir(event.target)
      setTimeout(() => {
        console.table(event.target)
        console.table(window.e.target)
      }, 2345)
    }
    render() {
      return <div>
        <div
          style={{border: '1px solid red'}}
          onMouseOver={this.handleMouseOver.bind(this)}
        >
          Open DevTools and move your mouse cursor over here
        </div>
      </div>
    }
  }
  /*
    React가 합성 이벤트를 재사용하는 것은 성능 때문이다. 경고문구를 통해 확인 가능하다.

    이벤트 핸들러를 실행한 후에도 합성 이벤트를 유지하려면 event.persist() 메서드를 사용하면 된다.
    이 메서드를 실행하면 이벤트 객체가 재사용되지 않으므로 null로 처리되지 않는다.

    React가 내장 이벤트 객체를 크로스 브라우징 목적으로 감싸서 브라우저 이벤트를 합성(또는 정규화)하는 것을 살펴 보았다.
    합성 이벤트 덕분에 모든 브라우저에서 이벤트가 똑같이 작동한다. 
    또한, 대부분의 경우에 event.stopPropagation()과 event.preventDefault()를 포함한 
    모든 내장 메서드를 React 이벤트에서 사용할 수 있다. 그렇지만 만약 내장 이벤트에 접근해야 한다면
    합성 이벤트 객체에서 event.nativeEvent 프로퍼티로 접근할 수 있다. 당연한 이야기지만, 
    내장 이벤트를 직접 다루는 경우에는 크로스 브라우징 문제를 해결해야 할 것이다.
  */
```