## 2장 React 첫걸음
```
  - 엘리먼트 중첩
  - 컴포넌트 클래스 생성하기
  - 속성 다루기

  엘리먼트는 컴포넌트의 인스턴스이며, 컴포넌트 클래스라고도 한다.
  엘리먼트를 어떻게 그리고 왜 사용할까 ?  
```

### 엘리먼트 주업
```javascript
  // <a> 태그로 링크를 만들기
  let linkReactElement = React.createElement(
    'a', 
    { href: 'http://webapplog.com'}, 
    'weapplog.com'
  );

  /*
    문제는 대부분의 UI가 여러개의 HTML 요소로 이루어져 있다는 점이다. 
    메뉴 내부에 링크가 있는 것처럼 말이다.
    
    계층적 방식으로 더 복잡한 구조를 만드는 방법은 엘리먼트를 중첩하는 것이다.
    1장에서는 h1 React 엘리먼트를 생성하고 ReactDOM.render()를 사용해서
    실제 DOM에 렌더링하는 첫 번쨰 React 코드를 구현했다.
  */
  let h1 = React.createElement('h1', null, 'Helloworld!');
  ReactDOM.render(
    h1,
    document.getElemnetById('content')
  );

  /*
    동일한 DOM 계층에 h1 요소 두 개를 렌더링해야 하는 경우에 문제가 발생한다.
    시각적으로 영향을 끼치지 않는 요소로 두 요소를 감싸는 방법이 있다.
    <div> 또는 <span>을 컨테이너로 사용하는 것이 일반적으로 좋은 선택이다.
  */
  ReactDOM.render()
          ↓
        div
  ↓               ↓
  h1              h1
  
  /*
    createElement()에 전달하는 매개변수의 수는 제한이 없다. 
    두 번째 매개변수 이후의 모든 매개변수는 자식 엘리먼트가 된다.
    h1 엘리먼트는 형제 관계다. 
    - 문자열로 작성한 일반적인 HTML, 태그 예를 들면 'h1', 'div', 'p'처럼 화살괄호가 없는
      문자열이다. 이름은 소문자로 작성한다.
    - React 컴포넌트 클래스 객체, HelloWorld를 예로 들 수 있다. 
      React 컴포넌트 클래스의 이름은 대문자로 시작한다.

    첫 번째 방법으 표준 HTML 요소를 렌더링하는 것이다. 
    React는 표준 HTML 요소를 탐색해서 일치하는 것이 있으면,
    해당 React 엘리먼트의 유형으로 사용한다.
    예를 들어 'p'를 넘겼다면 p는 문단 태그이므로 이에 일치하는 것을 찾을 수 있다.
    이렇게 해서 React 엘리먼트를 렌더링하면 DOM에 <p>가 생성된다.

    createElement()의 첫 번째 매개 변수로 문자열 외에도 사용자 정의 컴포넌트 클래스도 사용할 수 있다.
    사용자 정의 컴포넌트 클래스의 생성과 전달 방법에 대해서 알아보자.
  */
```

