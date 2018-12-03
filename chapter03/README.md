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

#### React 컴포넌트 메서드 생성하기
```
  리액트 컴포넌트에 애플리케이션을 위한 메서드를 자유롭게 추가 가능하다.
  리액트 컴포넌트가 클래스이기 때문이다. 다음 예제 코드에서는 헬퍼 메서드로 getUrl()을 추가 했다.
  class Content extends React.Component {
    getUrl() {
      return 'http://webapplog.com'
    }
    render() {
      ...
    }
  }

  getUrl() 메서드가 세련되지는 않았지만, 기본적인 개념을 얻을 수 있다.
  즉, render()외에도 임의의 메서드를 직저 만들 수 있다. getUrl() 메서드를 사용하여 API 서버에 대한 URL을 추상화할 수도 있다.
  헬퍼 메서든느 재사용 가능한 논리가 있고, render()를 포함하여 컴포넌트의 다른 메서드 어디에서나 호출할 수 있다.

  JSX에서 직접 작성한 메서드의 반환 값을 출력하려면 변수를 출력할 때와 마찬가지로 {}를 사용한다.
  다음 코드는 render에서 getUrl() 메서드를 호출하고, getUrl() 메서드의 반환 값을 뷰에 보여준다.
  class Content extends React.Component {
    getUrl() {
      return 'http://webapplog.com'
    }
    render() {
      return (
        <div>
          <p>Your REST API URL is: <a href={this.getUrl()}>{this.getUrl()}</a></p>
        </div>
      )
    }
  }

  한 번 더 정리하면 JSX의 {}에서 컴포넌트 메서드를 직접 호출할 수 있다. 
  예를 들어 헬퍼 메서드 getUrl을 {this.getUrl()}로 호출했다.
  컴포넌트 메서드는 React의 이벤트 핸들러를 이해하기 위한 기초로 매우 중요하다.
```

