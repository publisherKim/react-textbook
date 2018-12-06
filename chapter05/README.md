## 5장 React 컴포넌트 라이프사이클 이벤트
```
  - React 컴포넌트 라이프사이클 이벤트 한눈에 살펴보기
  - 이벤트 카테고리의 이해
  - 이벤트의 정의
  - 마운팅, 갱신, 언마운팅, 이벤트

  컴포넌트를 좀 더 세밀하게 제어해야 할 경우가 있다.
    - 화면 너비에 따라 크기가 변경되는 라디오 버튼 컴포넌트를 만드는 경우
    - 서버에 XHR 요청을 보내 정보를 가져오는데 메뉴 컴포넌트를 개발해야 하는 경우 등

  세밀하게 제어하기 위한 방법으로 컴포넌트 인스턴스 생성 전에 필요한 로직을 구현한 후 
  새로운 속성을 제공해서 인스턴스를 재생성하는 방법을 생각해 볼 수 있다.
  그러나 이 방법으로는 독립적인 컴포넌트를 생성할 수 없으므로 
  React가 제공하는 컴포넌트 기반 아키텍처의 이점을 살리기 어렵다
  (구현 가능하다고 해서 철학을 어기면 안된다.)

  가장 좋은 방법은 컴포넌트 라이프사이클 이벤트를 사용하는 것이다. 
  마운팅 이벤트를 이용해서 컴포넌트에 필요한 로직을 주입할 수 있다.
  그 외에도 다른 이벤트를 이용하면, 뷰가 다시 렌더링하는 것을 결정하는 
  특별한 로직을 제공해서 좀 더 똑똑한 컴포넌트를 만들 수도 있다.
  (Reacct의 기본 알고리즘을 덮어쓴다. 흥미로울듯...)

  라디오 버튼과 메뉴 컴포넌트의 사례를 다시 생각해보면 버튼 컴포넌트를 생성할 때 
  window의 이벤트에 연결한 다음, 컴포넌트를 제거할 떄 연결을 제거할 수 있다.
  메뉴 컴포넌트는 React 엘리먼트를 실제 DOM에 삽입하고 나서 서버에서 데이터를 가져올 수 있다.
```

### React 컴포넌트 라이프사이클 이벤트 한눈에 살펴보기
```
  React는 라이프사이클 이벤트를 기반으로 컴포넌트의 동작을 제어하고 사용자 정의를 할 수 있다.
  (컴퓨터 프로그래밍에서 말하는 후킹과 비슷하다.)
  일종의 하이재킹처럼 사건이 발생하면 가로채서 새로운 명령을 수행한다라고 보면 될것 같다.

  라이프싸이클 이벤트 분류
    - 마운팅이벤트: React 엘리먼트(컴포넌트 클래스의 인스턴스)를 DOM 노드에 추가할 때 발생한다.
    - 갱신이벤트: 속성이나 상태가 변경되어 React 엘리먼트를 갱신할 때 발생한다.
    - 언마운팅이벤트: React 엘리먼트를 DOM에서 제거할 때 발생한다.

  모든 React 컴포넌트는 라이프사이클 이벤트가 있다.
  라이프사이클 이벤트는 컴포넌트가 수행한 작업이나 앞으로 수행할 작업에 따라 특정 시점에 실행된다.
  어떤 이벤트는 한 번만 실행되기도 하고, 어떤 이벤트는 계속해서 실행된다.

  라이프사이클 이벤트를 이용하면 컴포넌트의 작업 수행을 향상시키는 사용자 정의 로직을 구현할 수 있다.
  예를 들면 라이프사이클 이벤트 중에는 재렌더링 여부를 정할 수 있는 이벤트가 있다.
  이 이벤트를 이용하면 불필요하게 렌더링되는 것을 방지하여 성능을 개선할 수 있다.
  다른 사용 방법으로는 서버에서 데이터를 가져오거나, 
  DOM 이벤트 또는 다른 프론트엔드 라이브러리와 통합 할 때 사용할 수 있다.
  각 이벤트 유형에 따른 작동 방식과 성질, 실행 순서에 대해서 알아보자.
```

