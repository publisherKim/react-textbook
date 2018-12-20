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