#### JSX의 if/else 처리
```
  동적 변수를 렌더링했던 것과 유사하게, 개발자는 if/else 조건의 결과에 따라 컴포넌트가 뷰를 변경할 수 있도록 작성해야 하는 경우도 있다.
  먼저 컴포넌트 클래스에 조건에 따라 다른 링크 엘리먼트를 렌더링하는 간단한 예제를 생각해보자.
  예를 들어 링크의 텍스트와 URL은 user.session 값에 따라 다르게 렌더링된다. 다음은 일반적인 자바스크립트로 작성한 예제다.
  ...
    render() {
      if (user.session) return React.createElement('a', { href: '/logout' }, 'Logout')
      else return React.createElement('a', { href: 'login' }, 'Login')
    }
  ...

  이와 비슷한 방법으로 JSX를 사용한 코드는 다음과 같다.
  ...
    if (this.props.user.session) return <a href="/logout">Logout</a>
    else return <a href="/login">Login</a>
  ...

  이런 엘리먼트를 <div>로 감쌌다고 생각해보자. 이 경우에는 일반적인 자바스크립트로 작성하려면 변수를 추가하는 방법, 함수 표현식을 사용하는 방법,
  삼항 연산자를 사용하는 방법을 생각해 볼 수 있다.
  <div>의 createElement() 내부에서 if 조건문을 사용할 수 없기 때문이다.
  요점은 런타임에서 반드시 값을 가져와야 한다는 것이다.
  
  Note: 삼항 연산자
    다음 삼항 조건에서 userAuth가 true라면 msg 값은 'welcome'이다. 그렇지 않으면 값은 'restricted'이다.
      let msg = (userAuth) ? 'welcome': 'restricted'
    
    이 문장은 다음 경우와 같다.
      let session = ''
      if (userAuth) {
        session = 'welcome'
      } else {
        session = 'restricted'
      }
    
    경우에 따라 삼항 연산자가 if/else 문의 축약이 되기도 한다. 그렇지만 삼항 연산자를 값을 반환하는 표현식으로 사용하려는 경우에는 둘 사이에 큰 차이가 있다.
    다음은 유효한 자바스크립트 코드이다.
      let msg = (userAuth) ? 'welcome': 'restricted'
    
    반면에 아래 if/else 문은 표현식이 아니라 문장이므로 코드가 유효하지 않다.
      let msg = if (userAuth) {'welcome'} else {'restricted'} // Not valid

    JSX 작성 시 삼항 연산자의 이런 성질을 이용하여 런타임에 값을 가져오도록 할 수 있다.

    세 가지 다른 스타일(변수, 표현식, 삼항 연산자)을 이해하기 위해서 JSX로 변환하지 않고 자바스크립트로 작성한 코드를 살펴보자.
    // 방법 1: 변수
    render() {
      let link
      if (this.props.user.session) 
        link = React.createElement('a', {href: '/logout'}, 'Logout')
      else
        link = React.createElement('a', {href: '/login'}, 'Login')
      return React.createElement('div', null, link)
    }
    
    // 방법 2: 표현식
    render() {
      let link = (sessionFlag) => {
        if (sessionFlag) return React.createElement('a', {href: '/logout'}, 'Logout')
        else return React.createElement('a', {href: '/login'}, 'Login')
      }      
      return React.createElement('div', null, link(this.props.user.session))
    }
    
    // 방법 3: 삼항 연산자
    render() {
      return React.createElement('div', null,
        (this.props.user.session) ? React.createElement('a', {href: '/logout'}, 'Logout') : React.createElement('a', {href: '/login'}, 'Login')
      )
    }

    나쁘지 않지만 조금 투박해 보인다. JSX를 사용하여 {} 표기법으로 변수를 출력하고 자바스크립트 코드도 실행할 수 있다.
    이 방법을 사용하여 더 나은 문법을 알아보자.
    // 방법 1: 변수
    render() {
      let link
      if (this.props.user.session) link = <a href='/logout'>Logout</a>
      else link = <a href='/login'>Login</a>
      return <div>{link}</div>
    }

    // 방법2: 표현식
    render() {
      let link = (sessionFlag) => {
        if (sessionFlag) return <a href='/logiut'>Logout</a>
        else return <a href='/login'>Login</a>
      }
      return <div>{link(this.props.user.session)}</div>
    }

    // 방법3: 삼항 연산자
    render() {
      return <div>
        {
          (this.props.user.session)
            ? <a href='/logout'>Logout</a>
            : <a href='/login'>Login</a>
        }
      </div>
    }

    함수 표현식으로 작성한 코드(방법 2: JSX 밖에서 return 문 앞에 함수를 작성하는 방법)를 좀 더 자세히 살펴보면 다른 방법을 생각해볼 수 있다.
    같은 함수를 JSX 내부에서 즉시 실행함수로 선언할 수 있다. 이 방법을 이용하면 link처럼 변수를 추가하지 않고도 if/else 문을 런타임에 실행할 수 있다.
    render() {
      return <div>
        (sessionFlag) => {  // 즉시 실행함수 정의
          if (sessionFlag) return <a href='/logiut'>Logout</a>
          else return <a href='/login'>Login</a>
        }(this.props.user.session)  // 매개변수와 함께 즉시 실행함수 실행
      </div>
    }

    조금 더 살펴보면, 같은 방식을 전체 엘리먼트(이 예제에서는 <a>)뿐만 아니라 텍스트나 속성 값을 렌더링할 때도 적용할 수 있다. 
    중괄호 내에서 앞에 제시한 세 가지 방법 중 한 가지를 사용하면 된다. 예를 들어 URL과 텍스트를 확대해서 엘리먼트를 생성하기 위한 
    코드와 중복을 피할 수 있다. 이렇게 하면 <a>를 한 번만 쓰면 되므로 이 방식이 편리할 수도 있다.
    render() {
      let sessionFlag = this.props.user.session
      return <div>
        <a href={sessionFlag}?'/logout':'login'>
          {(sessionFlag)?'Logout':'Login'}
        </a>
      </div>
    }

    살펴본 것처럼 템플릿 엔진과 달리 JSX에는 특별한 문법이 없으며, 그저 자바스크립트를 사용하면 된다.
    가장 간결한 스타일이므로, 이 책에서는 삼항 연산자를 매우 자주 사용할 것이다. 
    요약해 보면 JSX에서 if/else 조건을 구현할 때는 다음과 같은 방법을 사용할 수 있다.
      - return 문 이전에 JSX 외부에서 변수를 선언한 후 JSX 내부에서 {}를 사용하여 출력한다.
      - return 문 이전에 JSX 외부에서 값을 반환하는 함수 표현식을 선언한 후 JSX 내부의 {}에서 실행한다.
      - 삼항 연산자를 사용한다.
      - JSX 내부에서 즉시 실행함수를 사용한다.
  이 네가지 방법은 JSX에서 조건을 처리할 때 적용하는 좋은 법칙이다.
  return 문 앞, JSX 외부에서 if/else를 사용하여 JSX의 {}로 출력할 변수를 생성한다. 
  또는 변수를 사용하지 않고, JSX에서 {}를 사용하여 엘비스 연산자 또는 표현식의 결과를 출력한다.

  class MyReactComponent extends React.Component {
    render() {
      // JSX를 사용하지 않는 영역: 변수, if/else 문, 삼항 연산자를 사용
      return (
        // JSX: 삼항 연산자 또는 함수 실행 결과를 {}로 표시
      )
    }
  }

  여기까지 React와 JSX를 이용해 상호작용하는 UI를 만드는 데 중요한 조건 처리 방법을 살펴 보았다.
```