### 이벤트 분류
```
  React는 여러 가지 컴포넌트 이벤트를 세 가지 유형으로 정의한다.
  각 분류에 따라 이벤트가 발생되는 횟수가 다르다.
    - 마운팅: React가 이벤트를 한 번만 실행한다.
    - 갱신: React가 이벤트를 여러 번 실행한다.
    - 언마운팅: React가 이벤트를 한 번만 실행한다.
  
  cf: p150 그림 5-1 컴포넌트 라이프사이클에 따라 실행되는 이벤트의 유형과 각 이벤트 유형에 따른 실행 횟수
  컴포넌트 라이프사이클 ----------------------------------------->
  마운팅(한번만 실행) -> 갱신(여러 번 실행) -> 언마운팅(한 번만 실행)

  라이프사이클 이벤트와 함께 constructor()도 포함시켜 컴포넌트의 전체 라이프사이클의 실행 순서를 살펴보면 다음과 같다.
  (갱신은 여러 번 일어날 수 있다.)
    - constructor(): 엘리먼트를 생성하여 기본 속성과 상태를 설정할 때 실행된다.
    - 마운팅:
        1. componentWillMount(): DOM에 삽입하기 전에 실행된다.
        2. componentDidMount(): DOM에 삽입되어 렌더링이 완료된 후 실행된다.
    - 갱신:
        1. componentWillReceiveProps(nextProps): 컴포넌트가 속성을 받기 직전에 실행 된다.
        2. shouldComponentUpdate(nextProps, nextState): 컴포넌트가 갱신되는 조건을 정의해서 재렌더링을 최적화할 수 있다. 
           불 값을 반환한다.
        3. componentWillUpdate(nextProps, nextState): 컴포넌트가 갱신되기 직전에 실행된다.
        4. componentDidUpdate(prevProps, prevState): 컴포넌트가 갱신되기 직전에 실행된다.
    - 언마운팅:
        1. componentWillUnmount(): 컴포넌트를 DOM에서 제거하기 전에 실행되며, 구독한 이벤트를 제거하거나 다른 정리 작업을 수행할 수 있다.

  보통 개발자들은 이벤트 이름을 보면 어느 시점에 이벤트가 실행되는지 명확하게 알 수 있다. 
  예를 들어 componentDidUpdate()는 컴포넌트가 갱신된 후에 실행된다. 다른 경우에는 미묘한 차이가 있다.
  다음 표는 위에서 아래로 라이프사이클 이벤트의 실행 순서와 속성 또는 상태의 변경에 영향을 받는 경우를 보여준다.
  (컴포넌트 속성 갱신과 컴포넌트 상태 갱신 열에서 확인 가능하다.)

  * p151 표 5-1 라이프사이클 이벤트의 속성 및 상태의 관계
  마운팅                    컴포넌트 속성 갱신                    컴포넌트 상태 갱신                    forceUpdate()를 이용한 갱신                   언마운팅
  constructor()            x                                    x                                    x                                            x
  componntWillMount()      x                                    x                                    x                                            x
  x                        componentWillReceiveProps()          x                                    x                                            x
  x                        shouldComponentUpdate()              shouldComponentUpdate()              x                                            x
  x                        componentWillUpdate()                componentWillUpdate()                componentWillUpdae()                         x
  render()                 render()                             render()                             render()                                     x
  x                        componentDidUpdate()                 componentDidUpdate()                 componentDidUpdate()                         x
  componentDidMount()      x                                    x                                    x                                            x
  x                        x                                    x                                    x                                            componentDidMount()

  this.forceUpdate()를 호출하는 경우에 컴포넌트가 재렌더링된다. 이름에서 알 수 있듯이, 이 메서드는 갱신을 강제한다. 
  몇 가지 이유는 상태나 속성을 갱신해서는 원하는 대로 다시 렌더링할 수 없는 경우 this.forceUpdate()를 사용할 수 밖에 없다.
  예를 들어 render()에서 사용하는 데이터가 속성이나 상태에 속하지 않는 경우에 해당 데이터가 변경되면 수동으로 갱신해야 한다.
  일반적으로 (React팀에 따르면) this.forceUpdate() 메서드를 사용하지 않는 것이 좋은데, 
  이 메서드를 사용하면 컴포넌트의 순수성을 해치기 때문이다.(다음에 나오는 노트 '순수함수'를 참고하기 바란다.)

  Note: 순수함수
    React뿐만 아니라 컴퓨터 공학에서 말하는 일반적인 순수함수의 특징은 다음과 같다.
      - 같은 이력에 대해 항상 같은 출력
      - 부수효과가 없다(외부 상태를 변경하지 않는다).
      - 외부 상태에 의존하지 않는다.
    
    예를 들어 f(x) = 2x는 입력 값이 두 배가 되는 순수함수다. 자바스크립트나 Node.js에서는 let f = (n) => 2 * n 이라고 쓸 수 있다.
      let f = (n) => 2 * n
      console.log(f(7))
    
    순수하지 않은 함수는 값을 두 배로 만들기 위해 다음과 같은 방식을 사용한다
    (한 줄로 작성한 화살표 함수에 중괄호를 추가해서 암묵적으로 반환되지 않도록 했다.)
      let sharedStateNumber = 7
      let double
      let f = () => {double = 2 * sharedStateNumer}
      f()
      console.log(double)

    순수함수는 함수형 프로그래밍의 기초다. 함수형 프로그래밍은 상태를 가능한 한 최소화한다. 개발자, 
    특히 함수형 프로그래밍을 사용하는 프로그래머는 순수함수를 가장 선호하는데, 
    순수함수를 사용하면 공유 상태(shared state)를 완화하여 개발 과정이 단순해지고 개별 로직을 분리할 수 있기 때문이다.

    어떤 면에서는 함수형 프로그래밍과 객체지향 프로그래밍 사이에 모순점이 있다. 
    함수형 프로그래밍 지지자들은 Fortran과 Java가 프로그래밍의 막다른 길이었으며, Lisp(요즘은 Clojure와 Elm)야말로 
    프로그래밍이 나아가야 할 방향이라고 말한다. 관심을 가져야 할 논쟁이다. 내 개인 취향도 함수형 프로그래밍에 더 관심이 많다.

    함수형 프로그래밍을 업무에서 활용하지 않더라도 공부해 두는 것이 더 나은 프로그래머가 되는데 도움이 될거라고 생각한다.
```

