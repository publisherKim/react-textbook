## React에서 폼 다루기
```
  - 폼과 폼 요소 정의하기
  - 데이터 변경 감지하기
  - 참조(ref)를 이용한 데이터 접근
  - 사용자 입력 데이터 감지를 위한 다른 방법
  - 폼 요소에 기본값 설정하기

  지금까지 이벤트, 상태 객체, 컴포넌트 구성 등 React의 주요 주제, 기능, 개념에 대해 살펴 보았다.
  그러나 사용자 이벤트 처리하는 것 외에 텍스트 입력이나 
  input, textarea, option, 같은 다른 폼 요소를 통한 입력을 처리하는 방법에 대해서는 다루지 않았다.
  폼 요소는 사용자로부터 텍스트 같은 데이터나 클릭 같은 조작을 전달받는 데 사용하므로 웹 개발에서 중요한 부분이다.
```

### React에서 폼을 다루기 위한 권장 방법
```
  일반적인 HTML에서 입력 요소를 다룰 때는 페이지의 DOM이 해당 요소의 값을 DOM 노드에서 관리한다.
  document.getElementById('email').vaule 또는 jQuery 메서드를 사용해서 값에 접근할 수 있다.
  즉, DOM을 저장소로 사용한다.

  React에서 폼 또는 독립적인 텍스트 입력 상자나 버튼 같은 사용자 입력 영역을 다루려면 해결해야 할 문제가 있다.
  React 공식 문서에서는 "React 컴포넌트는 초기화 시점은 물론 어느 시점에든지 뷰의 상태를 표현해야 한다"라고 설명한다.
  React는 선언형 스타일을 사용하여 UI를 묘사함으로써 모든 것을 단순하게 유지한다.
  즉 React는 UI 결과적으로 어떻게 보여야 할지에 대해 묘사한다.

  어떤 부분에서 충돌이 생기는지 눈치챘는가? 전통적인 HTML의 폼 요소는 사용자 입력에 의해 요소의 상태가 변경된다.
  그렇지만 React는 UI를 묘사하기 위해 선언형 스타일을 사용하므로 상태를 적절히 반영하려면 입력이 동적이어야 한다.

  따라서 컴포넌트 상태를 자바스크립트에서 관리하지 않고, 뷰와 동기화하지 않으면 문제가 나타난다.
  내부 상태와 뷰가 다른 경우가 발생할 수 있다.
  React는 변경된 상태를 알 수 없으므로 온갖 문제와 버그에 직면하게 되고, React의 단순한 철학을 무너뜨린다.
  가장 좋은 방법은 React의 render() 메서드를 폼 요소의 데이터를 포함한 실제 DOM에 최대한 밀접하게 유지하는 것이다.

  텍스트 입력 영역을 다루는 다음 예제를 살펴보자. 
  React는 컴포넌트의 render()에서 새로운 값을 포함해야 한다.
  따라서 엘리먼트의 값을 새 값으로 설정해야 한다.
  그렇지만 HTML에서 <input> 영역을 구현하면 React는 항상 상태를 실제 DOM에 동기화되도록 유지한다.
  즉, React는 사용자가 값을 바꿀수 없게 한다.

  render() {
    return <input type="text" name="title" value="Mr." />
  }

  이 코드는 상태와 상관없이 항상 같은 뷰이므로 input 영역의 입력 값은 항상 Mr.로 유지된다. 
  그렇지만 입력 영역은 사용자 입력이나 클릭에 따라 변경되어야 한다.
  이 점을 고려할때 값이 동적으로 변경되어야 한다.
  좀 더 나은 방법은 다음과 같이 상태에 따라 입력 값을 갱신하도록 구현하는 것이다.

  render() {
    return <input type="text" name="title" value={this.state.title}>
  }

  그렇지만 상태 값은 무엇일까? React는 사용자가 폼 요소에 무언가 작성한다는 것을 알 수 없다.
  React가 변경을 감지할 수 있도록 onChange에 이벤트 핸들러를 추가해야 한다.

  handleChange(event) {
    this.setState({title: event.target.value})
  }
  render() {
    return <input type="text" name="title" value={this.state.title} onChange={this.handleChange.bind(this)}>
  }

  cf: p212. 그림 7-1 폼 요소를 다루는 올바른 방법 사용자 입력을 이벤트로 전달받아 상태와 뷰를 동기화한다.
                1.입력                                                        2. 이벤트 핸들러에서 변경 감지                
                (뷰에 정의한 현 시점의 엘리먼트)  
  user                    ->                                      뷰                  ->                    모델(상태)                            
                          <-                                                          <-
                4. 뷰갱신                                                     3. 상태에 새로운 값 저장
                                                                              value={this.state.value}
  
  언뜻 보기에는 굉장히 많은 작업이 필요한 것처럼 보이지만, 
  React를 조금 더 사용해본다면 이런 접근 방식에 고마움을 느끼게 된다. 
  (data를 부모에서 변경하면 상속받은 하위 컴포넌트들은 자동으로 리렌더링이 되기때문이다. 써보면 안다.)
  이 방식을 단방향 바인딩이라고 부르는데, 상태가 뷰를 갱신하는 것이 전부이기 때문이다.
  뷰에서 상태를 바꾸는 반대 경우는 없고, 단지 상태가 뷰를 바꾸는 편도 여행이라고 할 수 있다.
  단방향 바인딩을 사용하는 라이브러리의 경우, 상태나 모델을 자동으로 갱신하지 않는다.
  여러 개의 뷰에서 암묵적으로 상태 또는 데이터 모델을 갱신하거나 
  역으로 상태가 뷰를 갱신하는 거대한 규모의 앱을 다룰 때 복잡도를 제거할 수 있다는 것이 단방향 바인딩의 대표적인 이점이다.(그림 7-2 참조)

  단순하다는 것이 항상 적은 양의 코드를 의미하지 않는다. 
  때로는 앞의 경우처럼, 이벤트 핸들러에서 데이터를 받아 뷰에 표시할 상태를 직접 추가 작성해야 하는 경우도 있다.
  그렇지만 이 방식은 복잡한 UI를 다루거나 무수히 많은 뷰와 상태를 가진 단일 페이지 애플리케이션을 만들 때 더욱 유리하다.
  단순하다는 것이 항상 쉬운 것은 아니다.

  반면에 양방향 바인딩은 명시적으로 과정을 구현하지 않아도 뷰에서 상태를 자동으로 갱신한다.
  양방향 바인딩은 Angular 1의 작동 방식이기도 하다. 
  흥미롭게 Angular 2에서는 React의 단방향 바인딩 개념을 가져와서 기본값으로 설정했다.
  (양방향 바인딩을 명시적인 방법으로 사용할 수도 있다).

  이런 이유로 폼을 다룰 때 권장하는 방식을 먼저 설명하고자 한다.
  제어 컴포넌트(controlled component)를 사용하는 방식이라고 부를 수 있는데, 이 방법을 사용하면 컴포넌트 내부 상태와 뷰를 항상 동기화시킬 수 있다.
  제어 컴포넌트라고 하는 이유는 React가 값을 통제하거나 설정하기 때문이다.
  비제어 컴포넌트(uncontrolled component)를 사용하는 다른 방법은 7.2절에서 다룬다.
  
  cf: p213 그림 7-2 단방향 바인딩은 모델에서 뷰로 데이터를 옮기는 것을 담당한다. 반면에 양방향 바인딩은 모델에서 뷰뿐만 아니라 뷰에서 모델로 변경을 전달하기도 한다.
                        단방향 바인딩
  Transfer                              Amount                          $200 -> $100                      Transfer
  (                                     To: #324                        Amount: $100                      (
    amount:200.00,                      From: #9944                     To:                                 amount: 100.00,
    to: 324,                ->                                          From:                 ->            to: 324,
    from: 9944                                                                                              from: 9944
  )                                                                                                       )
  모델                                  뷰                              뷰                                모델
                                                      양방향 바인딩

  React에서 입력 영역을 다루는 가장 좋은 방법을 살펴봤다. 그림 7-1처럼 변경을 감지한 후 상태에 반영하여 뷰를 갱신시키는 것이다.
```