#### JSX의 주석 작성 방법
```javascript
  // JSX의 주석은 일반 자바스크립트의 주석과 비슷하다. JSX에 주석을 추가할 때는  표준 자바스크립트의 주석을 {}로 감싸서 작성한다.
    let content = (
      <div>
        {/* 자바스크립트의 주석과 같다 */}
      </div>
    )
  
  // 또는 다음처럼 여러 줄로 작성할 수 도 있다.
    let content = (
      <div>
        <Post
          /*
            이 주석은
            여러 줄 
            입니다.
          */
          name={window.isLoggedIn ? window.name : ''} // JSX 내부 입니다.
        ></Post>
      </div>
    )
  /*
    지금까지 JSX와 그 이점에 대해 파악했다.
    앞으로는 JSX를 다루기 위해 사용하는 도구와 JSX를 사용할 때 발생하는 잠재적인 문제를 피하는 방법을 알아보자.
    JSX의 도구와 특이한 부분에 대해서 살펴보자.

    JSX 프로젝트를 제대로 작동시키려면 JSX를 컴파일 해야 한다는 것을 이해해야 한다.
    브라우저는 JSX를 실행할 수 없다. 
    브라우저 엔진이 실행할 수 있는 것은 자바스크립트뿐 이므로 JSX를 보통의 자바스크립트로 변환해야 한다.
  */
```