### 이벤트 구현
```
  라이프사이클 이벤트를 구현하려면 클래스에 메서드를 정의해야 한다. 이것은 React의 규칙이다.
  React는 이벤트 이름에 해당하는 메서드가 있는지 확인한다. 
  React가 메서드를 찾으면 해당 메서드를 실행한다.
  그렇지 않은 경우에는 일반적인 흐름대로 진행된다.
  이벤트 이름은 자바스크립트의 다른 이름들과 마찬가지로 대소문자를 구분해서 작성해야 한다.

  다시 말해, React는 특정 메서드가 정의되어 있다면 컴포넌트의 실행주기 중에 이 메서드를 호출한다.
  예를 들어 componentDidMount()를 정의하면 React는 컴포넌트 클래스의 엘리먼트가 DOM에 추가되었을 때 이 메서드를 호출한다.
  componentDidMount()는 표 5-1에서 마운팅으로 분류되어 있고, 컴포넌트 클래스의 인스턴스마다 한 번만 호출된다.

    class Clock extends React.Component {
      componentDidMount() {

      }
      ...
    }

  만약 componentDidMount() 메서드를 정의하지 않는다면 React는 이 이벤트에 대해 아무런 코드도 실행하지 않는다. 
  따라서 메서드 이름은 이벤트 이름과 일치해야 한다. 앞으로 이 장에서 이벤트, 이벤트 핸들러, 메서드라는 단어를 혼용하여 설명할 것이다.

  이름에서 짐작할 수 있겠지만, componentDidMount() 메서드는 컴포넌트가 DOM에 추가될 때 실행된다.
  이 메서드는 다른 프론트엔드 프레임워크나 라이브러리와 통합하는 코드나, 서버에 XHR 요청을 보내는 코드를 작성할 때 사용된다.
  왜냐하면 라이프사이클의 이 시점에서는 컴포넌트의 엘리먼트가 실제 DOM에 반영되어 자식 엘리먼트를 포함한 모든 엘리먼트에 접근할 수 있기 때문이다.

  이 장을 시작할 때 언급한 크기를 변경해야 하는 라디오 버튼 컴포넌트와 서버에서 데이터를 가져오는 문제로 돌아가보자.
  먼저 componentDidMount()에서 window.resize 이벤트를 구독하는 이벤트 리스너를 생성할 수 있다.
  다음으로 componentDidMount()에서 XHR 요청을 보낸 후 서버에서 응답이 오면 상태를 갱신하게 만들 수 있다.

  동형 자바스크립트로 서버와 브라우저에서 같은 컴포넌트를 사용하는 경우에도 componentDidMount()는 똑같이 중요하다.
  componentDidMount() 메서드에 브라우저만을 위한 로직을 넣어도 서버 측에서는 호출하지 않고 브라우저에서만 호출하므로 안심해도 좋다.
  
  대부분의 개발자는 예제를 보면서 배우는 것에 익숙하다. 
  따라서 componentDidMount()에서 DOM 정보를 콘솔에 출력하는 단순한 예제를 살펴보자.
  이렇게 할 수 있는 이유는 componentDidMount()가 모든 렌더링 작업이 완료된 후에 실행되기 때문이다.
  이 시점에서는 DOM 요소에 접근이 가능하다.

  컴포넌트 라이프사이클 이벤트에 대한 이벤트 리스너를 생성하는 것은 간단하다.
  컴포넌트나 클래스에 메서드를 정의하면 된다.
  componentWillMount()를 추가하여 실제 DOM이 존재하지 않는다는 점을 비교해보자.

  DOM 노드에 대한 정보는 React DOM의 유틸리티 함수인 ReactDOM.findDOMNode()에 클래스를 전달하여 얻는다.
  DOM은 카멜 표기법으로 작성하지 않고 모두 대문자로 작성한다는 점을 주의하자.
    class Content extends React.Component {
      componentWillMount() {
        console.log(ReactDOM.findDOMNode(this))
      }
      componentDidMount() {
        console.dir(ReactDOM.findDOMNode(this))
      }
      render() {
        return ()
      }
    }
  
  개발자 콘솔에서 다음과 같은 출력 결과를 확인할 수 있다. componentDidMount()가 실제 DOM 요소가 생성된 후에 실행된다는 것을 알 수 있다.
  html
  null
  div
```

