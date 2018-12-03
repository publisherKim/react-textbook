## 3장 JSX
```
  - JSX의 이해와 장점
  - Babel을 이용한 JSX 변환 설정
  - React와 JSX의 까다로운 부분

  JSX 리액트의 매우 훌륭한 기능중 하나
  
  기존 방식
  render() {
    return React.createElement(
      'div',
      { style: this.styles },
      React.createElment(
        'p',
        null,
        React.createElement(
          reactRouter.Link,
          { to: this.props.returnTo },
          'Back'
        )
      ),
      this.props.children
    );
  }

  이 코드를 보고 한눈에 엘리먼트가 세 개 있으며, React Router의 컴포넌트를 사용하고 있다는 사실을 알기는 일반적으로 쉽지 않다.
    - 평범한 HTML과 비교했을때 가독성이 좋은가?
    - 코드가 잘 이해된다고 생각하는가?
    - React core Team 도 인정 어 인정
  
  이런 가독성 문제를 해결하기 위해서 나온게 JSX 이다. 
```

### JSX의 정의와 단점
```
  JSX는 함수 호출과 객체 생성을 위한 문법적 편으를 제공하는 자바스크립트의 확장으로, 특히 React.createElement() 호출의 반복을 줄여준다.
  템플릿 엔진이나 HTML처럼 보일 수도 있지만 그렇지 않다.
  JSX는 React 엘리먼트를 생성하면서 자바스크립의 모든 기능을 쓸 수 있도록 도와준다.

  JSX 장점 정리:
    - 개발자경험(developer DX) 개선: 표현력이 뛰어나 코드를 읽기 쉽다. XML과 문법이 유사하여 중첩된 선언형 구조를 더 잘 나타낸다.
    - 팀의 생산성 향상: 전문 개발자 외에도 개발 지식이 있는 팀원이 있다면 직접 코드 수정 가능, JSX는 HTML과 비슷하여 이들에게도 친축(퍼블리셔에게도 런닝커브가 낮을 수 있다.)
    - 문법 오류와 코드량 감소: 작성해야 할 코드가 줄어들며, 이는 곧 실수나 반복으로 인한 스트레스를 줄여준다.

  JSX가 리액트에 필수적이는 않지만, 리엑트에 잘 어울린고 리액트를 만드는 제작자들도 사용을 매우 권장한다.

  JSX sample:
  <div>
    <HelloWorld>
    <br />
    <a href="https://naver.com">Great JS Resources</a>
  </div>

  Javascript로 작성시:
  React.createElement(
    "div",
    null,
    React.createElement(HelloWorld, null),
    React.createElement("br", null),
    React.createElement(
      "a",
      { href: "https://naver.com" },
      "Great JS Resources"
    )
  )

  JSX로 작성한 예제를 Babel 버전 6를 사용해서 자바스크립트로 변환하면 다음과 같다.
  "use strict"

  React.createElement(
    "div",
    null,
    " ",
    React.createElement(HelloWorld, null),
    " ",
    React.createElement("br", null),
    " ",
    React.createElement(
      "a",
      { href: "https://naver.com" },
      "Great JS Resources"
    ),
    " "
  )

  JSX는 본질적으로 XML과 문법이 비슷한 간단한 언어이다. 그렇지만 JSX는 UI 컴포넌트를 작성하는 방법을 바꿔놓았다.
  예전에는 개발자들이 HTML을 작성하고 MVC처럼 컨트롤러와 뷰에 해당하는 자바스크립트 코드를 작성하면서 
  여러 파일들을 열어 놓고 오라가락하곤 했다.(수정이나 코드 작성시 불편)
  그 시절에는 UI 개발에 대한 관심사 분리가 여러 개의 파일을 작성하는 방식으로 이뤄짐.
  정적인 HTML, 약간의 CSS, 자바스크립트 몇 줄로 만든 반짝인는 글자로 구성되면 웹 서비스는 훌륭함

  이제 이런 방식은 찾아보기 어렵다. 요즘 서비스들은 상호장용이 많고, 자바스크립트와 HTML이 강합게 결합되어
  여러 기능을 개발한다. React는 UI와 자바스킯트로 로직에 대한 설명을 한 곳으로 모아, 기존의 어긋난 관심사 분리를 수정함
  JSX를 사용하면 코드가 HTML처럼 보이므로 읽고 쓰기가 간편하다.
  특별한 이유가 없다면 React와 JSX를 이용한 방식으로 UI를 개발하는것이 좋다.

  JSX는 바벨등을 사용하여 표준 ECMASCript로 컴파일 할수 있다.
  cf: p87 그림 3-1 JSX를 자바스크립트로 변환하여 사용하기
  1.JSX -> 2. 트랜스 파일러(babel) -> 3. 자바스크립트 -> 4. 브라우저(렌더링)

  JSX 배우는건 학습 곡선이 매우 낮다. 그러므로 불편해 하지말고 배우는 것이 좋다.
  React.createElement() 사용을 <tagName>으로 대체해준다.

  Note: JSX외에 코드를 줄일 수 있는 방법
    JSX 외에도 React.createElement() 호출대신 사용할수 있는 방법이 있다.
    그중 하나는 React.DOM.tagName(props, text)
    
    예를 들어 React.createElement()로 <h1> 엘리먼트를 생성한다면 다음과 같다.
    React.createElement('h1', null, 'Hey')

    다음 코드는 위의 코드와 같으나 작성하는 시간을 줄일 수 있다.
    React.DOM.h1(null, 'Hey')

    즉 React.DOM 객체이는 표준 HTML 요소에 대한 엘리먼트가 준비되어 있다. 다음처럼 객체에 어떤 요소가 있는지 확인해볼 수도 있다.
    console.log(React.DOM)

    React.DOM을 개발자 도구의 콘솔에 직업 입력해도 된다.(참고로 React.DOM과 ReactDOM은 전혀 다른 객체이다. 혼라스러워하거나 바꾸어 사용하지 말자.)

    공식 문서에서 추천하는 다른 방법은 JSX를 사용할 수 없는 경우에는  짧은 변수를 사용하는 것(빌드 과정을 거칠수 없는 경우에 해당하는 것인데, 이런 전제는 될수 있음 겪지 말자)
    const E = createElement
    E('h1', null, 'Hey')
```