#### React에서 폼과 이벤트 정의하기
```
  <from> 요소부터 살펴보자. 일반적으로 입력 요소를 DOM의 아무곳에나 무작위로 두지 않는다.
  서로 기능이 다른 여러 개의 입력 요소 집합을 다루는 경우에 잘못될 수 있기 때문이다.
  무작위로 두지 않고 input 요소를 공통 목적을 가진 항목끼리 묶어서 <form> 요소로 감싼다.

  <form>으로 감싸는 것이 필수적인 것은 아니다. 간단한 UI에서는 폼 요소를 따로 사용해도 괜찮다.
  그렇지만 여러 요소의 그룹으로 이뤄진 단일 페이지처럼 복잡한 UI를 다룰 때는 각 그룹을 <form>으로 구분하는 것이 현명한 방법이다.
  React의 <form>은 HTML의 <form>처럼 렌더링되므로 HTML 폼에 적용할 수 있는 방법은 React의 <form> 요소에도 적용할 수 있다.
  예를들어 HTML5 명세에 의하면 폼은 중첩할 수 없다.

  <form> 요소에 이벤트를 사용할 수 있다. React는 표 6-1에서 살펴본 표준 React DOM 이벤트와 함께, 폼 요소를 위한 세 가지 이벤트를 지원한다.
    - onChange: 폼의 입력 요소에 변경이 생기면 발생한다.
    - onInput: <textarea> <input> 요소와 값이 변경될 때 발생한다. React 팀은 이 이벤트의 사용을 추천하지 않는다(이어지는 노트에서 설명한다.)
    - onSubmit: 폼 제출시 발생한다. 흔히 enter를 눌렀을 때 발생한다.
  
  Note: onChange와 onInput 비교
  React의 onChange는 모든 변경에 대해 발생하므로 DOM의 change 이벤트(http://mng.bz/IJ37)가 매번 발생 하지 않고 포커스를 잃었을 때만 발생하는 것과 차이가 있다.
  예를 들어 <input type="text">의 경우 사용자가 입력할 때 onChange 이벤트가 발생하지 않을 수도 있고, 사용자가 탭이나 클릭으로 포커스를 잃을 때 일반적인
  HTML 브라우저 이벤트로 onChange 이벤트가 발생한다.
  앞에서 언급한 것처럼 React의 경우에는 onChange 이벤트가 포커스를 잃을 때뿐만 아니라 키 입력 시마다 발생한다.

  결론은 React의 onChange와 HTML의 onChange는 서로 다르게 동작한다는 것이다. React의 onChange 이벤트는 HTML의 onInput 이벤트와 더 비슷하고 일관성이 있다.
  React에서는 가급적 onChange 이벤트를 활용하고 onInput 이벤트의 네이티브 구현에 접근해야 하는 경우에만 onInput을 사용하는 것을 추천한다. 
  React가 감싸서 만든 onChange의 동작이 일관성 있어 믿을 수 있기 때문이다.

  앞에서 정리한 세 가지 이벤트에 덧붙여서 <form>에 onKeyUp이나 onClick 같은 표준 React 이벤트도 사용할 수 있다. 
  폼 이벤트를 사용하면 input 요소 그룹 같은 전체 폼에서 특정 이벤트를 감지해야 하는 경우에 편리하다.

  예를 들어 사용자가 enter를 눌렀을 때 데이터를 제출할 수 있는 좋은 UX를 제공할 수 있다.
  (사용자가 textarea 영역에서 enter를 누른 경우에는 개행이 되어야 하므로 다른 영역이라고 생각하자)
  this.handleSubmit()을 실행하는 이벤트 리스너를 생성해서 폼의 submit 이벤트에 등록할 수 있다.

  handleSubmit(event) {
    ...
  }
  render() {
    return <form onSubmit={this.handleSubmit}>
      <input type="text" name="email" />
    </form>
  }

  Note: handleSubmit() 메서드는 다른 이벤트와 마찬가지로 render()의 외부에서 구현해야 한다. 
  React는 메서드 이름에 대해 별도의 규칙이 없으므로 이벤트 핸들러의 이름은 이해할 수 있고 일관성만 유지한다면
  자유롭게 정할 수 있다. 이 책에서는 가장 선호되는 규칙인 이벤트 핸들러 이름 앞에 handle을 접두사로 붙여서 일반적인 클래스 메서드와 구분하고 있다.

  Note: 기억을 상기시키는 차원에서 이야기하면 이벤트 핸들러를 추가할 때는 뒤에 괄호를 붙여서 실행시키거나 큰 따옴표를 쓰지 않는다.
  EVENT={this.METHOD}라고 작성하면 맞다. 어떤 사람은 이것이 기본적인 자바스크립트이며 간단하다고 느낄 수 있지만, 이벤트 핸들러 작성법을 잘못 이해해서 
  React 코드에 오류가 생기는 것을 얼마나 많이 봐왔는지 모른다. 함수의 결과가 아니라 정의를 전달해야 하며, JSX 속성 값을 전달할 때는 중괄호를 사용한다.

  Enter를 눌렀을 때 폼을 제출하도록 구현하는 다른 방법은 onKeyUp 이벤트에서 Enter의 키코드인 13을 확인하는 것이다.
  handleKeyUp(event) {
    if (event.keyCode == 13) return this.sendData()
  }
  render() {
    return <form onKeyUp={this.handleKeyUp}>
    ...
    </form>
  }
  sendData() 메서드는 클래스 또는 컴포넌트의 다른 곳에 구현되어 있다. 
  또한, this.sendData()가 정상으로 작동하려면 constructor()에서 이벤트 핸들러에 this 바인딩을 해주어야 한다.
  정리하면 폼의 개별 요소뿐만 아니라 폼 요소에서 이벤트를 사용할 수 있다.
  이제 폼 요소를 어떻게 정의하는지 살펴보자.
```