### React 컴포넌트 클래스 생성
```
  React 엘리먼트를 중첩하고 나면, 곧 입력할 엘리먼트가 굉장히 많다는, 다음 문제를 발견하게 될 것이다.
  1장에서 설명한 것처럼 컴포넌트 기반 아키텍처를 활용해야 한다. 컴포넌트 클래스를 이용하면 기능을 
  느슨하게 결합된 부분으로 분리하여 코드를 재사용할 수 있다.
  컴포넌트 클래스 컴포넌트라고 부르기도 한다.

  표준 HTML 태그를 블로이라고 생각해보자. React 컴포넌트 클래스를 구성하는데, 이 블록들을 사용해서
  클래스의 인스턴스인 사용자 정의 엘리먼트를 생성할 수 있다. 사용자 정의 엘리먼트를 이용하면 이식 가능한
  클래스(구성할 수 있고, 재사용할 수 있는 컴포넌트)에 논리를 추상화하고 캡슐화할 수 있다.
  이런 추상화는 여러 팀이 거대하고 복잡한 애플리케이션에 UI를 재사용하는 것은 물론이고, 다른 프로젝트에서도
  재사용할 수 있게 해준다. 자동완성 컴포넌트, 도구상자, 메뉴 등을 예로 들 수 있다.

  createElement('h1', null, 'Hello World!') 메서드를 사용해서 'Hello world!'를 
  HTML 태그에 담아 렌더링하는 것은 어렵지 않았다. HelloWorld를 별도의 클래스로 분리하려면 어떻게 해야 할까?
  서로 다른 프로젝트 열 개에 HelloWorld를 사용해야 한다고 가정해보자(컴포넌트 재사용 예제)

  ReactDOM.render()
          ↓
      HelloWorld
          ↓
         div
  ↓               ↓
  h1              h1

  ES6 문법을 이용하면 React.Component 클래스를 상속받아서 React 컴포넌트 클래스를 생성가능하다.
  class CHILD extends PARENT 같은 형식으로 작성한다.
  HelloWorld 컴포넌트를 생성한 경우 
  class HelloWorld extends React.Component라고 작성한다.

  새로운 컴포넌트 클래스를 구현할 때는 render() 메서드를 반드시 작성해야 한다.
  이 메서드는 다른 사용자 정의 컴포넌트 클래스나 HTML 태그로 만든 React 엘리먼트를 반환해야 한다.
  엘리먼트를 중첩하는 것도 가능하다.

  사용자 정의 클래스를 사용하면 UI 재사용을 더 잘 할 수 있다.
  HelloWorld 컴포넌트의 render()에 문자열이 아닌 사용자 정의 클래스 객체를 전달할 수 있다.
```
```javascript
  let h1 = React.createElement('h1', null, 'Hello world!');
  class HelloWorld extends React.Component {
    render() {
      return React.createElement('div', null, h1, h1)
    }
  }
  ReactDOM.render(
    React.createElement(HelloWorld, null),
    document.getElementById('content')
  )
  /*
    규칙에 따라 React 컴포넌트를 담는 변수의 이름은 대문자로 시작한다.
    JSX 없이 자바스크립트만 사용하는 경우에는 이런 규칙을 따르지 않아도 된다.
    (helloWorld 처럼 소문자 변수명을 사용할수 있다.)
    그렇지만 JSX를 사용할 경우에는 이 규칙을 따라야 하므로 여기서부터 이 규칙을 적용할 것을 추천한다.
    (JSX에서 React는 일반 <h1> 같은 HTML 요소와 <HelloWorld/> 같은 사용자 정의 컴포넌트 이름을 지을 때 대문자 규칙을 따르는 것은 좋은 생각이다.)

    Note - ES6+/ES2015+와 React
    위에서 살펴본 컴포넌트 클래스 예제는 render() 메서드를 ES6 문법으로 정의한다.
    콜론(:)과 function 키워드를 입력하지 않았다. 이것은 함수를 값으로 하는 속성(키 또는 객체 프로퍼티)을 선언하는 것과 동일하다.

    ReactDOM.render()와 유사하게, 컴포넌트 클래스의 render() 메서드는 엘리먼트 하나만 반환한다. 여러개의 동일 계층 엘리먼트를 반환하려면, <div>나 <span> 요소처럼 스타일에 영향을 주지 않는 엘리먼트로 감싸야 한다.

    이 코드의 사용 효과:
      HelloWorld 컴포넌트를 여러 번 재사용하고, 
      <div> 컨테이너로 감싸면 재사용이 쉽게 가능해진다.
  */
  ReactDOM.render(
    React.createElement(
      'div',
      null,
      React.createElement(HelloWorld),
      React.createElemet(HelloWorld),
      React.createElement(HelloWorld)
    ),
    document.getElementById('content')
  )
  /*
    이것이 컴포넌트 재사용성의 힘이다! 개발 속도를 높여주고 버그도 줄일 수 있다.
    컴포넌트가 제공하는 라이프사이클 이벤트, 상태 DOM 이벤트 등 여러가지 기능을 활용하면
    독립적이면서도 애플리케이션의 다른 영역과 함께 잘 동작하는 컴포넌트를 만들 수 있다.
    이에 대해서는 뒤에서 더 자세히 설명하겠다.

    HelloWorld 엘리먼트가 모두 똑같은 것이 다소 아쉽다. 속성을 입력해서 내용이나 동작을 변경할 수 있다면 어떨까?
  */
```