### JSX의 이해
```
  JSX 사용법을 본격적으로 살펴보자.
  컴퓨터에서 예제 코드를 살펴보는 법
    - 각자의 컴퓨터에 3.3절의 설명을 참고하여 Babel을 설치해서 JSX 변환을 할 수 있게 한다.
    - 브라우저에서 JSX를 자바스크립트로 변환할 수 있는 Babel REPL(https://babeljs.io/repl) 서비스를 이용한다.

  선택은 각자의 몫이다. 
  우선 적으로는 JSX의 주요 개념을 살펴보고, 컴퓨터에 Babel을 실행 할 수 있는 개발 환경을 갖추는 것을 추천
```

#### JSX로 React 엘리먼트 생성하기
```
  JSX로 React 엘리먼트 객체를 생성하는 것은 간단하다. 예를 들어 다음 예제 코드처럼 자바스크립트를 작성하는 대신 JSX를 작성할 수 있다. 
  다음 중 name은 'h1'처럼 HTML 태그명을 담은 문자열이거나 HelloWorld 같은 컴포넌트 객체다.

  React.createElement(
    name,
    {key1: value1, key2: value2, ...},
    child1, child2, child3, ..., childN
  )

  이것을 JSX로 옮기면 다음과 같다.
  <name key1=value1 key2=value2 ...>
    <child1 />
    <child2 />
    <child3 />
    ...
    <childn />
  </name>

  JSX 코드에서 key1=value1 같은 속성과 값의 쌍은 createElement()에 전달하는 두 번째 인자와 동일하다. 
  JSX에서 속성을 다루는 방법은 추후 살펴보고, 우선은 속성이 없는 경우를 먼저 살펴보자.
  Hello World를 자바스크립트로 작성한 예제이다.
  ReactDOM.render(
    React.createElement('h1', null, 'Hello World'),
    document.getElementById('content')
  )

  JSX로 작성한 쪽이 훨씬 더 간단하다.
  ReactDOM.render(
    <h1>Hello World!</h1>
    document.getElementById('content')
  )

  JSX 문법으로 작성한 객체도 변수에 저장할 수 있다. JSX는 React.createElement()를 문법적으로 개선한 것일 뿐이기 떄문이다.
  다음 코드에서는 React 엘미먼트 객체를 변수에 담는다.
  let helloWorldReactElement = <h1>Hello world!</h1>
  ReactDOM.render(
    helloWorldReactElement,
    document.getElementById('content')
  )
```