#### 폼 요소 정의하기
```javascript
  /*
  HTML의 거의 모든 입력 영역을 네 가지 요소, 즉 <input>, <textarea>, <select>, <option>을 사용해서 구현할 수 있다.
  React에서는 속성을 변경할 수 없다는 것을 기억하는가? 폼 요소는 사용자가 폼 요소와 상호작용하면서 속성을 변경하므로 특별한 경우다.

  React는 변경 가능한 속성인 value, checked, selected를 두어 폼 요소를 특별하게 다루고 있다.
  이 특별한, 변경 가능한 속성을 대화형 속성이라고 부른다.

  Note: React DOM은 폼을 만들기 위한 다른 요소로 <keygen>, <detailist>, <fieldset>, <label>도 지원한다.
  이런 요소는 value, checked, selected처럼 변경 가능한 속성 값 같은 기능을 가지고 있지는 않다.
  각각 대응되는 HTML 태그를 렌더링한다. 따라서 이 책에서는 앞서 언급한 특별한 기능을 가진 네 가지 주요 요소를 중점적으로 다룬다.

  변경할 수 있는 대화형 속성은 다음과 같다. 
  폼 요소에 연결한 onChange 같은 이벤트에서 이 속성을 읽을 수 있다.
    - value: <input>, <textarea>, <select>에 적용된다.
    - checked: <input>에 type="checkbox" 또는 type="radio"인 경우 적용한다.
    - slected: <select>와 함께 <option>을 사용할 때 적용된다.
  
  대화형 속성을 이용해서 값을 읽거나 변경할 수 있다. 
  각 요소를 정의하는 방버을 예제를 통해 살펴보자.

  <input> 요소
  <input> 요소는 type 속성에 입력하는 값에 따라 여러 가지 방식의 입력 영역을 렌더링 할 수 있다.
    - text: 일반적인 텍스트 입력 영역
    - password: 보안을 위해 입력 내용이 가려진 텍스트 영역
    - radio: 라디오 버튼, 라디오 버튼 그룹을 만들 때는 name 속성에 같은 값을 입력한다.
    - checkbox: 체크박스 요소, 체크박스 그룹을 만들 때는 name 속성에 같은 값을 입력한다.
    - button: 버튼 폼 요소
  
  체크박스와 라디오 버튼을 제외한 모든 <input> 요소의 주요 용도는 요소의 변경 가능한 대화형 속성을 사용하는 것이다.
  예를 들어 이메일 입력 영역은 email 상태와 onChange 이벤트 핸들러를 사용한다.

  <input
    type="text"
    name="email"
    value={this.state.email}
    onChange={this.handleEmailChange}
  />

  value를 변경 가능한 속성으로 사용하지 않는 두 가지 예외에 체크박스와 라디오 버튼이 있다.
  이 두가지 유형은 HTML 요소당 값을 하나만 가지므로 값이 변경되지 않지만, checked 또는 selected 속성이 변경된다.

  앞에서 언급한 것처럼 value는 변경할 필요가 없으므로 하드코딩되어 있다.
  사용자 조작에 의해 변경되는 것은 요소의 checked 속성으로 다음 예제를 통해 살펴보자.
  */
  class Content extends React.Component {
    constructor(props) {
      super(props)
      this.handleRadio = this.handleRadio.bind(this)
      ...
      this.state = {
        ...
        radioGroup: {
          angular: false,
          react: true,        // 상태에서 기본으로 선택된 라디오 버튼을 설정한다.
          polymer: false
        }
      }
    }
    handleRadio(event) {
      let obj = {}  // erase other radios
      obj[event.target.value] = event.target.checked  // true --------- target.checked 속성을 이용해서 라디오 버튼이 선택되었는지 여부를 확인한다.
      this.setState({radioGroup: obj})
    }
    ...
    render() {
      return <form>
        <input 
          type="radio"
          name="radioGroup"
          value="angular"
          checked={this.state.radioGroup["angular"]}    // 상태 객체 또는 상태 객체에 있는 한 값에서 필요한 값을 가져와서 사용할 수 있다.
          onChange={this.handleRadio}                   // target.vlaue로 라디오 버튼의 value를 확인할 수 있으므로 동일한 onChange 이벤트 핸들러를 사용한다.
        />
        <input 
          type="radio"
          name="radioGroup"
          value="react"
          checked={this.state.radioGroup['react']}
          onChange={this.handleRadio}
        />
        <input
          type="radio"
          name="radioGroup"
          value="polymer"
          checked={this.state.radioGroup['polymer']}
          onChange={this.handleRadio}
        />
        ...
      </form>
    }
  }

  /*
  체크박스도 라디오 버튼과 비슷한 방법을 사용한다. checked 속성을 사용하고, 상태에 불 값을 지정한다.
  다음예제 코드에서 불 값을 checkboxGroup 상태에 저장했다.
  */
  class Content extends React.Component {
    constructor(props) {
      super(props)
      this.handleCheckbox = this.handleCheckbox.bind(this)
      // ...
      this.state = {
        // ...
        checkboxGroup: {
          node: false,
          react: true,
          express: false,
          mongodb: false
        }
      }
    }
  }
  //  생성자에서 바인딩한 이벤트 핸들러가 현재 값을 가져오고, event.target.value를 이용해서 true 또는 false를 추가하여 상태를 결정한다.
  handleCheckbox(event) {
    let obj = Object.assign(this.state.checkboxGroup)
    obj[event.target.value] = event.target.checked  // --------- true || false
    this.setState({checkoxGroup: obj})
  }
  /*
  라디오 버튼에서 선택 값이 하나이므로 상태에서 할당할 필요가 없다. 
  따라서 빈 객체를 사용할 수 있었다. 그러나 체크박스는 다르다.
  선택 값이 여러가지이므로 교체하는 대신 병합해야 한다.

  자바스크립트에서는 객체는 참조를 통해 전달 및 할당한다. 따라서 obj = this.state.checkboxGroup에서 obj는 정말로 상태다.
  상태는 직접 변경하지 않는다는 점을 기억하고 있을 것이다. 
  잠재적인 충돌을 방지하기 위해서 Object.assign()을 이용해 값을 할당하는 것이 좋다.
  이 기법을 복제라고 한다. 
  JSON을 이용하는 방법은 조금 덜 효과적이며 꼼수에 가깝다.
  */
  cloneData = JSON.parse(JSON.stringify(originalData))
  /*
  상태에서 객체 대신 배열을 사용하는 경우에 값을 할당해야 한다면 clonedArray = Array.from(originArray) 또는 clonedArray = originArray.slice()를 사용할 수 있다.
  handleCheckbox() 이벤트 핸들러를 사용해서 event.target.value에서 값을 가져올 수 있다.
  */

  /*
  <textarea> 요소
  <textarea> 요소는 노트, 블로그 게시글, 코드 조각처럼 장문 입력을 감지하고 보여주기 위해 사용된다.
  일반적인 HTML에서 <textarea>는 inner HTML을 사용하여(자식을 말한다) 값을 보여준다.
  */
  <textarea>
    With the right pattern, application...
  </textarea>
  /*
  반면에 React는 value 속성을 사용한다. 
  이런 관점에서 보면 <textarea>의 자식으로 텍스트를 넣거나 inner HTML로 값을 설정하는 것은 안티패턴이다.
  React는 <textarea>에 자식이 있는 경우에는 자식으로 입력된 텍스트를 기본값으로 사용한다.
  */
  // Anti-pattern: AVOID doing this 
  <textarea name="description">{this.state.description}</textarea>
  // 대신에 <textarea>에 value 속성을 사용하는 것을 권장한다.
  render() {
    return <textarea name="description" value={this.state.description}></textarea>
  }
  // <input> 요소와 마찬가지로 변경을 감지하려면 onChange를 사용한다.

  /*
  <select>와<option> 요소
  <select>와 <option> 영역은 사용자가 미리 입력된 값 목록에서 한 가지 또는 여러 가지 값을 선택할 수 있는 훌륭한 UX를 제공한다.
  <select> 요소도 React와 일반 HTML 간에 동작의 차이가 있다. 예를 들면 일반적인 HTML에서는 선택된 요소의 순서를 확인하기 위해 selectDOMNode.selectedIndex를 사용한다. 그렇지만 React에서는 다음 예제 코드처럼 value 속성을 사용한다.
  */
  // 폼 요소 렌더링
  constructor(props) {
    super(props)
    this.state = {selectedValue: 'node'}
  }
  handleSelectChange(event) {
    this.setState({selectedValue: event.target.value})
  }
  ...
  render() {
    return <from>
      <select
        value={this.state.selectedValue}
        onChange={this.handleSelectChange}
      >
        <option vlaue="ruby">Ruby</option>
        <option value="node">Node</option>
        <option value="python">Python</option>
      </select>
    </from>
  }
  /*
  이 코드는 드롭다운 메뉴를 렌더링하고 node를 선택한다.
  constructor()에서 상태를 설정해 준다.

  다중 선택 요소를 사용해야 하는 경우도 있다. React에서 JSX를 작성할 때 별도의 값을 주지 않고
  multiple 속성만 작성하면 React가 true로 처리한다. 또는 명시적으로 multiple={true}라고 값을 주어도 된다.

  Tip: 일관성을 유지하고 혼란을 막기 위해 모든 불 값을 ''가 아니라 {}로 감쌌다. 'true'와 {true}의 결과는 같다.
  그렇지만 "false"라고 입력하면 true가 된다. 자바스크립트에서는 문자열 "false"가 참 값이라 true로 처리되기 때문이다.

  여러 항목을 기본으로 선택하려면 <select>의 value 속성에 배열로 값을 전달한다. 
  예를 들어 다음 예제 코드에서는 Meteor와 React를 선택했다.
  */
  <select multiple={true} value={["meteor", "react"]}>
    <option value="meteor">Meteor</option>
    <option value="react">React</option>
    <option value="jQuery">jQuery</option>
  </select>
  /*
  전반적으로 React에서 폼 요소를 정의하는 것은 value를 더 자주 사용한다는 점을 제외하면 일반적인 HTML과 크게 다르지 않다.
  이런 일관성이 좋다. 그렇지만 폼 요소를 정의하는 것이 절반이라면, 다른 절반은 값의 변경을 감지하는 것이다.
  */
```

