## 8장
```
  확장성을 고려한 React 컴포넌트
  - 컴포넌트의 기본 속성 설정하기
  - 속성 타입과 유효성 검사 이해하기
  - 자식 렌더링
  - 코드 재사용을 위한 고차 컴포넌트 만들기
  - 모범 사례: 프레젠테이션 컴포넌트와 컨테이너 컴포넌트 비교

  지금까지 컴포넌트를 생성하여 상호작용하게 만들고, 이벤트와 입력 요소 등 사용자 입력을 다루는 방법에 대해 살펴 봤다.
  이런 지식을 바탕으로 React 컴포넌트를 이용한 웹사이트를 구축하다 보면 걸림돌이 하나씩 등장하기 시작할 것이다.
  특히 오픈 소스 개발자나 다른 소프트웨어 엔지니어(같은 팀 동료라든가)가 만든 컴포넌트에 의존해야 하는 거대한 프로젝트에서 문제를 경험한다.

  예를 들면 이렇다. 다른 개발자가 만든 컴포넌트를 사용할 때 속성을 제대로 전달했는지 어떻게 알 수 있을까?
  다른 컴포넌트에서도 공통적으로 사용할 약간의 기능을 기존 컴포넌트에도 적용하려면 어떻게 해야 할까?
  이는 개발 확장성의 문제다. 어떻게 하면 코드 베이스가 늘어날 때 코드의 확장성 문제를 해결할 수 있을까?
  React에는 확장성을 고려할 때 도움이 되는 기능과 패턴이 있다.

  이 질문들은 복잡한 React 애플리케이셔을 효과적으로 개발하는 방법을 배우고자 할 때 중요한 주제다.
  예를 들어 고차 컴포넌트는 컴포넌트의 기능을 향상시킬 수 있고, 속성타입(property types)은 안정적인 타입 검사를 제공하고 
  컴포넌트의 온전성을 보장하는 훌륭한 수단이다.

  속성 타입을 사용해서 좀 더 개발자 친화적인 코드를 만들 수 있고, 컴포넌트 이름과 고차 컴포넌트를 사용해서 효율적인 작업을 할 수 있게 될 것이다.
  팀 동료들이 여러분의 우아한 해결 방법에 감탄할지도 모른다.
```