#### React 컴포넌트에 JSX 사용하기
```
  이전 예제에서 다룬 <h1> JSX 태그는 표준 HTML 태그 이름이기도 하다. 컴포넌트를 다룰 떄도 같은 문법을 사용한다.
  다른 점은 컴포넌트 클래스의 이름이<HelloWorld />의 경우처럼 반드시 대문자로 시작한다는 점뿐이다.

  다음 예제 코드 3.3은 JSX로 다시 작성한 좀 더 개선된 HelloWorld다. 여기서는 새롭게 생성한 컴포넌트로부터 엘리먼트를 생성하기 위해서 JSX를 사용했다.
  class HelloWorld extends React.Component {
    render() {
      return (
        <div>
          <h1>1. Hello World!</h1>
          <h1>2. Hello World!</h1>
        </div>
      )
    }
  }
  ReactDOM.render(
    <HelloWorld />,
    document.getElementById('content')
  )

  자바스크립트로 작성한 다음 코드에 비해 위 코드가 가독성이 좋다는데 동의 하는가?
  class HelloWorld extends React.Component {
    render() {
      return React.createElement('div', 
        null,
        React.createElement('h1', null, '1. Hello World'),
        React.createElement('h1', null, '2. Hello World')
      )
    }
  }
  ReactDOM.render(
    React.createElement(HelloWorld, null),
    document.getElementById('content')
  )

  Note: 경험이 있는 개발자 입장에서는 자바스크립트 코드에서 화살표는 보는것이 어색할 수 있다.
  화살괄호는 JSX 대표적인 논쟁거리이긴 하나 이런 문법적인 모양에 신경쓰는건 하수라고 생각한다.

  예제 코드에서 return 문에 소괄호를 사용한 것을 확인 가능하다. return 문의 같은 행에 이후로 
  아무것도 적지 않는 경우에는 반드시 괄호를 넣어야 한다. 그렇지 않으면 자바스크립트는 return을 마치고
  아무것도 반환하지 않을것이다. 이는 자바스크립트의 return 한줄에 ;을 자동으로 부쳐주는 엔진의 특성이다.
  그냥 () 쓰는게 안전하다.
```

