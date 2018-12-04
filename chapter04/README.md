## 4장 React 컴포넌트의 상태 객체
```
  - React 컴포넌트의 상태 객체에 대한 이해
  - 상태 객체를 다루는 방법
  - 상태 객체와 속성(props)의 비교
  - 상태저장 컴포넌트와 상태비저장 컴포넌트

  상태 객체가 없다면 리액트 컴포넌트는 그저 빚 좋은 정적 템플릿일 뿐이다. 
  이 장만큼 중요한 장은 없다.

  리액트의 상태 관리는 단방향을 기준으로 부모에서 자식으로 내려줄때 속성을 통해서 뷰를 관리한다.

  속성은 현재 컴포넌트에서 변경할 수 없으므로 부모 컴포넌트에서 컴포넌트를 새로 생성해서 새로운 값을 전달하는 방법 외에는 컴포넌트의 속성을 변경할 수 없다.
  (리덕스 등을 통해 다이렉트로 하위 컴포넌트에서 관리 할수도 있으나 컨테이너를 통해 관리해야 할지는 신중하게 결정해야 한다.)

  cf: p121 그림 4-2 뷰를 변경하기 위해서는 컴포넌트 내부에 변경할 수 있는 다른 자료형이 필요하다.
  A 컴포넌트(부모)                            B 컴포넌트(하위)                          뷰: render()       
                            ->              이벤트 발생(상태 변경)         ->

  한 가지 해결책은 서버에서 응답을 받을 때마다 새로운 속성으로 엘리먼트를 렌더링 하는 것이다.
  그렇지만 이 경우 관련된 로직을 컴포넌트 외부에 작성해야 하므로 독립적인 컴포넌트가 될 수 없다.
  만약 속성 값을 변경할 수 없지만 컴포넌트는 독립적이어야 한다면 속성을 사용할 수 없을 것이다.
  따라서 문제를 정리해보면, createElement()나 JSX <NAME/>을 이용해 컴포넌트를 다시 생성하지 않고,
  사용자 조작으로 발생한 이벤트를 처리하여 뷰를 갱신해야 한다.
  즉 상태 객체를 이요하면 이런 문제를 해결할 수 있다.

  서버 응답에 따라 콜백 코드가 컴포넌트의 상태를 변경한다. 상태를 갱신하고 나면 React가 영리하게 뷰를 갱신한다.
  (변경된 상태 데이터를 이용하고 있는 부분만 갱신한다.)

  React 컴포넌트의 상태 객체를 이용하면 가치 있고 상호작용이 뛰어난 React 애플리케이션을 만들 수 있다.
  상태(state)는 React 컴포넌트 데이터를 저장하고, 데이터의 변경에 따라 자동으로 뷰를 갱신하도록 하는 핵심 개념이다.
```

### 4.1 React 컴포넌트의 상태란?
```
  React의 상태는 컴포넌트의 변경 가능한 데이터 저장소다.
  독립적이면서 기능 중심인 UI와 논리의 블록이다.
  변경 가능하다는 것은 상태 값을 변경할 수 있다는 것이다.
  뷰(render())에서 상태를 이용하고, 이 값을 나중에 변경하면 뷰의 표현에 영향을 줄 수 있다.

  빗대어 설명하면 이렇다. 컴포넌트를 속성과 상태가 있는 함수라고 생각하면 이 함수의 결과가 UI 표현(뷰)이다.
  React 팀에서는 "컴포넌트는 상태머신 입니다."라고 말하고 있다.
  속성과 상태는 둘 다 뷰를 갱신하기 위해 사용할 수 있지만, 서로 다른 목적으로 사용한다.

  상태 객체에 접근할 때는 이름을 이용한다. 이름은 this.state 객체의 속성이다. 
  (여기서 말하는 객체 속성이란 객체 키 또는 객체 프로퍼티를 의미하며, 컴포넌트의 속성이 아니다.)
  예를 들면 this.state.autoompleMatcches 또는 this.state.inputFieldValue 같은 방식이다.

  Note: 일반적으로 상태 객체라고 하면 컴포넌트의 this.state 객체에 속한 모든 키-값 쌍을 말한다. 
        상태라고 하면 문맥에 따라서 this.state 객체를 의미하거나 this.state.inputFieldValue처럼
        개별 상태 값을 의미할 수도 있다. 
        반면에 상태 객체라고 하면 거의 항상 하나의 컴포넌트에 속한 상태 객체를 구성하는 여러 개의 키-값 쌍을 의미한다.

  상태 데이터는 흔히 뷰의 렌더링이 갱신될 때 동적 정보를 출력하기 위해 사용된다.
  사용자 입력을 받아 서버에 XHR 요청을 보내고, 돌아온 응답에 따라 상태를 변경한다.
  React는 뷰에 출력된 상태가 변경되면, 변경된 상태를 뷰에 반영하여 뷰를 최신 상태로 유지한다.
  본질적으로 상태를 변경하면 뷰에서 변경한 상태에 관련된 부분만 갱신 된다.(작게는 HTML 요소 또는 한 요소의 속성만 변경된다.)

  DOM에 있는 그 외의 다른 부분은 그대로 유지한다. 
  이것은 가상 DOM 덕분인데, 이는 React가 보정(reconciliation) 과정을 통해 변경할 부분을 결정하는 방식이다.
  이 덕분에 선언적으로 작성할 수 있는 것이다. 우리는 React가 부리는 리렌더링을 감상하면 된다.
  (개발자가 뷰를 따로 관리할 필요가 없다.)

  React 개발자는 상태 객체를 이용해서 새로운 UI를 생성한다. 
  컴포넌트 속성(this.props)이나, 일반적인 변수(inputValue), 클래스 속성(this.inputValue)으로는 처리할 수 없는데,
  이것들을 컴포넌트 내부에서 변경하더라도 뷰를 자동으로 변경할 수 없기 때문이다.

  다음예제는 안티패턴으로, 상태 외의 다른 값을 변경해도 뷰를 갱신할 수 없다는 것을 보여준다.
  // 안티패턴: 이런 방식은 피해야 한다
  let inputValue = 'Texas'
  class Autocomplete extends React.component {
    updateValues() {
      this.props.inputValue = 'California'
      inputValue = 'California'
      this.inputValue = 'California'
    }
    render() {
      return (
        <div>
          {this.props.inputValue}
          {inputValue}
          {this.inputValue}
        </div>
      )
    }
  }

  Note: 속성은 부모 컴포넌트에서 새로운 값을 전달하면 뷰를 갱신하여 현재 다루고 있는 자식 컴포넌트의 새로운 인스턴스를 생성한다.
        해당 자식 컴포넌트 컨텍스트 내에서 this.props.inputValue = 'California' 같은 방식으로 속성을 변경하려고 해도 소용 없다.
```