### React 속성 사용하기
```javascript
  /*
  React 컴포넌트의 속성(properties)은 React 선언형 스타일의 기초라고 할 수 있다.
  속성은 엘리먼트내의 변경할 수 없는 값이라고 생각하자.
  속성을 통해 React 엘리먼트가 다양한 모습을 가질 수 있다.

  React.createElement('a', {href: 'http://node.university'})

  속성은 컴포넌트 내부에서는 변경할 수 없는 값이라는 점을 기억하자.
  부모 컴포넌트는 자식의 생성 시점에 속성을 할당한다.
  자식 엘리먼트에서는 속성을 수정하지 않아야 한다.
  (
    여기서 말하는 자식 엘리먼트는 다른 엘리먼트의 안에 중첩된 엘리먼트를 말한다.
    앞서 살펴본 <HelloWorld/>의 <h1/> 같은 경우다.
  )
  예를 들어 다음 예제 코드처럼 속성명(PROPERTY_NAME)에 값(VALUE)를 입력하는 방식으로 속성을 전달할 수 있다.
  <TAG_NAME PROPERTY_NAME=VALUE />

  React의 속성은 HTML 속성을 작성하는 것과 비슷하다. 
  React 속성을 작성하는 목적은 HTML 속성을 작성하는 것도 있지만, 엘리먼트의 속성을 코드에서 원하는 대로 사용하는 것도 가능하다.
    - 일반적인 HTML 요소의 속성: href, title, style, class 등
    - React 컴포넌트 클래스의 자바스크립트 코드에서 this.props의 값. 
      예를 들어 this.pops.PROPERTY_NAME(PROPERTY_NAME를 임의의 값으로 정할수 있음)

  내부적으로 React는 속성 이름(PROPERTY_NAME)을 HTML 표준 속성과 대조한다.
  대조한 결과에 따라, 첫 번째 경우로, 일치하는 HTML 속성이 있으면 해당 엘리먼트의 HTML 속성으로 사용한다.
  입력한 속성의 이름이 PROPERTY_NAME 이라면 컴포넌트 클래스 코드에서는 this.props.PROPERTY_NAME으로 접근 가능

  두 번째 경우로, 표준 HTML 속성명과 일치하지 않는다면 속성명이 표준 속성이 아닌 것이다.
  이 때는 HTML에 렌더링하지 않는다. 그렇지만 이 값은 this.props 객체에서 this.props.PROPERTY_NAME 같은 방식으로 접근 가능하다.
  render() 메서드에서 입력하여 렌더링하거나 코드에서 활용할 수 있다.
  이 방법을 이용하면 같은 클래스의 서로 다른 인스턴스에 각각 다른 데이터를 넘겨줄 수 있다.
  이렇게 컴포넌트를 재사용할 수 있는데, 엘리먼트마다 다른 속성을 제공해서 서로 다르게 렌더링하도록 프로그래밍 방식으로 변경할수 있기 때문이다.

  Note: Object.freeze()와 Object.isFrozen()

  내부적으로 React는 ES5 표준인 Object.freeze()를 사용하여 this.props 객체를 불변 객체로 만든다.
  객체에 Object.freeze()가 적용되었는지 확인하려면 Object.isFrozen() 메서드를 사용할 수 있다. 
  예를 들면 다음 문장을 실행했을 때 true를 확인할 수 있을지 생각해보자.
  */

  class HelloWorld extends React.Component {
    render() {
      console.log(Object.isFrozen(this.props));
      return React.createElement('div', null, h1, h1);
    }
  }
  /*
  속성의 기능을 활용해서 속성 값에 따라 렌더링하는 엘리먼트를 아예 다른 모습으로 바꿀 수도 있다.
  예를 들면 다음 예제처럼 this.props.heading이 true이면 "Hello"를 <h1>으로 렌더링하고, 
  false이면 문단으로 렌더링할 수 있다.
  */
  render() {
    if (this.props.heading) return <h1>Hello</h1>
    else return <p>Hello</p>
  }
  /*
    다시 정리하면 같은 컴포넌트에 다른 속성 값을 입력하면 컴포넌트가 렌더링한 엘리먼트의 모습을 다르게 할 수 있다는 것이다.
    속성은 render() 메서드를 통해 렌더링할 수 있고, 컴포넌트 클래스의 코드에서 사용할 수 있으며, HTML 속성으로도 사용할 수 있다.

    컴포넌트의 속성을 이해하기 위해서 HelloWorld 컴포넌트에 속성을 약간 변경해 보자.
    목표는 HelloWorld 컴포넌트를 재사용해서 각 인스턴스가 서로 다른 텍스트와 HTML 속성을 갖도록 하는 것이다.

    HelloWorld 제목인 <h1> 태그에 다음처럼 세 가지 속성을 추가할 것이다.
      - id: HTML 표준 속성 id와 일치하고, React가 자동으로 렌더링한다.
      - frameworkName: <h1>의 표준 속성이 아니지만, 제목 텍스트로 표시할 때 사용하는 값이다.
      - title: HTML 표준 속성인 title과 일치하고, React가 자동으로 렌더링한다.

    cf: p76 그림 2-7: HelloWorld 컴포넌트 클래스는 HTML 표준 속성인 id와 title을 렌더링하지만 frameworkName은 렌더링 하지 않는다.

    react strucure
      div
        HelloWorld            HelloWorld            HelloWorld
        id , title            id , title            id , title
        frameworkName         frameworkName         frameworkName
    
    real render result
      <div>
        <h1 id="" title=""></h1>
        <h1 id="" title=""></h1>
        <h1 id="" title=""></h1>
      </div>
    
    React는 속성명이 표준 HTML 속성과 일치하면 <h1> 요소의 속성으로 렌더링 한다.
    id와 title은 <h1> 요소의 속성으로 렌더링하고 frameworkName은 렌더링 하지 않는다.
    frameworkName이 표준 속성이 아니므로 경고 메시지도 확인 가능하다.

    <div> 엘리먼트의 구현을 자세히 살펴보자. 분명히 HelloWorld 클래스의 자식 엘리먼트 세 개를 렌더링해야 하지만, 
    실제 <h1>의 텍스트 속성은 각각 달라야 한다. 
    예를 들면 id, frameworkName, title을 전달하는데, 이 셋이 HelloWorld클래스의 일부가 된다.

    Note: React 버전 16 부터는 HTML 표준 속성이 아닌 HTML 속성도 렌더링하도록 변경 되었다.
    즉 비표준 속성인 frameworkName도 렌더링 된다.
    DOM 요소에 표준이 아닌 속성을 적용하려면 소문자로만 작성해야 한다.
    부모컴포넌트에서 작성해야 하는 속성을 실수로 작성했다면 제거하라는 친절한 경고도 확인할 수 있다.

    <h1>을 구현하기 전에 HelloWorld 클래스의 속성을 전달해야 한다면?
    <div 컨테이너 내부에 HelloWorld 엘리먼트를 생성하는 시점에 createElement()의 두 번째 인자로 객체 리터럴로 속성을 작성하여 넘겨준다.
  */
  ReactDOM.render(                                                  
    React.createElement(
      'div',
      null,
      React.createElement(HelloWorld, {
        id: 'ember',
        frameworkName: 'Ember.js',
        title: 'A framework for creating ambitious web applications'
      }),
      React.createElement(HelloWorld, {
        id: 'backbone',
        frameworkName: 'Backbone.js',
        title: 'Backbone.js gives structure to web applications...'
      }),
      React.createElement(HelloWorld, {
        id: 'angular',
        frameworkNanme: 'Angular.js',
        title: 'Superheroic Javascript MVW Framework'
      })
    ),
    document.getElementById('content')
  );
  /*
  cf: p78 그림 2-8 HelloWorld 클래스를 세 번 사용해서 속성과 innerHTML이 서로 다른 h1 요소 세 개를 만들었다.
  div (React 엘리먼트)                div
      HelloWorld                        h1 id title
    id          title       ---->       h1 id title
      frameworkName                     h1 id title

          ↓ 

  div (React 엘리먼트)
      HelloWorld (React 엘리먼트)
      id title frameworkName
      h1 (React 엘리먼트)
      id title frameworkName
  'Hello' + this.props.frameworkName + 'world!!!'
  */
  class HelloWorld extends React.Component {
    render() {
      return React.createElement(
        'h1',
        null,
        'Hello' + this.props.frameworkName + 'world!!!'
      )
    }
  }
  /*
    컴포넌트 render() 메서드 내부에서 this.props 객체에 접근하면 createElement()의 두 번째 매개변수로 전달한 객체에 접근할 수 있다.
    예를 들면 {id: 'ember'...}와 같은 객체다.
    this.props 객체의 키는 createElement()의 두 번째 매개변수로 전달한 객체의 키와 같다. this.props의 키로 id, frameworkName, title를 확인 가능하다.
    React.createElement()의 두 번째 인자로 전달하는 키-값 쌍의 수는 제한이 없다.

    HelloWorld 컴포넌트의 모든 속성을 자식 엘리먼트인 <h1>에 넘겨주는 것도 가능하다. 컴포넌트에 어떤 속성이 전달되는지 확실하지 않을 때 매우 유용한 방법이다.
    예를 들면 HelloWorld 컴포넌트로 인스턴스를 생성하는 개발자가 스타일 속성을 직접 입력할 수 있도록 해야 하는 경우가 있다.
    따라서 <h1></h1>에 렌더링할 HTML 속성에 제한을 두지 않는다.
  */
  // HelloWorld 컴포넌트의 모든 속성을 <h1></h1>으로 전달하는 경우
  class HelloWorld extends React.Component {
      render() {
        return React.createElement(
          'h1',
          this.props,
          'Hello' + this.props.frameworkName + 'world!!!'
        )
      }
  }
  // 엘리먼트 생성 시 속성 전달
  class HelloWorld extends React.Component {
    render() {
      return React.createElement(
        'h1',
        this.props,
        'Hello' + this.props.frameworkName + 'world!!!'
      )
    }
    ReactDOM.render(
      'div',
      null,
      React.createElement(HelloWorld, {
        id: 'ember',
        frameworkName: 'Ember.js',
        title: 'A framework for creating ambitios web application' 
      }),
      React.createElement(HelloWorld, {
        id: 'backbone',
        frameworkName: 'Backbone.js',
        title: 'Backbone.js gives structure to web application...'
      }),
      React.createElement(HelloWorld, {
        id: 'angular',
        frameworkName: 'Angular.js',
        title: 'Superheroic Javascript MVW Framework'
      })
      document.getElementById('content')
    )
  }
```

### 요약
```
  - React 엘리먼트를 중첩하여 자식 엘리먼트로 추가하려면 createElement()의 세 번쨰 인자로 계속해서 전달하면 된다.
  - React 엘리먼트를 생성할 때 사용자 저으이 컴포넌트를 클래스를 사용한다.
  - 속성을 사용하여 React 엘리먼트의 렌더링 결과를 바꾼다.
  - 부모 컴포넌트는 자식 엘리먼트에 속성을 전달할 수도 있다.
  - React 컴포넌트를 통해 컴포넌트 기반 아키텍처를 구현할 수 있다.
```