### Babel을 이용한 JSX 트랜스파일러 설정하기
```
  JSX를 실행하려면 일반적인 자바스크립트 코드로 변한해야 한다. 이 과정을 컴파일과 변환을 거친다는 의미에서 트랜스파일레이션 이라고 하는데,
  이를 위해 사용할 수 있는 도구가 여러 가지 있다.
    - Babel 명령줄 인터페이스 도구: babel-cli 패키지가 제공하는 트랜스파일레이션 명령을 사용한다. 이 방식은 설정이 적고 시작이 간편하다.
    - Node.js 또는 브라우저 자바스크립트로 작성한 스크립트(API 방식): babel-core 패키지를 이용해서 스크립트를 작성하여 JSX를 변환하는 방식이다.(babel.transform)
      이 방식을 이용하면 적 수준의 제어가 가능하고, 빌드 도구와 빌드 도구의 플러그인 상의 추상화나 의존성을 제거 할 수 있다.
    - 빌드 도구: Grunt, Gulp, Webpack 같은 도구에서 Babel을 플러그인으로 사용할 수 있다. 이 방법이 가장 인기가 좋다.

  이 모든 경우에 결과적으로 Babel을 사용한다. Babel의 주용 기능은 ES6+/ES2015+ 컴파일러이지만, JSX를 자바스크립트로 변환하기도 한다.
  React 팀도 자체 JSX 변환 도구 개발을 중단하고, Babel을 사용하도록 권장하고 있다.

  Note: Babel 버전 6 외의 다른 도구를 사용할 수 있을까?
    JSX 변환 도구가 여러가지 있기는 하지만, 가장 흔히 사용하는 도구이자 React 팀이 2016년 8월 현재 공식 웹사이트에서 추천하는 도구는 Babel이다.
    Babel의 예전 이름은 5to6였다. 예전에는 React팀이 react-tools와 브라우저 상에서 JSX 변환을 실행하는 JSXTransformer를 유지보수했지만, 
    버전 0.13부터 Babel의 사용을 권장하고 react-tools와 JSXTransformer 개선 작업을 중단했다.

    브라우저 내에서 런타임 변환이 필요한 경우에는 Babel 버전5에서 제공하는 browser.js의 즉시 사용 가능한 배포판을 사용할 수 있다.
    JSXTransformer와 마찬가지로 브라우저에 추가하면 <script> 코드를 자바스크립트로 변환할 수 있다. JSXTransformer와 마찬가지로 브라우저에 추가하면 <scropt> 코드를
    자바스크립트로 변환할 수 있다. 이를 위해서는 type="text/babel" 속성을 추가해야 한다. browser.js를 포함하고 있는 마지막 Babel 버전은 5.8.34이며, CDN을 통해 바로 
    불러올 수 있다.(https://cdnjs.com/libraries/babel-core/5.8.34)

    Babel 버전 6은 기본 설정값을 두지 않도록 변경되었으며, browser.js도 제거했다. Babel 팀은 개발자들이 각자의 배포판을 생성하거나 Babel API를 사용하는 것을 권장한다.
    babel-standalone 라이브러리도 있지만(https://github.com//Daniel15/babel-standalone) 설정을 거쳐야 한다.

    Traceur(https://github.com/google/traceur-compiler)도 Babel 대신 사용할 수 있는 도구다.

    끝으로 TypeScript(www.typescriptlang.org)도 jsx-typescript(https://github.com/fdecampredon/jsx-typescript)를 이용하면 JSX 변환을 지원하는 것 같다.
    그렇지만 TypeScript는 완전히 새로운 도구이자 일반적인 자바스크립트의 확장이라고 할 수 있는 새로운 언어이다.

    아마도 이 책의 예제를 JSXTransformer, Babel 버전 5, babel-standalone, TypeScript, Traceur를 사용하는 것도 가능할 것이다.
    이 책은 React 버전15를 기준으로 작성 되었다.
    TypeScript나 Traceur를 사용하는 것이 비교적 안전한 방법인데, 이 책을 집필하는 시점에서 지원이 잘 되고 있는 도구이기 때문이다.
    그러나 이 책의 예제에 Babel 버전 6 외의 도구를 사용하는 것은 스스로 위험을 감수해야 한다.

  리액트에 바벨을 사용하면 설정과 ES6용 모듈을 추가하는 것만으로 ES6/ES2015의 추가 기능을 활용하여 개발을 간소화할 수 있다. ECMAScript 표준의 여섯 번째 버전은 개선이 많이 되었고,
  이 책을 집필하는 시점에서 모든 최신 브라우저에서 대부분의 기능을 지원한다. 그러나 오래된 브라우저는 ES6로 작성한 새로운 코드를 해석하는 데 어려움을 겪을 수 있다. 
  또한, 다음 표준인 ES7, ES8이나 먼 훗날에 ES27을 사용하고자 한다면, 일부 브라우저에는 기능 구현이 완료되지 않을 수도 있다.

  브라우저의 ES6 또는 ES.Next(가장 최신 기능을 아울러 부르는 이름) 구현이 지연되는 문제를 해결하기 위해 Babel을 사용할 수 있다. 
  Babel은 차세대 자바스크립트 언어를 지원한다(Babel이라는 이름에서 알 수 있듯이 많은 언어를 지원한다.) 
  이 절에서는 다음에 나올 장들에서 사용하는 Babel CLI를 이용한 방법을 설명한다.
  이 방법은 최소한의 설정만 필요하고, API를 사용하는 방식과 다르게 Babel API에 대한 지식이 필요하지 않다.

  Babel CLI(http://babeljs.io)를 사용하려면 Node.js v6.2.0, npm v3.8.9, babel-cli v6.9.0(www.npmjs.com/package/babel-cli),
  babel-preset-react v6.5.0(www.npmjs.com/package/babel-prest-react)를 설치해야 한다.
  Node.js와 React 개발 환경이 빠르게 변화하므로 이 외의 다른 버전의 경우에는 이 책의 예제 코드가 정상적으로 작동하지 않을 수도 있다.

  Node.js와 npm을 설치하는 가장 쉬운 방법은 공식 웹사이트(http://nodejs.org)에서 설치 프로그램을 내려 받는 것이다.(Node.js와 npm을 함께 받을 수 있다.)
  더 자세한 옵션이나 Babel 설치에 대한 설명은 부록 A를 참고하기 바란다.

  node 및 npm 설치 버전 확인
    node -v
    npm -v

  Babel CLI와 babel-preset-react는 지역 모듈로 설치해야 한다. Babel CLI를 전역(npm으로 설치할 때 -g를 추가하여 실행)에 설치하는 것은 권장하지 않는다.
  프로젝트가 다른 버전의 도구를 사용하는 경우에 충돌이 발생할 수 있기 때문이다.

  설치과정 간단 요약
    - 새로운 폴더를 생성한다. 예를 들면 ch03/babel-jsx-test
    - 새 폴더에서 package.json 파일을 생성한 후 여기에 빈 객체처럼 중괄호 {}를 작성하거나, npm init 명령을 이용해서 package.json 파일을 생성한다.
    - package.json이나 babelrc 파일에 Babel 설정을 정의한다. 이 책에서는 package.json을 기준으로 설명하며, 다음 절에서 다룬다. .babelrc에 대해서는 다루지 않는다.
    - 필요에 따라 pcakage.json에 프로젝트 이름, 라이선스, 깃허브 저장소 등의 정보를 작성한다.
    - Babel CLI와 babel-preset-react를 지역 모듈로 설치한다. npm i babel-cli@6.9.0 babel-preset-react@6.5.0 --save-dev 명령을 실행하면 이 패키지가 설치되고, package.json의 
      devDependencies 항목에도 추가된다.
    - 필요하다면 이어서 설명하는 Babel 명령어를 npm script로 작성할 수도 있다.

  Note: Babel ES6 preset
    IE9 같은 구형 브라우저를 지원해야 하는 불운한 상황에도 불구하고, 미래의 표준인 ES6+/ES2015+를 사용하고자 한다면, babel-preset-es2015(www.npmjs.com/package/babel-preset-es2015)
    트랜스파일러를 추가할 수 있다.
    이 라이브러리를 이용하면 ES6 코드를 ES5 코드로 변환할 수 있다. 먼저 다음과 같이 라이브러리를 설치 한다.
      npm i babel-preset-es2015 --save-dev

    다음으로, Babel presets 항목에 react와 함게 추가한다.
      {
        "presets": ["react", "es2015"]
      }

    구형 브라우저 지원이 필요하지 않다면 ES2015 트랜스파일러를 사용하는 것을 추천하지 않는다. 여기에는 몇 가지 이유가 있다.
      첫째, ES6 코드보다 최적화가 부족한 오래된 ES5 코드를 실행하게 된다. 
      둘째 의존성이 늘어나고 더 복잡한 코드가 된다.
      셋째 만약 대부분의 사람이 브라우저에서 ES5 코드를 계속해서 실행한다면 브라우저 개발팀이나 자바스크립트 개발자가 ES6를 신경쓸까?
           구형 브라우저 지원이 필요하다면 TypeScript(www.typescriptlang.org) 또는 ClohureScript(http://clojurescript.org), CoffeeScript(http://coffeescript.org) 등을 사용하자.

    부록 A의 내용을 반복하려면 package.json 파일에 다음과 같이 presets 항목을 작성해야 한다.
      {
        ...
        "babel": {
          "presets": ["react"]
        },
        ...
      }
    이후에 새로 생성한 프로젝트 폴더에서 다음 명령을 실행하면 버전을 확인할 수 있다.
      ./node_modules/.bin/babel --version

    설치한 뒤에, 다음 명령을 실행하면 js/script.jsx를 일반적인 자바스크립트 파일인 js/script.js로 변환할 수 있다.
      ./node_modules/.bin/babel js/script.jsx -o js/script.js

    명령이 긴 이유는 Babel을 실행하기 위해 경로를 작성하기 때문이다. package.json의 scripts 항목에 다음과 같은 명령을 추가하면, npm run build 명령으로 간단하게 실행할 수 있다.
      "build": "./node_modules/.bin/bael js/script.jsx -o js/script.js"
    
    이 명령에 -w 또는 --watch 옵션을 추가하면 자동화할 수 있다.
      ./node_modules/.bin/bael js/script.jsx -o js/script.js -w

    Babel 명령은 script.jsx 파일을 감시하다가 JSX를 새로 저장하면 script.js로 변환한다. 이때 터미널 또는 명령창에서 다음과 같은 내용을 확인할 수 있다.
      change js/script.jsx
    
    더 많은 JSX 파일을 변환해야 할 때는 -d (--out-dir)옵션에 폴더 이름을 입력해서 명령을 실행하면 JSX 소스 파일을 여러 개의 일반 자바스크립트 파일로 컴파일 한다.
      ./node_modules/.bin/babel source -d build
    
    파일을 하나 불러오는 것이 파일을 여러 개 불러오는 것보다 프론트엔드 애플리케이션의 성능을 향상시키는 데 좋다. 요청이 늘어날수록 지연이 늘어나기 떄문이다.
    원본 폴더의 모든 파일을 -o (--out-file) 옵션을 사용하여 하나의 자바스크립트 파일로 컴파일할 수 있다.
      ./node_modules/.bin/babel src -o script-compiled.js

    사용하는 컴퓨터의 경로 설정에 따라서 ./node_modules/.bin/babel 대신에 babel만 입력해서 실행할 수도 있다. 양쪽 모두 지역 모듈을 실행한다. 
    기존에 babel-cli를 전역에 설치한 경우에는 npm rm -g babel-cli 명령으로 삭제하자.

    생성한 프로젝트에 babel-cli를 지역 모듈로 설치했으나 실행이 불가능한 경우에는 쉘 설정 파일에 경로 설정을 추가하는 것을 고려하자.
    유닉스, 리눅스 macOS 등 유닉스 계열 운여에제를 사용한다면 사용하는 쉘(bash, zsh 등)에 따라 ~/.bash_profile. ~/.bashrc. ~/.zsh 등을 수정할 수 있다.

    다음 쉘 구문을 적용하면 경로를 설정할 수 있다. 현재 폴더에 ./node_modules/.bin 폴더가 있다면 지역에 설치한 npm CLI 패키지를 경로 입력 없이 실행할 수 있다.
      if [ -d "$PWD/node_modules/.bin"]; then
        PATH="$PATH:$PWD/node_modules/.bin"
      fi

    쉘 스크립트는 터미널의 현재 폴더에서 ./node_modules/.bin 폴더가 있는지 확인하고, 
    Babel, Webpack 같은 npm CLI 도구를 babel, webpack 같은 명령어로 실행할 수 있도록 이 경로를 환경 변수에 추가한다.

    하위 폴더 여부와 상관없이 항상 경로를 환경변수로 추가할 수도 있다. 다음 쉘 구문은 PATH 환경변수와 프로파일에 항상 ./node_modules/.bin을 추가한다.
      export PATH="./node_modules/.bin:$PATH"
    
    보너스: 이렇게 설정하면 경로를 입력하지 않고도 지역에 설치한 npm CLI 도구라면 우엇이든 실행할 수 있다.
    Tip: 
      Babel 설정을 마친 package.json 파일의 예는 이 책의 예제 코드 중 ch03 폴더의 프로젝트에서 확인할 수 있다. 
      앞으로 이어지는 장에서도 이와 같은 방식으로 작성한다.
      ch03 폴더의 package.json 파일을 살펴보면 컴파일을 거쳐야 하는 하위 폴더의 프로젝트를 대상으로 scripts 항목에 명령을 작성했다. 
      다만 프로젝트 폴더에 자체적으로 package.json 파일이 있는 경우에는 프로젝트 폴더의 package.json 파일에 명령이 작성되어 있을 수도 있다.

    npm run build-hello-wordl처럼 빌드 명령을 실행하면 ch03/PROJECT_NAME/jsx 폴더에 위치한 JSX 파일을 일반 자바스크립트 파일로 변환하여 ch03/PROJET_NAME/js에 저장한다.
    따라서 npm i 명령으로 필요한 의존성을 설치하고(ch03/node_modules 폴더가 생성된다.) package.json에 빌드 명령이 있는지 확인한 후 해당 명령을 npm run build-PROJECT_NAME으로 실행하기만 하면 된다.

    지금까지 JSX 파일을 일반 자바스크립트 파일로 변환하는 가장 쉬운 방법을 살펴 보았다. 
    이어서 React와 JSX의 까다로운 부분에 대해서 살펴보자.
```