### 컴포넌트의 기본 속성
```javascript
  // 예를 들어 행의 수(rows), 언어(locale), 현재날짜(current date)를 필수 속성으로 하는 Datepicker 컴포넌트를 개발한다고 가정해보자.

  <Datepicker currentDate={Date()} locale="US" rows={4} />
  /*
  만약 새로운 동료가 이 컴포넌트를 사용하면서 필수 속성인 currentDate를 누락한다면 어떻게 해야 할까?
  달력이 몇 행인지 지정하면서 숫자4 대신 문자열 "4"를 입력했다면 어떨까? 컴포넌트가 아무 작동도 하지 않고 undefined를 반환하거나
  아예 멈춰버려서 컴포넌트를 사용하던 동료가 "RefeeneceError가 나는데요?"라며 여러분을 탓할지도 모른다. 아이고!

  안타깝지만 자바스크립트가 느슨한 타입 언어이므로 이런 광경은 웹 개발에서 흔히 볼 수 있다.
  다행히 React는 속성의 기본값을 설정할 수 있는 기능으로 defaultProps를 정적 클래스 속성으로 추가할 수 있다.
  속성 타입에 대한 무제는 다음 절에서 자세히 살펴본다.

  defaultProps를 설정하면 컴포넌트 속성이 누락되었을 때 기본값을 렌더링할 수 있는 이점이 있다.
  defaultProps를 정의하여 컴포넌트 클래스에 기본 속성을 설정한다. 예를 들어 앞서 이야기한 Datepicker 
  컴포넌트 정의에서도 defaultProps를 정적 클래스 속성으로 추가할 수 있다.
  (construcor()에서 인스터스 속성으로 추가하면 정상적으로 작동하지 않는다.)
  */
  class Datepicker extends React.Component {
    ...
  }
  Datepicker.defaultProps = {
    currentDate: Date(),
    rows: 4,
    locale: 'US'
  }

  /*
  defaultProps를 더 자세히 설명하기 위해 버튼을 렌더링 하는 컴포넌트가 있다고 가정해보자.
  일반적으로 버튼에 라벨이 있기는 하지만, 라벨을 사용자 정의할 수 있으면 좋을 것이다.
  또한, 사용자 정의 값이 누락된 경우에는 기본값을 보여주면 좋겠다.

  버튼의 라벨은 buttonLabel 속성으로 render()의 return 문에서 사용한다. 부모가 버튼에 별도로 라벨을 지정하지 않아도
  Submit이라는 텍스트를 항상 보여주려고 한다.
  buttonLabel의 기본 값을 포함한 객체인 정적 클래스 속성 defaultProps를 구현하면 기본 라벨을 보여줄 수 있다.
  */
  class Button extends React.Component {
    render() {
      return <button className="btn">{this.props.buttonLabel}</button>
    }
  }
  Button.defaultProps = {buttonLabel: 'Submit'}
  
  // 부모 컴포넌트인 Conent가 버튼 네 개를 렌더링한다. 이 버튼 중 세 개에는 속성이 누락되었다.
  class Content extends React.Component {
    render() {
      return (
        <div>
          <Button buttonLabel="start"></Button>
          <Button></Button>
          <Button></Button>
          <Button></Button>
        </div>
      )
    }
  }
  /*
  렌더링 결과는 어떨까 ? 첫 번째 버튼의 라벨에는 Start가 적혀 있고, 나머지 버튼의 라벨에는 Submit이라고 적힌 것을 확인할 수 있다.

  컴포넌트에 기본 속성 값을 설정하는 것은 좋은 방법이다. 오류에 더 잘 대응할 수 있기 때문이다.
  즉, 아무런 값을 전달하지 않았을 때도 최소한의 형태를 유지하는, 좀 더 영리한 컴포넌트를 만들 수 있다.

  다른 관점에서 보면 기본값을 설정하여 같은 값을 반복해서 다시 설정하는 것을 피할 수 있다.
  대부분의 경우 같은 속성을 사용하지만 기본값을 덮어써서 변경할 수 있게 하고 싶다면 defaultProps 기능을 사용하여 간단하게 해결할 수 있다.
  예제에서 살펴본 첫 번째 버튼의 경우 처럼 기본값을 덮어쓰는 것은 아무런 문제도 일으키지 않는다.
  */
```