### 모든 이벤트 실행하기
```javascript
  /*
  logger 파일을 작성하여 클래스처럼 코드를 재사용하게 만들수 있다.
  logger 믹스인은 디버깅에 유용하다.
  재렌더링 시점 또는 재렌더링이 완료되는 시점의 모든 이벤트, 속성, 상태를 표시한다.
  */
  // Logger 컴포넌트의 렌더링과 세 번의 갱신 실행
  class Content extends React.Component {
    constructor(props) {
      super(props)
      this.launchClock()
      this.state = {
        counter: 0,
        currentTime: (new Date()).toLocaleString()
      }
    }
    launchClcock() {
      setInterval(() => {
        this.setState({
          counter: ++this.state.counter,
          currentTime: (new Date()).toLocaleString()
        })
      }, 1000)
    }
    render() {
      if (this.state.counter > 2) return
      return <Logger time="{this.state.currentTime}"></Logger>
    }
  }

  // 컴포넌트 라이프사이클 이벤트 관찰
  class Logger extends React.Component {
    constructor(props) {
      super(props)
      console.log('contructor')
    }
    componentWillMont() {
      console.log('componentWillMount excute')
    }
    componentDidMount() {
      console.log('componentDidMount exute')
      console.log('DOM node: ', ReactDOM.findDOMNode(this))
    }
    componentWillReceiveProps(newProps) {
      console.log('componentWillReceiveProps excute')
      console.log('new props: ', newProps)
    }
    shouldComponentUpdate(newProps, newState) {
      console.log('shouldComponentUpdate excute')
      console.log('new props: ', newProps)
      console.log('new state: ', newState)
      return true
    }
    componentWillUpdate(newProps, newState) {
      console.log('componentWillUpdate excute')
      console.log('new props: ', newProps)
      console.log('new state: ', newState)
    }
    componentDidUpdate(oldProps, oldState) {
      console.log('componentDidUpdate excute')
      console.log('old props: ', oldProps)
      console.log('old state: ', oldState)
    }
    componentWillUnmount() {
      console.log('componentWillUnmount')
    }
    render() {
      console.log('rendering... Display')
      return (
        <div>{this.props.time}</div>
      )
    }
  }
  /*
    이 웹 페이지를 실행하면 Logger 컴포넌트의 함수와 라이프사이클 이벤트가 콘솔에 로그를 출력한다.
    마운팅 이벤트는 한 번만 실행된다.
    로그에서 확인할 수 있다.
    
    Context 컴포넌트의 카운터 값이 3이 되면 render 메서드에서 Logger 컴포넌트를 더 이상 사용하지 않고
    컴포넌트가 DOM에서 제거되어 언마운팅 이벤트가 발생한다.

    컴포넌트 라이프사이클 이벤트를 컴포넌트에서 데이터를 가져오는 등의 로직을 구현할때 사용하면 된다.
  */
```

### 마운팅 이벤트
```
  마운팅 이벤트 유형은 모두 실제 DOM에 컴포넌트를 추가하는 것에 대한 이벤트다.
  마운팅은 React 엘리먼트가 DOM에 노출되는 것이라고 생각하자.
  주로 ReactDOM.render()에서 컴포넌트를 사용하거나, 다른 고차 컴포넌트에서 render()를 호출할 때
  실제 DOM에 렌더링 된다. 마운팅 이벤트의 종류는 다음과 같다.
    - componentWillMount(): React 엘리먼트가 실제 DOM에 곧 추가될 것을 알려준다.
    - componentDidMount(): React 엘리먼트를 실제 DOM에 추가한 시점으로, 이 시점의 React 엘리먼트는 DOM 노드다.

  constructor()는 componentWillMount()보다 먼저 실행된다. 또한, React는 엘리먼트를 먼저 렌더링하고 나서 DOM에 추가한다.(여기서 말하는 렌더링은 컴포넌트 클래스의 render()를 호출하는 것을 말하며, 실제 DOM에 그리는 것이 아니다.)
  componentWillMount()와 componentDidMount() 사이의 이벤트는 이전 p151 표 5-1을 참고하자
```