### React와 JSX의 까다로운 부분
```javascript
  // JSX는 자식 엘리먼트가 없거나 단일 태그를 사용할 때는 태그를 닫을 때 반드시 슬래시(/)를 넣어야 한다.
    <a href="http://azat.co">Azat, the master of callbacks</a>
    <button label="Save" className="btn" onClick={this.handleSave} />
  
  // 다음과 같이 슬래시 없이 작성하는 방법은 잘못된 방법이다.
    <a href="http://azat.co">Azat<a>
    <button label="Save" className="btn" onClick={this.handleSave}>
  
  // 이와 다르게 HTML은 좀 더 관대하다. 대부분의 브라우저는 이를 무시하고, 슬래시가 없어도 정상적으로 렌더링한다. <button>Presss me for yourself! 를 어떻게 렌더링하는지 확인해 보자.
```

#### 특수문자
```javascript
  // HTML 엔터티 코드(entity code)를 사용하여 다음 예제 코드처럼 저작권 표시나 말바꿈표, 따옴표 등 특수문자를 표시한다.
    &copy;
    &mdash;
    &ldquo;
  
  // 이 코드는 <span>이나 <input> 문자열 속성에 렌더링할 수 있다. 예를 들어 다음은 변수나 속성 없이 텍스트만 작성한 정적인 JSX이다.
    <span>&copy;&mdash;&ldquo;</span>
    <input value="&copy;&mdash;&ldquo;" />

  /*
    그러나 만약 HTML 엔터티 코드를 변수나 속성을 사용해서 <span>에 동적으로 출력하려고 한다면, 특수문자 대신 원래 문자 그대로(&copy;&mdash;&ldquo;) 출력된다. 
    따라서 다음 코드는 제대로 작동하지 않는다.
  */
    // 제대로 작동하지 않는 안티패턴이다.
    var specialChars = '&copy;&mdash;&ldquo;'

    <span>{specialChars}</span>
    <input value={specialChars} />

  /*
    React/JSX는 위험한 HTML 구문에 대해 자동으로 이스케이프를 적용한다. 이것은 보안 측면에서는 매우 편리하다. (기본적으로 제공되는 보안이 훌륭하다.)
    특수문자를 노출하려면 다음 방법 중 하나를 선택할 수 있다.
      - 배열로 출력해서 여러 개의 문자열로 분리할 수 있다. 예를 들어 <span>{[<span>&copy;^mdash;&ldquo;</span>]}</span> 처럼 작성한후
        배열 안의 엘리먼트에 key="specialChars"와 같이 key 속성을 작성하면 콘솔에 표시된느 경고를 없앨 수 있다.
      - 소스 코드에 특수문자를 직접 복사해서 넣는다.(이때는 반드시 UTF-8 문자셋을 사용해야 한다.)
      - 특수문자를 \u로 시작하는 이스케이프 시퀀스로 바꾼 후에 유니코드 번호를 찾아 사용한다.
        (유니코드 번호: www.fileformat.info/unicode/char/search.htm)에서 찾을 수 있다.
      - String.fromCharCode(charCodeNumber)를 이용해서 유니코드 번호에서 문자로 변경한다.
      - React 엘리먼트의 __html에 dangerouslySetInnerHTML을 이용하는 방법도 있으나 추천하지 않는다.(http://mng.bz/TplO)
  */
  // 마지막 방법을 사용한 경우는 다음과 같다.(이 방법은 다른 방법이 모두 실패했을 때 선택할 수 있다.)
    var specialChars = {__html: '&copy;&mdash;&ldquo;'}
    <span dangerouslySetInnerHTML={specialChars}></span>
  /*
    속성 이름을 dagerouslySetInnerHTML 이라고 지은 것을 보면 React 팀은 확실히 유머 감각이 있다.
  */
```