### React 속성 타입과 유효성 검사
```jsx
  /*
  Datepicker 컴포넌트의 속성 타입을 모르는 동료가 숫자 5 대신 문자열 "5"를 입력하는 경우를 다시 살펴보자.
  React 컴포넌트 클래스에 propTypes 정적 속성을 이용하면 속성 타입을 설정할 수 있다. 
  속성 타입 기능은 자료형을 강제하는 대신 경고를 보여준다.
  개발 모드(development mode)에서는 속성 타입이 일치하지 않으면 콘솔에서 경고 메시지를 확인할 수 있다.
  그렇지만 프로덕션 모드(production mode)에서는 잘못된 속성 타이을 사용하는 것을 방지하지 않는다.
  즉, 프로덕션 모드에서는 경고 문구를 제거한다. 따라서 propTypes는 대체로 개발 단계에서 잘못 사용한 
  자료형에 대해 경고하는 편의 기능이라고 볼 수 있다.

  Note: React의 개발 모드와 프로덕션 모드
        React 팀은 각각 난독화하지 않은 버전을 개발 모드, 난독화를 거친 버전을 프로덕션 모드로 정의하고 있다.
        React팀에서는 다음과 같이 소개한다.

          - 두 가지 버전의 React를 제공한다.
          - 개발을 위한 압축하지 않은 버전과 난독화를 거친 프로덕션 버전
          - 개발 버전에는 흔한 실수를 막기 위해 추가적인 경고 문구를 포함시킨 반면에, 
            프로덕션 버전에는 추가적인 성능 최적화를 적용하고 모든 오류 문구를 제거했다.

  React 버전 15.5와 이후 버전에서는 타입 정의가 prop-types(www.npmjs.com/package/prop-types)라는 별도 패키지로 제공된다.
  prop-types를 HTML 파일에 추가해야 한다. 패키지는 전역 객체 window.PropTypes가 된다.
  */
  // development version
  <script src="https://unpkg.com/prop-types@15.5.4/prop-types.js"></script>
  // production version
  <script src="https://unpkg.com/prop-types@15.5.4/prop-types.min.js"></script>

  /*
  React 버전 15.4 또는 이전 버전을 사용하는 경우에는 React.PropTypes로 React에 포함되어 있으므로 prop-types를 추가할 필요가 없다.

  다음은 속성 타입으로 문자열, 숫자, 열거자를 사용하는 Datepicker 클래스에 정적 속성으로 propTypes를 정의한 간단한 예제다.
  여기에는 나와 있지 않지만 예제에서는 React 버전 15.5를 사용했고, HTML에 prop-types를 추가했다.
  */
  class Datepicker extends React.Component {
    ...
  }
  Datepicker.propTypes = {
    currentDate: PropTypes.string,  // prop-types.js를 포함하므로 window.PropTypes다.
    rows: PropTypes.number,
    locale: PropTypes.oneOf(['US', 'CA', 'MK', 'EU'])
  }
  /*
  Warning | 프론트엔드의 사용자 입력 유효성 검사는 쉽게 피해갈 수 있으므로 여기에만 의존하는 것은 금물이다.
            더 나은 UX를 제공하기 위한 목적으로만 사용하고, 반드시 서버 측에서 모든 것을 검사해야 한다.
  
  속성 타입을 검사하려면 속성을 키로 하고 타입을 값으로 하는 객체를 생성하여 propTypes로 추가한다.
  React의 타입은 propTypes 객체에 있다.
    - PropTypes.string
    - PropTypes.symbol
    - PropTypes.number
    - PropTypes.bool
    - PropTypes.object
    - PropTypes.array
    - PropTypes.func
    - PropTypes.shape
    - PropTypes.any.isRequired
    - PropTypes.objectOf(PropTypes.number)
    - PropTypes.arrayOf(PropTypes.number)
    - PropTypes.node
    - PropTypes.instanceOf(Message)
    - PropTypes.element
    - PropTypes.oneOf(['News', 'Photos', ...])
    - PropTypes.oneOfType([PropTypes.number, ...])

  defaultPorps를 사용한 예제를 개선해서 속성 타입 추가하기
  이 프로젝트의 defaultProps 예제와 유사한 구조다.
  content.jsx, buton.jsx, script.jsx가 있고, index.html 파일에서 prop-types.js를 참조한다.
  */
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>속성타입 설정하기</title>
    <script src="js/react.js"></script>
    <script src="js/prop-types.js"></script>
    <script src="js/react-dom.js"></script>
    <link href="css/bootstrap.css" type="text/css" rel="stylesheet" />
    <link href="css/style.css" type="text/css" rel="stylesheet" />
  </head>
  <body>
    <div id="content" class="container"></div>
    <script src="js/button.js"></script>
    <script src="js/content.js"></script>
    <script src="script.js"></script>
  </body>
  </html>
  /*
  Buton 클래스를 정의하고, 문자열을 값으로 하는 선택적인 속성인 title이 있다고 가정하자.
  정적 클래스 속성(클래스 프로퍼티)으로 propTypes를 정의하여 키는 title, 값은 PropTypes.string으로 한다.
  다음 코드를 button.js에 추가한다.
  */
  Button.propTypes = {
    title: PropTypes.string
  }
  /*
  isRequired를 타입에 추가하면 필수 속성으로 지정할 수도 있다. 
  예를 들어 title이 필수 속성이고 문자열 형식이라면 다음과 같이 정의한다.
  */
  Button.propTypes = {
    title: PropTypes.string.isRequired
  }
  /*
  이 버튼은 handler 속성이 필수 속성이고, handler 속성의 값은 반드시 함수여야 한다. 
  (동작이 없는 버튼은 쓸모가 없다.)
  */
  Button.propTypes = {
    handler: PropTypes.func.isRequired
  }
  /*
  타입 유효성 검사를 직접 정의할 수 있는 좋은 기능도 있다. 사용자 정의 유효성 검사(custom validation)를
  구현하기 위해 Error 인스턴스를 반환하는 표현식을 생성한다. 생성한 표현식은 propTypes: {..}에서 속성의 값으로 사용할 수 있다.
  예를 들어 다음 코드는 email 속성을 정규표현식 emialRegularExpression으로 검사한다(내가 인터넷에서 복사해 왔다. 제대로 잘 될 것이다).
  */
  ...
  propTypes = {
    email: function (props, propName, componentName) {
      let emailRegularExpression = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
      if (!emailRegularExpression.test(props[propName])) {
        return new Error('Email validation failed!')
      }
    }
  }
  ...
  /*
  이제 모든 것을 함께 적용해보자. Button 컴포넌트는 선택적인 속성인 title(문자열)과 필수 속성인 handler(함수)와 함께 호출된다.
  다음 예제 코드(ch08/prop-types)는 속성 타입을 사용하여 handler와 title의 타입이 각각 함수와 문자열인지 검사하고, 
  email은 제공된 정규표현식과 일치하는지 검사한다.
  */
  // 예제 코드 8.1 propTypes와 defaultProps 사용하기
  class Button extends React.Component {
    render() {
      return <button className="btn">{this.props.buttonLabel}</button>
    }
  }
  Button.defaultProps = {buttonLabel: 'Submit'}

  Buton.propTypes = {
    handler: PropTypes.func.isRequired,  // 함수를 값으로 하는 handler 필수 속성이다.
    title: PropTypes.string,
    email(props, propName, componentName) {
      let emailRegularExpression = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
      if (!emailRegularExpression.test(props[propName])) {
        return new Error('Email validation failed')
      }
    } 
  }
  /*
  다음으로 부모 컴포넌트 Content를 구현한다. 버튼 여섯 개를 렌더링해서 속성 타입이 제공하는 경고 메시지를 확인해보자.
  버튼 여섯 개 랜더링하기
  */
  class Content extends React.Component {
    render() {
      let number = 1
      return (
        <div>
          <Button buttonLabel="Start"></Button>
          <Button></Button>                         // handler 속성을 누락하여 경고 메세지를 노출한다.
          <Button title={number}></Button>          // title 속성은 반드시 문자열이어야 한다는 경고 메시지를 노출한다.
          <Button></Button>
          <Button email="not-a-valid-email"></Button>         // 잘못된 이메일 양식이라는 경고 메시지를 노출한다.
          <Button email="hi@azat.co"></Button>
        </div>
      )
    }
  }
  /*
  이 코드를 실행하고 콘솔을 열어보면 그림 8-2와 같은 세 가지 경고 메시지를 확인할 수 있다. 
  첫 번째 경고는 예제 코드의 몇몇 버튼에서 누락시킨 handler 속성에 대한 경고 메시지다.
    Warning: Failed propType: Required prop `handler` was not specified in `Button`. Check the render method of `Content`.
    경고: 잘못된 propType: 필수 속성인 `handler`가 'Button'에 정의되지 않았습니다. `Content`의 render 메서드를 확인하세요.
  
  두 번째 경고 메시지는 네 번째 버튼에서 입력한 잘못된 이메일 양식에 관한 내용이다.
    Warning: Failed propType: Email validation failed! Check the render method of `Content`.
    경고: 잘못된 propType: Email 유효섬 검사에 실패했습니다. 'Content'의 render 메서드를 확인하세요.
  
  세 번째 경고 메시지는 문자열이어야 할 title 속성의 타입이 잘못됐다는 내용이다(예제 코드에서 숫자를 입력한 버튼이 있다).
    Warning: Failed propType: Invalid prop `title` of type `number` supplied to `Button`,
    expected `string`. Check the render method of `Content`.
    경고: 잘못된 propType: 'Button'의 속성 'title'에 'number' 타입의 값이 잘못 전달 되었으며, 이 속성은 'string'이어야 한다.
    'Content'의 render 메서드를 확인하세요.

  흥미로운 점은 handler 속성을 누락한 버튼은 여러 개지만, 경고 메시지는 한 번만 노출된다는 점이다.
  Content의 render()를 한 번 실행할 때, 각 속성에 대한 경고는 한 번씩만 노출된다.

  React에는 확인해야 할 부모 컴포넌트를 알려주는 멋진 기능이 있다. 이 예제의 경우 Content 컴포넌트를 확인해야 함을 알 수 있다.
  컴포넌트를 수백 개 다루는 경우를 가정해보면 매우 유용한 기능이다.

  개발자 도구의 메시지를 펼쳐보면 경고 메시지를 노출하게 만든 Button 엘리먼트 코드의 줄 번호를 확인할 수 있어 편리하다.
  그림 8-3을 보면 먼저 경고 메시지를 펼친 후에 content.js 파일을 선택했다. 메시지에 의하면 아홉 번째 줄에 문제가 있다.
  */
```