#### componentWillMount()
```
  컴포넌트 라이프사이클에서 componentWillMount()가 단 한 번만 실행된다.
  실행 시점은 초기 렌더링 직전이다.

  ReactDOM.render()를 호출해서 React 엘리먼트를 브라우저에 렌더링하는 시점에서 componentWillMount()가 실행된다.
  React 엘리먼트를 실제 DOM 노드에 추가하는 시점으로 생각하자.
  이 과정은 브라우저와 프론트엔드에서 이뤄진다.

  React 컴포넌트를 서버(동형 자바스크립트를 이용한 벡엔드를 말한다.)에서 렌더링하면 기본적으로 HTML 문자열을 얻을 수 있는데, 서버에는 DOM이 없으므로 HTML을 DOM에 추가하는 작업은 없지만, 서버 렌더링 과정에서도 componentWillMount()는 실행된다!

  상태에 있는 currentTime을 Date와 setInterval()로 갱신하는 것을 살펴 봤다. 
  constructor()에서 launchClock()을 호출해서 일련의 갱신을 수행하도록 했다. 
  componentWillMount()에서도 그렇게 할수 있다. 
  일반적으로 상태를 변경하면 다시 렌더링 된다.
  componentWillMount() 메서드에서 setState()를 이용해서 상태를 갱신하거나, 
  Clock 컴포넌트의 경우처럼 일정한 간격으로 갱신되도록 처리하면, render()에서 갱신된 객체를 사용한다.
  가장 좋은 점은 componentWillMount()에서 갱신하는 새로운 상태에 차이점이 있어도 재랜더링 되지 않는다는 점인데,
  이것이 가능한 이유는 render()에서 새로운 상태 값을 가져오기 때문이다. 
  다시 말해 componentWill mount()에서 setState()를 실행할 수 있다.
  render()는 새로운 상태를 가져와서 렌더링하므로 상태 변경에 따른 추가적인 렌더링을 하지 않는다.
```