#### data-속성
```html
  <!--
    HTML에 사용자 정의 속성을 생성하는 방법 중 이번에는 JSX를 사용할 것이다.
    React는 주로 HTML 비표준 속성을 컴포넌트에 추가하면 신경도 쓰지 않고 무시한다.
    이 점은 JSX가 아닌 네이티브 자바스크립트로 작성해도 소용이 없다. React의 동작 원리이기 때문이다.

    그렇지만 가끔 DOM 노드에 추가 데이터를 전달해야 하는 경우가 있다. 이것은 안티패턴으로, DOM을 데이터베이스나 로컬 스로리지처럼 사용하지 않아야 한다.
    그럼에도 불구하고 사용자 정의 속성을 렌더링해야  한다면 속성의 접두사로 data-를 사용한다.
  -->
  <!-- 예를 들어 다음은 정상적인 사용자 정의 속성인 data-object-id를 사용했으므로 React가 뷰에 렌더링할 것이다.(HTML은 이 JSX와 같다.) -->
    <li data-object-id="097F4E4F">...</li>
  <!--
    만약 다음과 같은 React/JSX 엘리먼트를 입력하면 React는 object-id를 렌더링하지 않는다.
    HTML 표준 속성이 아니기 때문이다.(렌더링 결과의 HTML에는 JSX와 달리 object-id가 출력되지 않는다.)
  -->
    <li object-id="097F4E4F">...</li>
```