#### 변경 감지하기
```javascript
  /*
  앞서 언급한 것처럼 폼 요소의 변경을 감지할 때는 onChange 이벤트 리스너를 이용한다.
  onChange 이벤트는 일반적인 DOM의 onInput 이벤트를 대체한다. 
  일반적인 HTML DOM의 onInput과 같은 동작이 필요한 경우네는 React의 onInput 이벤트를 사용할 수 있다. 
  반면에 React의 onChange 이벤트는 일반적인 DOM의 onChange 이벤트와 완벽하게 동일하지 않다.
  일반적인 DOM의 onChange 이벤트는 요소가 포커스를 잃었을 때만 발생하지만, 
  React의 onChange 이벤트는 모든 새로운 입력에 대해 발생한다.
  onChange 이벤트를 발생시키는 요인은 요소에 따라 차이가 있다.
    - <input>, <textarea>, <select>: value가 변경될 때 onChange 이벤트가 발생한다.
    - <input>, 체크박스와 라디오 버튼: checked가 변경될 때 onChange 이벤트가 발생한다.

  이 분류에 따라 value를 읽는 방법이 다르다. 
  이벤트 핸들러의 인자로는 합성 이벤트(SyntheticEvent)를 받는다.
  요소에 따라 event.target은 value, checked, selected 같은 값을 갖는다.

  변경을 감지하려면 컴포넌트에 이벤트 핸들러를 정의하고(JSX의 {}에 인라인으로 작성할 수도 있다)
  onChange 속성으로 이벤트 핸들러를 전달해주면 된다.
  */
  // 폼 요소의 렌더링과 변경 감지하기
  handleChange(event) {
    console.log(event.target.value)
  }
  render() {
    return <input
      type="text"
      onChange={this.handleChange}
      defaultValue="hi@azat.co" />
  }
  /*
  흥미로운 점은 onChange를 정의하지 않고 value만 입력하면 React가 경고를 보내고 요소를 읽기 전용으로 만든다는 점이다.
  읽기 전용 영역이 필요한 경우라면 명시적으로 readOnly 속성을 추가하는 것이 좋다.
  이렇게 하면 경고도 제거할 수 있고, 코드를 보는 다른 개발자도 입력 영역이 읽기 전용으로 설계되었다는 것을 알 수 있다.
  값을 명시적으로 설정하려면 readOnly={true}라고 작성하거나, 
  값 없이 readOnly 속성만 작성해도 React에서 해당 속성의 값을 true로 간주한다.
  */
  // 요소의 변경을 감지하려면 컴포넌트 상태에 저장할 수 있다.
  handleChange(event) {
    this.setState({emitValue: event.target.value})
  }
  /*
  언제가는 정보를 서버나 다른 컴포넌트로 보내야 한다. 보낼 때는 값을 상태에 깔끔하게 정리해야 한다.
  예를 들어 대출 신청서 폼을 만들고, 사용자 이름, 주소, 전화번호, 주민등록번호를 입력받는다고 가정해보자.
  각 입력 영역이 각자의 변경 사항을 처리한다.
  폼의 맨 아래에는 제출 버튼을 넣어서 입력으로 저장한 상태를 서버로 보낸다.
  */
  // 폼 요소 렌더링하기
  constructor(props) {
    super(props)
    this.handleInput = this.handleInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    ...
  }
  handleFirstNameChange(event) {
    this.setState({fristName: event.target.value})  // 이름(firstName) 영역의 변경 사항을 감지하여 상태에 저장한다.
  }
  ...
  handleSubmit() {
    fetch(this.props['data-url'], {method: 'POST', body: JSON.stringify(this.state)}) // 프라미스 기반의 Fetch API를 사용해서 data-url 속성으로 전달받은 URL에 데이터를 전송한다.
      .then(res => response.json())
      .then(data => console.log('Submitted: ', data))
  }
  render() {
    return <form>
      <input name="firstName" 
        onChange={this.handleFirstNameChange}
        type="text"
      />
      ...
      <input 
        type="button"
        onClick={this.handleSubmit}     // 이벤트 핸들러를 정의하여 제출 버튼 이벤트를 처리한다.
        value="submit"
      />
    </form>
  }
  /*
  Note: Fetch API는 프라미스 기반의 AJAX/XHR 요청을 수행할 수 있는 실험적인 브라우저 내장 메서드다.
  사용법과 지원 여부에 대해서는 http://mng.bz/mbMe에서 확인할 수 있다.

  요소의 정의, 변경 이벤트 감지, 값을 표시하기 위한 상태 갱신에 대해 살펴 보았다.
  */
```