#### JSX에서 변수 출력하기
```
  컴포넌트를 작성할 때, 약간의 코드를 통해 자체적으로 뷰를 변경할 수 있는 영리한 컴포넌트를 만들고 싶을 수 있다. 
  예를 들어 현재 날짜/시간 컴포넌트에 하드 코딩된 값이 아닌 현재 날짜와 시간을 사용한다면 매우 유용할 것이다.

  JSX 없이 React를 사용할 때는 +를 이용해서 연결하거나, 만약 ES6+/ES2015+를 사용한다면 백틱(`)과 ${varName}로 표시한
  문자열 템플릿을 사용할 수 있다. 여기서 varName은 변수 이름이다. 명세에서는 이 기능의 공식적인 이름을 템플릿 리터럴 이라고 한다.
  예를 들어 일반적인 자바스크립트만으로 작성한 DateTimeNow 컴포넌트에서 속성을 텍스트로 사용하려면 다음과 같은 코드를 작성해야 한다.
  class DateTimeNow extends React.Component {
    render() {
      let dateTimeNow = new Date().toLocaleString()
      return React.createElemnt(
        'span',
        null,
        `Current date and time is ${dateTimeNow}`
      )
    }
  }

  이와 다르게 JSX에서는 중괄호({}) 표기법을 사용하여 변수를 동적으로 출력할 수 있으므로 코드가 늘어나는 것을 상당히 줄일 수 있다.
  class DateTimeNow extends React.Component {
    render() {
      let DateTimeNow = new Date().toLocleString()
      return <span>Current date and time is {dateNow}.</span>
    }
  }

  지역변수뿐만 아니라 속성도 출력 가능하다.
  <span>Hello {this.props.userName}, your current date and time is {dateTimeNow}.</span>

  그뿐만 아니라 자바스크립트 표현식이나 그 외 어떤 자바스크립트 코드라도 중괄호 안에서 실행 시킬 수 있다.
  예를 들어 다음 예제 코드처럼 날짜 형식을 적용할 수도 있다.
  <p>Current time in your locale is {new Date(Date.now()).toLocaleTimeString()}

  이제 JSX가 변수에 담는 동적 데이터를 사용해서 HelloWorld 클래스를 JSX로 다시 작성할 수 있다.
  let HelloWorldReactElement = <h1>Hello world!</h1>
  class HelloWorld extends React.Component {
    render() {
      return <div>
        {helloWorldReactElement}
        {helloWorldReactElement}
      </div>
    }
  }
  ReactDOM.render(
    <HelloWorld/>,
    document.getElementById('content')
  )