#### 스타일 속성
```jsx
  /*
    JSX의 스타일(style) 속성은 일반적인 HTML과 다르게 동작한다. JSX에서는 문자열 대신 자바스크립트 객체를 전달하고, CSS 속성은 카멜 표기법으로 작성한다.
      - background-image는 backgroundImage로 작성한다.
      - font-size는 fontSize로 작성한다.
      - font-family는 fontFamily로 작성한다.
    
    자바스크립트 객체를 변수에 저장하거나 중괄호를 이중으로 작성하여({{...}}) 인라인으로 작성 할 수도 있다.
    이중중괄호를 잘 살펴보면 바깥쪽의 중괄호는 JSX에서 사용되었고, 안쪽의 중괄호는 자바스크립트의 객체 리터럴을 작성하기 위해 사용 되었다.
  */
  // 다음 예제 코드처럼 폰트 크기를 입력한 객체가 있다고 가정해보자.
    let smallFontSize = {fontSize: '10pt'}
  
  // JSX에서는 smallFontSize 객체를 스타일 속성에 넘겨줄 수 있다.
    <input style={smallFontSize} />
  
  // 또는 변수를 선언하지 않고 다음과 같이 글자 크기를 30포인트로 지정하여 직접 넘겨줄 수도 있다.
    <input style={{fontSize: '30pt'}} />
  
  // 스타일을 직접 넘겨주는 다른 예제를 살펴보자. <span>에 붉은 색으로 외곽선을 표시하기
    <span style={{borderColor: 'red',
      borderWidth: 1,
      borderStyle: 'solid'
    }}
    >Hey</span>

  // 축약문 작성시
    <span style={{border: 'solid 1px red'}}>Hey</span>

  // 스타일 속성으로 이해하기 어려운 문자열 대신 자바스크립트 객체를 사용한 이유는 이를 이용해 React가 뷰를 더 빠르게 변경 가능하기 때문이다.
```