#### 대출 신청서의 계좌번호 영역 만들기
```jsx
  /*
  대출 신청서를 계속 만들어보자. 대출이 승인되면 사용자는 대출금을 이체받을 계좌번호를 입력해야 한다.
  새로 배운 기술을 바탕으로 계좌번호 영역 컴포넌트를 구현해 보자.
  React에서 폼을 다룰 때 가장 적합한 방법인 제어 엘리먼트를 사용한다.

  예제 코드 7.6 컴포넌트는 그림 7-8처럼 계좌번호 영역에 숫자만 입력할 수 있어야 한다.
  입력을 숫자(0~9)로 제한하려면 제어 컴포넌트에서 숫자가 아닌 입력 값을 모두 제거해야 한다.
  이벤트 핸들러는 입력 값을 걸러낸 후에만 상태를 갱신한다.
  */
  // 제어 컴포넌트 구현하기
  class Content extends React.Component {
    constructor(props) {
      super(props)
      this.handleChange = this.handleChange.bind(this)
      this.state = { accountNumber: '' }  // 계좌번호 초깃값으로 빈 문자열을 설정한다.
    }
    handleChange(event) {
      console.log('Typed: ', event.target.value)  // 콘솔에 입력한 내용을 그대로 보여준다.
      this.setState({ accountNumber: event.target.value.replace(/[^0-9]/ig/, '')})  // 입력 값에서 숫자만 걸러낸 후 상태를 갱신한다.
    }
    render() {
      return <div>
        Account Nubmer:
        <input
          type="text"
          onChange={this.handleChange}
          placeholder="123456"
          value={this.state.accountNumber}
        />
        <br />  
        <span>{this.state.accountNumber.length > 0 ? 'You entered: ' + this.state.accountNumber: ''}</span>
      </div>
    }
  }
  /*
  정규표현식과 문자열의 replace 메서드를 이용해서 숫자가 아닌 입력 값을 제거했다. replace(/[^0-9]/ig, '')는 복잡하지 않은
  정규표현식을 사용한 메서드로 숫자가 아닌 입력 값을 빈 문자열로 치환한다.
  ig는 대소문자 구분을 하지 않는 것.
  문자열 전체에서 일치 항목을 찾는 것을 의미한다.

  render()의 입력 영역은 value={this.state.accountNumber} 설정되어 있으므로 제어 컴포넌트다. 
  예제의 계좌번호 영역을 브라우저에서 직접 입력해보면 숫자만 입력할 수 있는데, React가 새로운 상태를 숫자만 있는 값으로 걸러내어 설정하기 때문이다.
  그림 7-9에서 확인할 수 있다.
  React에서 입력 요소와 폼을 다루는 가장 좋은 방법을 통해 입력 값 유효성 검사를 구현할 수 있으며, 앱을 원하는 모습대로 작동하도록 강제할 수 있다.

  Note: 계좌번호 컴포넌트에서 프론트엔드 유효성 검사를 구현 했는데, 이것으로는 서버로 보내는 XHR 요청에 해커가 악의적인 데이터를 입력하는 것을 방지할 수는 없다.
  따라서 서버나 백엔드, ORM/ODM(https://en.wikipedia.org/Object-relational_mapping) 같은 비즈니스 레이어에서는 입력 값에 대한 적절한 유효성 검사 처리가 필요하다.
  */
```