### 상태 객체 다루기
```
  상태 객체를 다루려면 값이 접근하고 갱신하는 방법과 초기 상태 설정 방법을 알아야 한다.
  React 컴포넌트의 상태 객체에 접근하는 방법부터 알아보자.
```

#### 상태 객체에 접근하기
```javascript
  /*
  상태 객체는 컴포넌트의 멤버 변수로 this를 통해 접근할 수 있다.
  this.state.name 같은 방식으로 접근한다.
  JSX에서 중괄호({})를 이용해 변수에 접근하고 출력할 수 있다.
  이와 유사하게 render()에서 this.state를 렌더링 할 수 있다.
  (다른 변수나 컴포넌트 클래스에 선언한 클래스 속성과 다르지 않다.)
  예를 들면 {this.state.inputFieldValue}처럼 작성할 수 있다.
  이 문법은 속성에 접근하는 방법인 this.props.name과 비슷하다.

  지금까지 배운 내용으로 시계를 구현해보자
  folder structure
    /clock
      index.html
      /jsx
        script.jsx
        clock.jsx
      /js
        script.js
        clock.js
        react.js
        react-dom.js
  
  Babel CLI에 -w와 -d 옵션을 주어, 모든 JSX 파일을 컴파일한 후 산출물 폴더인 clock/js에 저장하고, 
  파일을 수정할 때마다 다시 컴파일하도록 했다. 
  또한, 상위 폴더인 ch04에 있는 pacakge.json 파일의 scripts 항목에 이 명령을 추가하여 ch04 폴더에서 
  npm run build-clock으로 실행할 수 있다.

  시간은 계속 변화하기 때문에 뷰를 갱신해야 한다.
  뷰를 갱신하기 위해 상태를 사용할 수 있다.
  */
  // 상태에 currentTime이란 이름을 주고, 다음 예제 코드 처럼 이 상태를 렌더링해보자.
  class Clock extends React.Component {
    render() {
      return <div>{this.state.currentTime}</div>
    }
  }

  ReactDOM.render(
    <Clock/>,
    document.getElementById('content')
  )
  /*
  이렇게 하면 Uncaught Type Error: Cannot read property 'currentTime' of null 이라는 오류 메시지가 발생한다.
  속성과 달리 상태 객체는 부모 컴포넌트에서 설정하는 것이 아니다.
  그렇다고 해서 상태를 설정하기 위해 render() 메서드 안에서 setState를 실행 할 수는 없다.
  setState -> render -> setState...로 끊임없이 반복되므로 React가 오류를 발생시킨다.
  */
```