#### class와 for 속성
```html
  <!--
    React와 JSX는 class와 for를 제외하면 표준 HTML 속성을 모두 사용할 수 있다. class와 for는 자바스크립트와 ECMAScript의 예약어고,
    JSX는 일반 자바스크립트로 변환해서 사용한다. 따라서 class와 for 대신에 각각 className과 htmlFor를 사용한다. 예를 들어 hidden 이라는 
    CSS 클래스를 적용하는 경우 <div>에 다음과 같이 정의할 수 있다.
  -->
    <div className="hidden">...</div>
  
  <!-- 폼 요소를 위한 label 요소를 생성하는 경우, for 대신에 htmlFor를 사용한다. -->
  <div>
    <input type="radio" name={this.props.name} id={this.props.id} />
    <label htmlFor={this.props.id}>
      {this.props.label}
    </label>
  </div>
```

#### 불 값을 속성 값으로 사용하는 경우
```html
  <!--
    끝으로 disabled, required, checked, autofocus, readOnly 같은 일부 속성은 폼 요소에만 사용한다.
    여기서 기억해야 할 가장 중요한 점은 속성 값을 {}안에 반드시 자바스크립트 식으로 작성해야 한다는 점이다.
    문자열로 입력하지 않도록 한다.
  -->
  <!-- 예를 들어 input 요소를 사용하도록 설정하려면 다음과 같이 false를 입력한다. -->
    <input disabled={false} />
  <!--
    "false"를 문자열로 작성하지 않도록 한다. 왜냐하면 이 값이 참 값인지 확인할 때 공백이 아닌 문자열은 자바스크립트에서 값이기 떄문이다.

    Note: 참 값
      자바스크립트와 Node.js에서 참 값은 불(Boolean)로 평가될 때 true로 변환된다. if 문을 예로 들 수 있다. 값은 거짓이 아니라면 참이다.(이것은 공식적인 정의다.)
      거짓인 값 6가지
        - false
        - 0
        - ""(공백 문자열)
        - null
        - Undefined
        - NaN
      
      문자열 "false"가 공백 문장열이 아니기떄문에 참이고 true로 변환된다.
  -->
```

### 요약
```
  - JSX는 그저 createElement 같은, React 메서드를 위한 문법적 개선이다.
  - JSX에서는 표준 HTML 속성인 class와 for 대신 className과 htmlFor를 사용한다.
  - JSX에서 스타일(style) 속성을 입려할 때는 HTML처럼 문자열을 사용하지 않고 자바스크립트 객체를 전달한다.
  - 삼항 연산자와 즉시실행함수는 JSX에서 if/else 문을 처리하는 좋은 방법이다.
  - 변수, 주석, HTML 엔터티 코드를 출력하고, JSX 코드를 네이티브 자바스크립트 코드로 변경하는 것은 쉽다.
  - JSX를 자바스크립트로 변환하는 방법이 몇 가지 있다. Babel CLI를 이용한 컴파일 방법은 Gulp, Webpack 같은 도구를 사용하여 빌드 설정을 하거나, Node,js 
    또는 자바스크립트로 Babel API를 직접 이용한 스크립트를 작성하는 방법에 비해 설정해야 할 부분이 적다.
```