### componentDidMount()
```jsx
  /*
  componentDidMount()는 초기 렌더링을 마친 후에 실행된다.
  componentDidMount()는 브라우저에서만 한 번 실행되고, 서버 렌더링에서는 실행되지 않는다.
  XHR 요청처럼 브라우저에서만 실행해야 하는 코드를 구현할 때 편리하게 사용할 수 있다.

  componentDidMount()에서 자식 엘리먼트를 참조로 접근할 수 있다.
  (예를 들면 엘리먼트에 해당하는 DOM 표현에 접근할 수 있다.)
  자식 컴포넌트의 componentDidMount() 메서드는 부모 컴포넌트의 componentDidMount()보다 먼저 호출된다.

  componentDidMount() 이벤트는 다른 자바스크립트 라이브러리를 통합하기에 가장 적절한 위치다.
  예를 들면 먼저 사용자 정보 목록이 실린 JSON 데이터를 가져올 수 있다.
  그 후에 사용자 정보를 Twiter Bootstrap의 table을 이용해서 p160 5-5처럼 표를 그릴 수 있다.

  project structure
    /users
      /css
        bootstrap.css
      /js
        react.js
        react-dom.js
        script.js
        - users.js
      /jsx
        script.jsx
        users.jsx
      index.html
      real-user-data.json
  
  componentDidMount()에서 DOM 요소에 접근할 수 있고, 
  새로운 fetch() API를 이용해서 XHR/AJAX 요청을 보내 데이터를 가져올 수 있다.
  fetch(this.props['data-url'])
    .then(res => res.json())
    .then(users => this.setState({users: users}))

  Note: Fetch API
        Fetch API(http://mng.bz/mbMe)는 promise를 이용해 XHR 요청을 보낼 수 있는 통일된 방식이다.
        대부분의 최신 브라우저에서 사용할 수 있지만, 
        API 명세(https://fetch.spec.whatwg.org)와
        표준(https://github.com/whatwg/fetch)을 살펴보고, 
        구현하려는 앱의 지운대상 브라우저에서 사용이 가능한지 확인후 사용
        사용법: URL을 전달하고, 필요에 따라 promise에 then을 원하는 대로 추가 가능하다.
          fetch('http://node.university/api/credit_cards/')
            .then(res => {
              return res.blob()
            })
            .then(blob => {
              // Process blob
            })
            .catch(err => {
              console.log('A problem with your fetch operation: ' + error.message)
            })

        만약 지원대상 브라우저가 fetch()를 지원하지 않는다면 폴리필을 사용하거나, 다른 HTTP 에이전트 라이브러인
        superagent(https://github.com/visionmedia/superagent),
        request(https://github.com/request/request),
        axios(https://github.com/mazbriskie/axios) 등을 이용하거나,
        jQuery의 $.ajax()(http://api.jquery.com/jquery.ajax)나 $.get()을 사용할 수 있다.

  Fetch API를 이용한 XHR 요청을 componentDidMount()에 작성할 수 있다.
  XHR 요청을 위한 코드를 componentWillMount()에 작성하면 로딩을 최적화할 수 있을 것 같지만,
  그렇게 할 경우에는 두 가지 문제가 있다.
  렌더링이 완료되는 것보다 더 빨리 서버에서 응다이 오는 경우에는 DOM에 추가하지도 않은 엘리먼트를
  다시 렌더링하게 되어 의도하지 않은 결과를 낳을 수 있다.
  또한, 서버 측에서 컴포넌트를 사용하는 경우에는 componentWillMount()가 서버에서도 실행된다.

  이제 componentDidMount()에서 데이터를 가져오는 컴포넌트를 전체적으로 살펴보자.
  */
  // 표에 입력할 데이터 가져오기
  class Users extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        users: []
      }
    }
    componentDidMount() {
      fetch(this.props['data-url'])
        .then(res => res.json())
        .then(users => this.setState({users: users}))
    }
    render() {
      return <div className="container">
        <h1>Lis of Users</h1>
        <table className="table-striped table-codensed table table-bordered table-hover">
          <tbody>
            {this.state.users.map(user) =>
              <tr key={user.id}>
                <td>{user.first_name} {user.last_name}</td>
                <td> {user.email}</td>
                <td> {user.ip_address}</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    }
  }
  /*
    생성자에서 users를 빈 배열로 초기화한다.
    이렇게 하면 render()에서 해당 상태가 존재하는지 확인하지 않아도 된다.
    상태를 초기화하지 않고 undefined 값으로 두면, 
    반복적으로 상태의 존재 여부를 확인하는 코드를 작성하게 되거나 버그가 생길 수도 있다.
    시간 낭비일 뿐만 아니라 반복해서 작성해야 하므로 피곤한다.
    초깃값을 설정해 놓으면 불편을 피할 수 있다!
  */
  // 안티패턴: 이렇게 하지 말자!
  class Users extends React.Component {
    constructor(props) {
      super(props)
    }
    ...
    render() {
      return <div className="container">
        <h1>List of Users</h1>
        <table className="table-striped table-condensed table table-bordered table-hover">
          <tbody>
          {(this.state.users && this.state.users.length > 0 ?
            this.state.users.map(user => 
              <tr key={user.id}>
                <td>{user.first_name} {user.last_name}</td>
                <td> {user.email}</td>
                <td> {user.ip_address}</td>
              </tr>) : ''
            }
          </tbody>
        </table>
      </div>
    }
  }
```

### 갱신이벤트
```
  마운팅 이벤트는 React를 바깥 세상, 즉 다른 프레임워크, 라이브러리, 데이터 저장소 등과 연결하는 데 사용하곤 한다.
  갱신 이벤트는 컴포넌트를 갱신하는 것과 관련되어 있다.
  갱신 이벤트를 컴포넌트 라이프사이클의 처음부터 끝까지 순서대로 정리하면 다음과 같다.
  1. compnentWillReceiveProps(newProps)
  2. shouldComponentUpdate()
  3. componentWillUpdate()
  4. componentDidUpdate()

  p163 표 5-2 컴포넌트 갱신에 따라 호출되는 라이프사이클 이벤트
  컴포넌트 속성 갱신                  컴포넌트 상태 갱신                    forceUpdate() 호출을 이용한 갱신
  componentWillReceiveProps()        
  shouldComponentUpdate()            shouldComponentUpdate()
  componentWillUpdate()              componentWillUpdate()               componentWillUpdate()
  render()                           render()                            render()
  componentDidUpdate()               componentDidUpdate()                componentDidUpdate()
```