#### 초기 상태 설정하기
```javascript
  /*
  render()에서 상태 데이터를 사용하려면 먼저 상태를 초기화해야 한다.
  초기 상태를 설정하려면 React.Component를 사용하는 ES6 클래스의 생성자(constructor)에서 this.state를 선언한다.
  반드시 super()에 속성을 전달하여 실행해야 한다. 
  그렇지 않으면 부모 클래스(React.Component)의 기능을 정상적으로 사용할 수 없다.
  */
  class MyFancyComponent extends React.Component {
    construtor(props) {
      super(props)
      this.state = {...}
    }
    render() {
      ...
    }
  }
  /*
  초기 상태를 설정하면서 다른 로직도 추가할 수 있다. 예를 들어 new Date()를 사용하여 currentTime 값을 설정한다고 하자.
  toLocaleString()을 사용하면 다음과 같이 사용자의 우치에 맞는 적절한 날짜시간 형식을 보여줄 수 있다.
  */
  // 시계 컴포넌트 클래스의 생성자
  class Clock extends React.Component {
    constructor(props) {
      super(props)
      this.state = {currentTime: (new Date()).toLocaleString('en')}
    }
    ...
  }
  /*
  this.state의 값은 반드시 객체여야 한다. 여기서는 ES6 constructor()에 대해서는
  cf: 부록 E와 ES6 치트시트(https://github.om/azat-co/heatsheets/tree/master/es6)
  요점은 객체지향 프로그래밍 언어에서 클래스의 인스턴스가 생성될 때 constructor()가 호출 된다는 것이다.
  생성자 메서드의 이름은 반드시 constructor로 한다.
  ES6의 규칙이라고 생각하자. 또한 부모 클래스가 있는 클래스에서 constructor() 메서드를 생성하면 그 안에서
  거의 항상 super()를 호출한다. 그렇지 않으면 부모 클래스의 생성자가 실행되지 않는다.
  만약 이렇게 상속으로 클래스를 구현하는 경우에 constructor() 메서드를 따로 작성하지 않으면 super()를 호출한 것으로 가정한다.

  Note: 클래스 속성
    기술 위원회 39(Technial Commiteee 39, TC39: ECMAScript 표준을 제정하는 위원회)에서 
    추후 버전 ECMAScript의 클래스 문법에 클래스 속성을 추가해 주면 좋겠다.
    클래스 속성 기능이 지원되면 state를 constructor에서 선언하지 않고, 클래스 몸체에 선언할 수 있다.

    class Clock extends React.Component {
      state = {
        ...
      }
    }

    클래스 필드/속성/프로퍼티에 대한 제안은 https://github.com/jeffmo/es-class-fiedls-and-static-properties에 있다.
    제안이 이뤄지고 몇 년이 지났지만, 이 책을 집필하는 2017년 3월 현재 아직 Stage 2에 머무르고 있다.(Stage 0부터 시작하며 Stage 4가 최종적으로 표준 단계다.)
    그렇기 때문에 브라우저에서는 아직 사용할 수 없다. 이 기능은 기본적으로 작동하지 않는다.(이 책을 쓰는 현재 클래스 필드를 지원하는 브라우저가 없다.)

    브라우저에서 코드를 작동시키려면 Babel, Traceur 같은 트랜스파일러나 TypeScript 등을 이용해야 한다. 
    클래스 프로퍼티에 대한 ECMAScript 호환성 표(http://kangax.github.io/compat-table/esnext)를 참고하거나 필요하다면 ES.Next Babel preset을 사용하길 바란다.

    여기서 정한 currentTime은 임의의 이름이다. 나중에 상태에 접근하고 갱신하려면 같은 이름을 사용해야 한다. 
    필요할 때 사용할 수만 있다면, 상태의 이름은 마음대로 정할 수 있다.
  */
  // 상태 객체는 배열이나 다른 객체를 중첩해서 가질 수 있다. 다음 예제에서는 책을 상태 객체에 배열로 담았다.
  class Content extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        githubName: 'azat-co',
        books: [
          'pro express.js',
          'pratical node.js',
          'rapid prototyping with js'
        ]
      }
    }
    render() {
      ...
    }
  }
  /*
  constructor() 메서드는 앞의 컴포넌트 클래스에서 React 엘리먼트가 생성되는 시점에 한 번만 호출된다.
  이렇게 해서 constructor() 메서드 내에서 한 번만 this.state로 직접 상태를 선언할 수 있다.
  이 외의 부분에서는 this.state = ...으로 직접 상태를 선언하지 않도록 해야 한다.
  만약 직접 선언하면 의도하지 않은 결과를 낳을 수 있다.

  Note: React에서 컴포넌트를 생성하기 위해 사용하는 createClass() 메서드에서는 초기 상태 설정에 getInitialState()를 사용한다.
  createClass()에 대한 자세한 정보와 ES5로 작성한 예제는 2.2절의 노트 "ES6+/ES2015+와 React"를 살펴보기 바란다.

  이렇게 하면 첫 번째 값을 입력해서 보여줄 뿐, 곧 시간이 지나버릴 것이다. 1초만에 말이다.
  다행히도 React는 상태를 갱신하는 방법이 있다.
  */
```

