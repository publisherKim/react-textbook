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
  */

```