#### componentWillReceiveProps(newProps)
```
  componeneWillReceiveProps(newProps)는 컴포넌트가 새로운 속성을 전달받을 때 실행된다.
  이 단계를 들어오는 속성의 전환이라고 한다. 
  componentWillReceiveProps(newProps)는 컴포넌트에 새로운 속성을 받아오는 시점에 끼어들어서 render()를 
  호출하기 전에 이루 로직을 추가할 수 있다.

  componentWillReceviveProps(newProps) 메서드 새로운 속성을 인자로 받는다. 
  컴포넌트를 최초로 렌더링할 때는 실행되지 않는다.
  이 메서드는 새로운 속성을 전달받고 다시 렌더링이 이뤄 지기 전,
  새로운 속성에 따라 상태를 변경하는 경우에 유용하다.
  기존 속성 값은 this.props 객체에 있다.
  예를 들어 다음의 예제 코드는 불 값이 isVisible를 기준으로 하여, CSS에 사용할 opacity 상태 값을 변경한다.
  (true 이면 1, false이면 0)

    componentWillReceiveProps(newProps) {
      this.setState({
        opacity: (newProps.isVisible) ? 1 : 0
      })
    }

  일반적으로 componentWillReceiveProps(newProps)에서 setState() 메서드를 호출해도 추가로 다시 렌더링이 발생하지 않는다.

  새로운 속성을 전달받을 때, 반드시 새로운 값(현재 속성과 다른 값)을 가지고 있지 않을 수도 있다. 
  왜냐하면 React 입장에서는 속성 값이 변경되었는지 알 수 있는 방법이 없기 때문이다.
  따라서 componentWillReceiveProps(newProps)는 속성 값의 변경과 상관없이(부모 구조 또는 호출에 따라) 재랜더링이 이뤄질 때마다 실행된다.
  그러므로 newProps가 항상 현재 속성과 다른 값이라고 가정할 수 없다.

  또한, 재랜더링(render() 호출)이 반드시 실제 DOM의 변경을 의미하지도 않는다. 
  갱신을 할지 여부와 실제 DOM에서 무엇을 갱신할지에 대한 부분은 shouldComponentUpdate()와 보정 과정에 위임되어 있다.
```

#### shouldComponentUpdate()
```
  shouldComponentUpdate() 이벤트는 렌더링 직전에 실행된다. 렌더링은 새로운 속성이나 상태가 전달된 후에 이뤄진다.
  shouldComponentUpdate() 이벤트는 초기 렌더링 시점이나 forceUpdate() 호출 시에는 실행되지 않는다.

  shouldComponentUpdate()에서 false를 반환하도록 구현하면 React가 다시 렌더링되지 않도록 할 수 있다.
  변경된 부분이 없고, 불필요한 성능 저하를 피하고자 할 때(컴포넌트 수백 개를 다뤄야 할 때) 유용한 방법이다.
  예를 들어 다음 코드에서는 + 연산자를 이용해서 불 갑이 isVisible을 숫자로 변환한 후에 opacity 값과 비교한다.
    shouldComponentUpdate(newProps, newState) {
      return this.state.opacity !== + newProps.isVisible
    }

  일반적으로 componentWillReceiveProps(newProps)에서 setState() 메서드를 호출해도 추가로 다시 렌더링이 발생하지 않는다.

  새로운 속성을 전달받을 때, 반드시 새로운 값(현재 속성과 다른 값)을 가지고 있지 않을 수도 있다.
  왜냐하면 React 입장에서는 속성 값이 변경되었는지 알 수 있는 방법이 없기 때문이다.
  따라서 componentWillReceiveProps(newProps)는 속성 값의 변경과 상관없이 
  (부모 구조 또는 호출에 따라) 재렌더링이 이워질 때마다 실행된다.
  그러므로 newProps가 항상 현재 속성과 다른 값이라고 가정할 수 없다.

  또한, 재렌더링(render() 호출)이 반드시 실제 DOM의 변경을 의미하지도 않는다. 갱신을 할지 여부와 실제 DOM에서 무엇을 갱신할지에 
  대한 부분은 shouldComponentUpdate()와 보정 과정에 위임되어 있다.
```

#### shouldComponentUpdate()
```
  shouldComponentUpdate() 이벤트는 렌더링 직전에 실행된다.
  렌더링은 새로운 속성이나 상태가 전달된 후에 이뤄진다.
  shouldComponentUpdate() 이벤트는 초기 렌더링 시점이나 forceUpdate() 호출시에는 실행되지 않는다.

  shouldComponentUpdate()에서 false를 반환하도록 구현하면 React가 다시 렌더링되지 않도록 할 수 있다.
  변경된 부분이 없고, 불필요한 선능 저하를 피하고자 할 때(컴포넌트 수백 개를 다뤄야 할 때) 유요한 방법이다.
  예를 들어 다음 코드에서는 + 연산자를 이용해서 불 값이 isVisible을 숫자로 변환한 후에 opacity 값과 비교한다.
    shouldComponentUpdate(newProps, newState) {
      return this.state.opacity !== + newProps.isVisible
    }

  isVisible false이고 this.state.opacity는 0이면 render()를 실행하지 않는다. 
  또한 componentWillUpdate()와 componentDidUpdate()도 호출하지 않는다.
  즉, 컴포넌트의 재렌더링을 제어할 수 있다.
```

