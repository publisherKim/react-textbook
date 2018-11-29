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
      return React.createElemet('div', null, h1, h1)
    }
  }
  ReactDOM.render(
    React.createElement(HelloWorld, null),
    documenet.getElementById('content')
  )
  /*
    규칙에 따라 React 컴포넌트를 담는 변수의 이름은 대문자로 시작한다.
    JSX 없이 자바스크립트만 사용하는 경우에는 이런 규칙을 따르지 않아도 된다.
    (helloWorld 처럼 소문자 변수명을 사용할수 있다.)
    그렇지만 JSX를 사용할 경우에는 이 규칙을 따라야 하므로 여기서부터 이 규칙을 적용할 것을 추천한다.
    (JSX에서 React는 일반 <h1> 같은 HTML 요소와 <HelloWorld/> 같은 사용자 정의 컴포넌트 이름을 지을 때 대문자 규칙을 따르는 것은 좋은 생각이다.)
  */
```