```

#### JSX에서 속성 사용하기
```
  엘리먼트 속성을 정의할 때는 속성 문법을 사용한다.
  즉, JSX 태그 안에 key1=value1 key2=value2... 같은 표기법을 사용하여 HTML 속성과 React 컴포넌트의 속성을 정의한다.
  이것은 HTML/XML의 속성 문법과 유사하다.

  다시 말해 JSX에서 속성을 전달하는 방법은 일반 HTML을 작성하는 방법과 같다. 또한, 엘리먼트 속성을 입력해서 표준 HTML 속성을 렌더링한다.
  다음 예제 코드는 앵커 요소 <a>에 표준 HTML 속성 href를 입력하는 경우다.
  ReactDOM.render(
    (<div>
      <a href="http://reactquickly.co">Time for React?</a>
    </div>),
    document.getElementById('content')
  )

  속성에 하드 코딩한 값을 사용하는 것은 유연하지 않다.
  링크 컴포넌트를 재사용하려면 href가 매번 다른 주소를 반영하도록 변경해야 한다.
  이를 하드 코딩한 값이 아닌 동적으로 설정한 값이라고 부른다.
  다음으로, 속성에 동적으로 생성한 값을 사용할 수 있는 컴포넌트에 대해 살펴보자.
  이 값은 컴포넌트 속성(this.props)에서 가져올 수 있다. 이후로는 어려울 것이 없다.
  화살괄호(<>)안에 중괄호({})를 작성하여 속성에 동적으로 생성한 값을 엘리먼트에 전달하면 된다.

  예를 들어 사용자 계쩡에 연결할 때 사용할 컴포넌트를 만든다고 가정하자. href와 title은 사용자에 따라 달라져야 
  하므로 하드 코딩할 수 없다. 동적 컴포넌트인 ProfileLink는 <a> 태그에 href와 title을 렌더링하기 위해 각각 url과
  label을 속성으로 사용한다. ProfileLink에 중괄호를 사용하여 <a>에 속성을 전달한다.
  class ProfileLink extends React.Component {
    render() {
      return <a href={this.propsurl}
        title={this.props.label}
        target="_blank"
      >Profile
      </a>
    }
  }

  속성 값은 어디서 전달한 것일까 ? 속성 값은 ProfileLink 생성 시에 정의된다. 즉 ProfileLink를 생성하는 부모 컴포넌트에서 이 값을 정의하는 것이다.
  예를 들면 이 방법으로 ProfileLink 인스턴스 생성 시에 url과 label 값이 전달되어, 그 결과 <a> 태그에 해당 값을 렌더링한다.
  <ProfileLink url='/users/azat' label='Profile for Azat'>

  이전 장에서 살펴본 것처럼 React가 표준 HTML 요소(<h1>, <p>, <div>, <a> 등)를 렌더링할 떄,
  HTML 명세에 존재하는 속성만 렌더링하고, 표준 속성이 아닌 이외의 속성은 제외한다는 점을 기억하고 있을 것이다.
  이것은 JSX의 특성이 아니라 React의 동작 방식이다.

  그러나 때로는 사용자 지정 데이터를 속성으로 추가해야 할 수도 있다. 목록 데이터가 있다고 가정해보자.
  데이터 중에 앱에는 필수적이지만 사용자에게는 필요하지 않은 것도 있다.
  이런 정보를 DOM 요소세 속성으로 넣는 것은 흔히 사용하는 방식이다.
  다음 예제 코드는 react-is-awesome과 id 속성을 사용하고 있다.
  <li react-is-awesome="true" id="320">React is awesome</li>

  DOM의 HTML 비표준 속성에 데이터를 저장하는 것은 일박적으로 안티패턴으로 여겨진다.
  DOM을 데이터베이스나 프론트엔드 데이터 저장소로 사용하는 것이 적절하지 않기 때문이다.
  DOM에서 데이터를 가져오는 것은 메모리 상의 가상 저장소에서 데이터를 가져오는 것보다 느리다.

  JSX를 사용할 때 데이터를 반드시 HTML 요소의 속성으로 저장해야 하는 경우에는 data-* 속성을 사용한다.
  예를 들어 속성에서<li> 요소에 this.reactIsAwesome 값을 렌더링하려면 다음과 같이 작성할 수 있다.
  <li data-react-is-awesome={this.reactIsAwesome}>React is awesome!</li>
  
  this.reactIsAwesome의 값이 true라면 HTML 렌더링 결과는 다음과 같다.
  <li data-react-is-awesome="true">React is awesom!</li>

  그렇지만 앞서 2.3절에서 다룬 것처럼 표준 HTML 요소에 비표준 HTML 속성을 전달하면 해당 HTML 속성이 렌더링되지 않는다.
  예를들어 다음 두 코드를 살펴보자.
  <li react-is-awesome={this.reactIsAwesome}>React is orange</li>

  <li reactIsAwesome={this.reactIsAwesome}>React is orange</li>

  두 경우 모두 렌더링 결과는 다음과 같다.
  <li>React is orange</li>

  HelloWorld 컴포넌트를 다시 한 번 살펴 보자.
  class HelloWorld extends React.Component {
    render() {
      return React.createElement(
        'h1',
        this.props,
        'Hello' + this.props.frameworkName + 'world!!!'
      )
    }
  }

  HelloWorld 컴포넌트는 어떤 속성이든 <h1>으로 전달한다. JSX에서는 이것을 어떻게 구현할 수 있을까?
  각 속성을 개별적으로 전달하면 코드가 더 많아진다. 또한, 속성을 변경해야 하는 경우에도 개선해야 할 코드가 밀접하게 결합된다.
  각 속성을 수동으로 전달해야 하는 경우를 상상해보자. 두 단계 또는 세 단계의 컴포넌트를 거쳐 일일이 전달해야 한다면 어떨까?
  그렇게 하는것은 안티 패턴이다. 다음과 같은 방법은 추천하지 않는다.
  class HelloWorld extends React.Component {
    render() {
      return <h1 title={this.peops.title} id={this.props.id}>
        Hello {this.props.frameworkName} world!!!
      </h1>
    }
  }

  모든 속성을 전달해야 한다면, 개별 속성을 따로 전달하지 말자. JSX에서는 이에 대한 해결책으로 생략 부호(...)처럼 생긴 펼침 연산자를 사용할 수 있다.
  class HelloWorld extends React.Component {
    render() {
      return <h1 {...this.props}>Hello {this.props.frameworkName} world!!!</h1>
    }
  }

  reactDOM.render(
    <div>
      <HelloWorld
        id="ember"
        frameworkName="Ember.js"
        title="A framework for creating ambitious web application"
      ></Helloworld>
      <HelloWorld
        id="backbone"
        frameworkName="Backbone.js"
        title="Backbone.js gives structur to web application"
      ></Helloworld>
      <HelloWorld
        id="angular"
        frameworkName="Angular.js"
        title="Superheroic Javascript MVW Framework"
      ></Helloworld>
    </div>,
    document.getElementById('content')
  )

  {...this.props}를 이용하면 모든 속성을 자식 엘리먼트로 전달할 수 있다.

  Note: ES6+/ES2015+의 생략 부호: 나머지 펼침, 해체할당 연산자
    자바스크립트에서 인자의 수를 제한하지 않고 사용하는 함수를 사용하거나 작성한 적이 있다면 arguments 객체에 대해서 알고 있을 것이다.
    이 객체는 함수에 전달된 모든 매개변수를 포함한다. 한 가지 문제는  이 arguments 객체가 실제로 배열이 아니라는점이다.(유사 배열)
    sort()나 map() 같은 함수를 명시적으로 사용하려면 배열로 변환해야 한다.
    예를 들어 아래 request 함수는 call()을 이용해서 arguments 객체를 배열로 변환한다.

    funtion request(url, options, callback) {
      var args = Array.prototype.slice.call(arguments, request.length)
      var url = args[0]
      var callback = args[2]
      // ...
    }

    무수히 많은 인자에 접근해야 할 경우 인자를 배열처럼 다룰 수 있는 ES6 기능이 있을까? 있다. 생략부호(...)로 사용하는 나머지 연산자를 사용할 수 있다.
    예를 들어 다음 코드는 나머지 연산자를 사용한 ES6 함수다. callbacks는 arguments 객체처럼 유사배열이 되는 것이 아니라 나머지 매개변수를 실제 배열에 담는다.

    function (url, options, ...callbacks) {
      var callback1 = callbacks[0]
      var callback2 = callbacks[1]
      // ...
    }

    여기서 나머지 매개변수는 해체할당될 수도 있는데, 다음과 같이 별개의 변수로 분리하여 추출하는 것을 의미한다.

    function (url, options, ...[error, success]) {
      if(!url) return error(new Error('oops'));
      // ...
      success(data)
    }

    펼침 연산자는 무엇일까? 간단히 말해 펼침 연산자는 다음 위치에서 인자나 변수를 펼칠 수 있다.
      - 함수 호출: 예를 들면 push() 메서드에서 arr1.push(...arr2)처럼 사용한다.
      - 배열 리터럴: 예를 들면 array2 = [...array1, x, y, z]처럼 사용한다.
      - new 연산자를 이용한 인스턴스 생성 시: 예를 들어 var d = new Date(...dates)

    ES5에서 배열을 함수의 인자로 사용하려면 apply() 함수를 사용해야 했다.
    function request(url, options, callback) {
      // ...
    }
    var requestArgs = ['http://azat.co', {...}, function(){...}]
    request.apply(null, requestArgs)

    ES6에서는 펼침 연산자를 사용할 수 있다. 나머지 연산자처럼 생략 부호(...)를 사용한다.
    function request(url, options, callback) {
      // ...
    }
    var requestArgs = ['http://azat.co', {...}, function(){...}]
    request(...requestArgs)

    펼침 연산자의 문법은 나머지 연산자와 비슷하다. 그렇지만 나머지 연산자는 함수 정의나 선언 시에 사용하고, 펼침 연산자는 
    함수 호출이나 리터럴에서 사용한다. 추가로 작성해야 하는 명령형 코드를 대체할 수 있으므로 잘 알고 사용해야 할 중요한 기술이다.
```