### 폼을 다루는 다른 방법
```
  제어 폼 요소를 사용하는 방법이 가장 좋긴 하다.
  그렇지만 이 방법은 직접 변경을 감지하고 상태를 갱신해야 하므로 추가 작업이 필요하다.
  value, checked, selected 속성 값을 문자열 또는 React의 속성이나 상태를 이용해서 정의해야 React가 요소를 제어할 수 있다.

  또한, 폼 요소는 value 속성이 상태나 정적인 값으로 설정되어 있지 않을 때는 React가 제어하지 않아도 된다.
  뷰의 DOM 상태와 React의 내부 상태에 차이가 있을 수 있다는 점을 들어 비제어 컴포넌트를 권장하지 않는다고 설명하기도 했지만,
  서버에 전달할 간단한 폼을 만들 때는 비제어 컴포넌트가 유용하다.
  다시 말해 복잡한 사용자 입력과 조작이 많은 UI 요소를 만드는 경우가 아니라면 비제어 패턴을 사용하는 것을 고려해볼 만하다.
  (이런 패턴을 적용할때는 항상 주의하자. 예외사항은 확실히 점검하고 쓰는 것이 좋다.)

  일반적으로 비제어 컴포넌트를 사용하려면 폼에서 제출 이벤트를 정의해야 한다. 보통 버튼에 onClick 이벤트나 폼의 onSubmit 이벤트를 사용한다.
  이벤트 핸들러를 추가한 뒤에는 두 가지 방법 중에 선택할 수 있다.
    - 제어 엘리먼트를 사용할 때처럼 변경을 감지하여 상태에 저장하지만, 상태를 value에 사용하지 않고 제출 시에만 사용하는 방식(이것은 결국 제어하지 않는 방식이다.)
    - 변경을 감지하지 않는 방식

  첫번째 접근 방법은 간단하다. 같은 이벤트 리스너를 사용해서 상태르 갱신한다. 
  최종적으로 폼을 제출할 때만 상태를 사용하는 경우 이 방법은 과도한 코딩이 될 수 있다.
  
  Warning: React는 여전히 상대적으로 새롭기 때문에, 
  앱을 개발하고 유지보수하는 실제 경험을 통해 모범 사례가 자리를 잡아가고 있다.
  추천 방법이 거대한 React 앱을 다년간 유지보수하는 동안 바뀔 수도 있다.
  비제어 컴포넌트는 의견이 일치되지 않은 회색 지대라고 할 수 있다.
  아마 이 방식은 안티패턴이니 피해야 한다는 이야기를 들을 수도 있다.
  나는 편을 가르기보다는 충분한 정보를 제공해서 직접 판단할 수 있도록 도움을 주려고 한다.
  여러분이 가능한 모든 지식을 활용해서 똑똑하게 판단할 수 있을 거라고 믿기 때문이다.
  (초보라면 될수 있으면 사용하지 않는것이 좋다. 천재라면 사용해도 된다. 단 자신이 똑똑하다고 쉽게 판별하지 않길 바란다.)
```

#### 비제어 엘리먼트에서 변경 감지하기
```jsx
  /*
  React에서 비제어 컴포넌트는 value 속성을 React에서 설정하지 않는 것을 의미한다.
  이 경우 컴포넌트의 내부 값 또는 상태가 컴포넌트의 표현 또는 뷰와 서로 다를 수 있다.
  컴포넌트 상태는 유효성 검사 같은 논리를 가질 수 있다.
  비제어 컴포넌트를 사용하는 경우에는 사용자가 폼 요소에 무엇이든 입력할 수 있으므로 뷰와 상태 사이에 차이가 발생한다.

  예를 들어 다음 텍스트 입력 영역은 React에서 value를 설정하지 않았으므로  비제어 컴포넌트다.
  */
  render() {
    return <input type="text" />
  }

  /*
  사용자 입력이 즉시 뷰에 렌더링된다. 이것이 좋은 것일까, 나쁜 것일까? 지금부터 이 점을 함께 살펴보자.
  비제어 컴포넌트에서 변경을 감지하려면 onChange를 사용한다.
  예를 들어 그림 7-10의 입력 영역은 onChange 이벤트 핸들러인 this.handleChange와 textbook에 대한 참조,
  입력 영역이 비어 있을 때 회색으로 노출할 placeholder를 속성으로 가지고 있다.

  다음 예제 코드의 handleChange() 메서드는 콘솔에 값을 출력하고, event.target.value를 이용해서 상태를 갱신한다.
  */
  // 변경을 감지하는 비제어 엘리먼트
  class Content extends React.Component {
    constructor(props) {
      super(props)
      this.state = {textbook: ''} // 기본값으로 빈 문자열을 설정한다.
      this.handleChange = this.handleChange.bind(this)
    }
    handleChange(event) {
      console.log(event.target.value)
      this.setState({textbook: event.target.value})   // 입력 영역에 변경이 있을 때 상태를 갱신한다.
    }
    render() {
      return (
        <div>
          <input 
          type="text" onChange={this.handleChange} /*input에 value를 설정하지 않고 이벤트 리스너만 설정한다.*/placeholder="Eloquent TypeScript: Myth or Reality" />
          <span>{this.state.textbook}</span>
          // span을 이용해서 handleChange() 메서드에서 설정한 상태 변수를 출력한다.
        </div>
      )
    }
  }
  /*
  React가 사용자가 입력하는 값을 제어하지 않으므로 원하는 내용을 무엇이든 입력할 수 있다.
  React는 onChange를 통해 새로 입력된 값을 감지해서 상태에 저장만 한다.
  그러면 그림 7-11처럼 상태의 변경 사항이 <span>에 갱신된다.

  이 방법으로 입력 영역을 위한 이벤트 핸들러를 구현할 수 있다. 이벤트 감지를 아예 하지 않는 방법도 있을까?
  */
```