#### componentWillUpdate()
```
  componentWillUpdate()는 새로운 속성이나 상태를 받은 후 렌더링 직전에 호출된다.
  이 메서드는 초기 렌더링 시에는 호출되지 않는다.
  갱신 전에 필요한 준비 작업을 처리할 때 componentWillUpdate() 메서드를 사용하고, 
  이 메서드 내에서 this.setState()를 사용하는 것은 피하는 것이 좋다!
  컴포넌트를 갱신하는 중에 다시 갱신하도록 한다면 어떨지 생각해 보자.
  (아마도 무한루프를 탈것이다.)

  shouldComponentUpdate()가 false를 반환하면, componentWillUpdate()는 실행되지 않는다.
```

#### componentDidUpdate()
```
  componentDidUpdate() 이벤트는 컴포넌트의 갱신 결과가 실제 DOM에 반영된 직후에 실행된다.
  이 메서드도 초기 렌더링 시에는 호출되지 않는다.
  componentDidUpdate()는 컴포넌트가 갱신된 후에 DOM이나 그 외의 요소를 다루는 코드를 작성해야 할 때 유용하다.
  왜냐하면 이 시점에는 DOM에 모든 변경 사항이 반영되어 있기 때문이다.

  무언가 DOM에 반영하고 갱신해야 하는 경우가 있으면, DOM에서 제거해야 하는 경우도 있다.
  이어서 살펴볼 이벤트는 DOM에서 제거할 때 필요한 로직을 처리하기 위해 사용한다.
```

### 언마운팅 이벤트
```
  React에서 언마운팅이란 DOM에 요소를 분리하거나 제거하는 것을 의미한다.
  언마운팅 이벤트는 한 가지뿐이며, 컴포넌트 라이프사이클의 마지막 유형이다.
```

#### componentWillUnmount()
```
  componentWillUnmount() 이벤트는 DOM에서 컴포넌트가 제거되기 직전에 호출된다.
  정리하기 위한 코드를 이 메서드에 추가할 수 있다.
  예를 들어 타이머를 제거하거나, DOM 요소를 정리하거나, 
  componentDidMount()에서 연결한 이벤트를 제거할 수 있다.
```

### 간단한 예제
```
  온라인에 텍스를 저장할 수 있는 노트 웹 앱을 개발해야 한다고 가정해보자.
  컴포넌트를 구현했지만, 사용자는 창이나 탭을 실수로 닫으면 작성하던 내용이 없어진다는 의견을 보내왔다.
  
  - 지속성에 대한 처리
    대화상자를 구현하려면 특별한 window 이벤트를 연결해야 한다. 
    어려운 부분은 엘리먼트를 더 이상 사용하지 않는 경우의 처리인데,
    왜냐하면 엘리먼트를 제거해도 여기서 연결한 이벤트는 제거되지 않으므로 메모리 누수가 발생할 수 있다.(메모리 관리의 어려움)
    이 문제에 접근하는 가장 좋은 방법은 DOM에 추가하는 시점(마운팅)에 이벤트에 연결하고, DOM에서 제거하는 시점(언마운팅)에
    이밴트도 제거하는 것이다.

  project structure
    /note
      /jsx
        note.jsx
        script.jsx
      /js
        note.jsx
        react.js
        react-dom.js
        script.js
      index.html
  
  window.onbeforeunload는 브라우저에서 기본적으로 제공하는 이벤트로 간단하게 사용할 수 있다.
  (크로스 브라우징 지원을 위해 코드를 추가로 작성)

  window.addEventListener('beforeunload', (e) => {
    let confirmationMessage = '정말 닫으시겠습니까?';
    e.returnValue = confirmationMessage;
    return confirmationMessage;
  });

  window.onbeforeunload = function() {
    ...
    return confirmationMessage
  }

  이 코드를 componentDidMount()에 추가하여 이벤트 리스너를 등록하고, componentWillUnmount()에서
  이벤트 리스너를 제거하는 코드를 작성해보자.
```
```javascript
  // 이벤트 리스너의 등록과 제거
  class Note extends React.Component {
    confirmLeave(e) {
      let confirmationMessage = '정말 닫으시겠습니까?'
      e.returnValue = confirmationMessage
      return confirmationMessage
    }
    compnentDidMount() {
      console.log('beforeunload 이벤트에 confirmLeave 이벤트 리스너 등록')
      window.addEventListener('beforeunload', this.confirmLeave)
    }
    componentWillUnmount() {
      console.log('beforeunload 이벤트에 confirmLeave 이벤트 리스너 제거')
      window.removeEventListener('beforeunload', this.confirmLeave)
    }
    render() {
      console.log('Render')
      return <div>
        <p>부모 컴포넌트는 {this.props.secondsLeft}초 뒤에 제거된다.</p>
        <input type="text" />
      </div>
    }
  }
```