#### 상태 갱신하기
```javascript
  /*
  클래스 메서드인 this.setState(data, callback)를 사용하면 상태를 변경할 수 있다.
  이 메서드를 실행하면 React는 전달하는 data를 현재 상태에 병합하고 render()를 호출한다.
  이후에 React가 callback 함수를 실행한다.

  setState()에 콜백함수를 사용할 수 있다는 점은 중요하다. setState()가 비동기로 작동하기 때문이다.
  새로운 상태에 의존하는 경우, 콜백함수를 사용해야 새로운 상태가 적용된 후에 필요한 작업을 수행할 수 있다.

  setState()가 완료되길 기다리지 않고 새로운 상태에 의존하는 작업을 수행하는 것은 비동기(asynchronous) 작업을 동기(synchronous)처럼 다루는 것이다.
  이 경우 갱신될 새로운 상태 값에 의존하는 코드를 작성하면 버그가 생길 수 있는데, 상태 객체가 이전 값을 가진 이전의 상태 객체로 남아있기 때문이다.

  지금까지는 시간을 상태에서 렌더링 했다. 초기 상태를 설정했지만, 시간을 매 초마다 갱신해야 한다.
  브라우저의 타이머 함수인 setInterval()(http://mng.bz/P2d6)을 사용하면 그렇게 할 수 있다.
  매 n 밀리초(1000분의 1초)마다 상태를 갱신할 수 있다. setInterval() 메서드는 최신 브라우저에서 전역에 구현되어 있으며, 라이브러리나 접두사 없이 사용할 수 있다.
  */
  setInterval(() => {
    console.log('Updating time...')
    this.setState({
      currentTime: (new Date()).toLocaleString('en')
    })
  }, 1000)

  /*
  시계를 시작하려면 setInterval()을 한 번 호출해야 한다. setInterval()을 호출하는 launchClock() 메서드를 생성하자.
  생성자에서 launchClock()를 호출한다. 다음 예제 코드는 완성된 Clock 컴포넌트다.
  */
  // 상태를 이용한 Clock 컴포넌트 구현
  class Clock extends React.Component {
    constructor(props) {
      super(props)
      this.launchClock()
      this.state = {
        currentTime: (new Date()).toLocaleString('en')
      }
    }
    launhClock() {
      setInterval(() => {
        console.log('Updating time...')
        this.setState({
          currentTime: (newDate()).toLocaleString('en')
        })
      }, 1000)
    }
    render() {
      console.log('Rendering Clock...')
      return <div>{this.state.currentTime}</div>
    }
  }

  /*
  예제 코드에서는 setState()를 생성자가 실행하는 launchClock()에서만 사용했지만, 실제로는 다른 곳에서도 사용할 수 있다.
  일반적으로 setState()는 이벤트 핸들러나 데이터 수신 또는 갱신을 처리하는 콜백함수에서 호출된다.

  Tip: this.state.name = 'new name' 같은 방식으로 상태를 변경하는 것은 아무 효과가 없다. 
  이렇게 하면 렌더링을 다시 하지도 않고, 실제 DOM을 갱신할 수도 없다. 대부분의 경우에 setState()를 거치지 않고
  직접 상태 객체를 변경하는 것은 안티패턴이므로 피해야 한다.

  setState()로 전달하는 상태는 상태 객체의 일부분만 갱신한다는 것을 알고 있어야 한다.(일부분만 수정하거나 병합하고 완벽하게 교체하지는 않는다.)
  매번 상태 객체를 완전히 바꾸지 않는다. 따라서 상태 객체에서 세 항목이 있을 때 하나를 변경한다면, 나머지 둘은 그대로 유지되어 바뀌지 않는다.
  다음 예제 코드에서 userEmail과 userId는 그대로 유지된다.
  */
  constructor(props) {
    super(props)
    this.state = {
      userName: 'Azat Nardan',
      userEmail: 'hi@azat.co',
      userId: 3967
    }
  }
  updateValues() {
    this.setState({userName: 'Azat'})
  }

  /*
  만약 상태 세 가지를 모두 갱신하고 싶다면 setState()에 이 상태에 대한 새로운 값을 명시적으로 전달해야 한다.
  (this.replaceState() 메서드를 사용하는 코드를 오래된 React 코드에서 여전히 찾아볼 수도 있겠지만, 
  이 방법은 더 이상 작동하지 않고 지원도 종료됨. 이름에서 알 수 있듯이 이 메서드는 상태 객체에 있는 모든 키-값 쌍을 교체하는 데 사용됨)
  
  setState()가 render()를 실행시킨다는 점도 기억해야 한다. 대부분의 경우를 이 방식으로 처리한다.
  코드가
  */
```