#### 비제어 엘리먼트에서 이벤트를 감지하지 않는 경우
```
  예를 들어 폼을 제출할 때처럼 모든 값이 필요한 경우에 문제가 있다.
  변경을 감지하는 방식일때는 모든 데이터가 상태에 저장되어 있다.
  비제어 엘리먼트에서 변경을 감지하지 않기로 하면 데이터는 DOM에 그대로 남는다.
  데이터를 자바스크립트 객체로 가져 오려면 그림 7-12처럼 참조를 이용해야 한다. 그림 7-1에서 살펴본 제어 엘리먼트의 흐름을 그림 7-12의 비제어 엘리먼트와 비교해보는것도 좋겠다.

  Note: 제어 컴포넌트 또는 데이터를 감지하는 비제어 컴포넌트를 다룰 때는 데이터가 항상 상태에 저장되어 있다.
        지금 다루고 있는 부분은 이런 방식에 해당하지 않는다.

  정리하면 변경을 감지하지 않고 비제어 엘리먼트를 사용하려면 다른 엘리먼트에 접근해서 데이터를 가져올 수 있는 방법이 필요하다.
  
  p.231 그림 7-12 비제어 엘리먼트를 사용할 때는 변경을 감지하지 않고, 참조를 통해 값에 접근한다.
  사용자                                    뷰                                                                    서버                                    
                      1. 입력 ->                        3. 최종이벤트 ->
                    <-2. 갱신된 뷰                         (감지하지 않은 변경 사항 제출)
```

#### 값에 참조로 접근하기
```jsx
  /*
  비제어 컴포넌트를 다룰 때는 onChange 같은 이벤트를 이용해 입력을 감지하지 않으므로 refs를 통해 참조로 값에 접근한다.
  그렇지만 참조가 이 특정 패턴에만 적용되는 것은 아니다. 참조를 사용하는 것은 안티패턴으로 여겨져서 눈살을 찌푸릴 수도 있겠지만,
  참조 사용이 적합한 상황이라면 어디에나 적용할 수 있다. React 엘리먼트를 적절히 정의한다면 뷰(DOM)의 상태와 내부 상태가 동기화되므로 참조를 사용할 필요가 거의 없다.
  그렇지만 참조를 이해할 필요는 있으므로 여기서 설명하고자 한다.

  참조를 사용하면 React 컴포넌트의 DOM 요소 또는 노드를 가져올 수 있다.
  변경을 감지하지 않고 폼 요소의 값을 가져와야 할 때 유용하다.
  참조를 사용하려면 다음 두 가지 작업이 필요하다.
    - render 메서드에서 반환하는 엘리먼트의 ref 속성에 문자열을 전달하는 경우 카멜 표기법으로 작성되어 있어야 한다.
      예를 들어 email: <input ref="userEmail" />처럼 작성한다.
    - 지정한 이름으로 다른 메서드에서 DOM 인스턴스에 접근한다. 예를 들어 이벤트 핸들러에서 this.refs.NAME이 this.refs.userEmail이다.
  
  this.refs.NAME으로 React 컴포넌트의 인스턴스에 접근할 수 있다. 그렇지만 입력 값을 어떻게 확인할 수 있을까? DOM 노드를 가져오는 것이 좀 더 유용하겠다!
  컴포넌트의 DOM 노드에 접근하려면 ReactDOM.findDOMNode(this.refs.NAME)을 사용한다.
  */
  let emailNode = ReactDOM.findDOMNode(this.refs.email)
  let email = emailNode.value

  // ReactDOM.findDOMNode 메서드 줄이기(좀 더 사용하기 편할수도 있다. 단순한 축약 패턴이지만 유용할듯)
  let fD = ReactDOM.findDOMNode
  let email = fD(this.refs.email).value
  /* 
  입력 값은 브라우저 콘솔에서 확인 가능하다.
  /emial
    /css
      bootstrap.css
    /js
      content.js
      react.js
      react-dom.js
      script.js
    /jsx
      content.jsx
      script.jsx
    index.html
  */
  // 이메일 폼 시작하기
  class Content extends React.Component {
    constructor(props) {
      super(props)
      this.submit = this.submit.bind(this)
      this.propmpt = 'please enter your email to win $1,000,000'    // 클래스 속성 정의
    }
    submit(event) {
      let emailAddress = this.refs.emailAddress
      let comments = this.refs.comments
      console.log(ReactDOM.findDOMNode(emailAddress).value)   // 참조를 이용해서 이메일 주소 입력 값에 접근하여 출력한다.
      console.log(ReactDOM.findDOMNode(comments).value)
    }
  }
  // 이메일 폼의 render() 메서드
  render() {
    return (
      <div className='well'>
        <p>{this.prompt}</p>                    // Content 컴포넌트의 this.prompt 값을 출력한다.
        <div className='form-group'>
          Email: <input ref="emailAddress" className="form-control" type="text" placeholder="hi@azat.co" />
          /*
          placeholder 속성이 있는 이메일 입력 영역을 구현한다.
          placeholder 속성은 입력할 내용을 알려주는 시각적 장치다.
          className과 ref 속성도 사용했다.
          */
        </div>
        <div className="form-group"
        >
          Comments: <textarea ref="comments" className="form-control" placeholder="I like your website" />
        </div>
        <div className="form-group"
        >
          <a className="btn btn-primary" value="Submit" onClick={this.submit}>Submit</a>  // onClick 이벤트가 있는 제출 버튼에서 this.submit을 호출한다.
        </div>
      </div>
    )
  }
  /*
  <textarea>의 일반적인 HTML DOM 노드는 innerHTML을 입력 값으로 사용한다. 앞에서 언급한 것처럼 React에서는 <textarea>에 value를 사용할 수 있다.
  폼 요소의 API가 일관성이 있어 얻을 수 있는 멋진 기능이다. 동시에 ReactDOM.findDOMNode()가 DOM 노드를 반환하므로 innerHTML 같은 
  일반적인 HTML 속성이나 getAttribute() 같은 메서드에도 접근할 수 있다.

  이제 특정 엘리먼트의 이벤트 핸들러에서 뿐만 아니라, 컴포넌트 메서드 어디에서든 요소와 입력값에 접근하는 방법을 알게 되었다.
  다시 말하지만, 참조를 사용하는 것은 비제어 엘리먼트를 사용하는 경우처럼 흔하지 않은 경우다. 
  참조를 과도하게 사용하는 것은 좋지 않다.
  대부분의 경우 제어 엘리먼트에서 참조를 사용하는 대신 컴포넌트 상태를 사용한다.

  JSX의 ref 속성으로 함수를 할당하는 것도 가능하다. 이 함수는 엘리먼트를 마운팅할 때 한 번만 실행된다.
  이 함수에서 DOM 노드를 this.emailInpt처럼 인스턴스의 속성으로 저장할 수 있다.
  */
  <input ref={(input) => {this.emailInput = input}}
    className="form-control"
    type="text"
    placeholder="hi@azat.co"
  />
  /*
  비제어 컴포넌트는 상태 변경이나 변경을 감지하는 것이 선택 사항이므로 코딩해야 할 양이 적다.
  그렇지만 또 다른 문제점이 있다. value를 상태에 연결하거나 하드코딩한 값을 넣을수 없다.
  넣으려면 비제어 엘리먼트를 사용해야 한다(비제어 엘리먼트는 value={this.state.email} 같은 방식으로 작성할 수 없다).
  기본값을 어떻게 지정할까?
  예를 들어 대출 신청서를 일부만 입력하고 저장한 다음 나중에 다시 작성한다고 해보자. 
  사용자가 이미 입력한 내용을 보여주어야 하지만, value 속성을 사용할 수 없다.
  */
```

#### 기본값 설정하기
```
  대출 신청서 예제의 일부 영역에 기존 데이터를 입력해줘야 한다고 가정해 보자.
  일반적인 HTML 이라면 폼 영역에 value를 작성하면 사용자가 페이지에서 값을 변경할 수 있다.
  그렇지만 React는 value, checked, selected를 뷰와 엘리먼트 내부 상태에서 일관되게 유지한다.
  React에서 다음과 같이 입력 값을 하드코딩하면 읽기 전용이 되어버린다.
  <input type="text" name="new-book-title" value="Node: The Best Parts" />

  대부분의 경우 이런 것을 원하지 않을 것이다. 따라서 React는 특별한 속성인 defaultValue를 이용해서 
  입력값을 설정하고, 사용자가 폼 요소를 수정할 수 있도록 했다.

  예를 들어 폼이 이전에 저장된 경우, 사용자를 위해 <input> 영역을 미리 채워 놓으려고 한다.
  이런 경우 폼 요소에 defaultValue 속성을 사용한다. 
  입력 영역의 기본값을 다음과 같이 설정할 수 있다.
  <input type=text" name="new-book-title" defaultValue="Node: The Best Parts" />

  defaultValue 대신 value 속성(value="JSX")을 사용하면 이 엘리먼트는 읽기 전용이 되어버린다.
  제어 엘리먼트가 될 뿐만 아니라, 그림 7-14(cf: p.236)처럼 사용자가 <input> 요소에 입력하더라도 값이 바뀌지 않는다.
  이것은 value를 하드코딩했기 때문에 React가 해당 값을 유지하는 것이다.
  아마도 여러분이 원하는 결과는 아닐 것이다.
  실제 애플리케이션에서 React는 속성을 통해 입력 값을 가져올 것이다.(this.props.name)
  <input type="text" name="new-book-title" defaultValue={this.props.title} />
  
  또는 상태를 이용할 수도 있다.
  <input type="text" name="new-book-title" defaultValue={this.state.title} />

  React의 defaultValue 기능은 주로 비제어 컴포넌트와 함께 사용한다. 그렇지만 참조를 사용하면 defaultValue를 제어 컴포넌트나 다른 경우에도 사용할 수 있다.
  제어 컴포넌트에서는 생성자에서 기본값을 상태로 설정할 수 있으므로 크게 중요하지 않다. 예를 들면 this.state = {defaultName: 'Abe Lincoln'} 이라고 작성할 수 있다.

  대부분의 UI 작업이 편리한 폼 요소를 통해 이뤄진다. 아름다우면서도 이해하고 사용하기 쉽게 만들어야 한다. 
  사용자 친화적인 오류 메세지, 프론트엔드 유효성 검사, 그 외의 툴팁, 크기를 변경할 수 있는 라디오 버튼, 기본값, 플레이스홀더 같은 중요한 기능들도 다뤄야 한다.
  UI를 개발하다 보면 복잡해지고, 금세 통제 불능 상태가 되곤한다! 다행히도 React는 브라우저간 차이가 없는 폼 요소 API를 제공하므로 복잡한 UI 개발 작업이 좀 더 쉬워진다.
```

### 요약
```
  - 폼을 다루는 방법 중 권장하는 방법은 변경을 감지하여 이벤트 리스너로 상태에 데이터를 저장하는 제어 컴포넌트를 사용하는 것이다.
  - 변경을 감지하거나 감지하지 않는 비제어 컴포넌트를 사용하는 방법으 좋은 방법이 아니므로 피하는 것이 좋다.
  - 참조와 기본값은 모든 경우 사용할 수 있지만, 제어 컴포넌트의 경우에는 사용할 필요가 없다.
  - React의 <textarea>는 innerHTML 대신 value 속성을 사용한다.
  - this.refs.NAME은 클래스 참조에 접근하는 방법이다.
  - defaultValue는 엘리먼트의 초기 뷰(DOM)를 설정할 때 사용할 수 있다.
  - 참조를 설정하려면 ref={el => {this.input = el;}} 처럼 함수를 사용하거나 ref="NAME" 으로 문자열을 사용할 수 있다.
```