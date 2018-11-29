# 1. React 기초
```
  1장   React 살펴보기
  2장   React 첫걸음
  3장   JSX
  4장   React 컴포넌트의 상태 객체
  5장   React 컴포넌트 라이브사이클 이벤트
  6장   React에서 이벤트 다루기
  7장   React에서 폼 다루기
  8장   확장성을 고려한 React 컴포넌트
  9장   프로젝트: Menu 컴포넌트
  10장  프로젝트: Tooltip 컴포넌트
  11장  프로젝트: Timer 컴포넌트
```

## 1장
```
  React 살펴보기
    - React의 기본 개념
    - React를 이용한 문제 해결 과정
    - 웹 애플리케이션에 React 적용하기
    - 첫 번째 React 앱 만들기: Hello World
```

### 1.1 React란 무엇인가?
```
  React: 
    - UI 컴포넌트 라이브러리이다.
    - 다른 특별한 템플릿 언어가 아닌 자바스크립트를 이용한다.
    - 여러 컴포넌트로 UI를 구성하는 방식은 React의 핵심 철학이다.
    - 컴포넌트 기반 아키텍처이다. (일체형 UI에 비해 재사용과 유지보수, 확장이 용이하다.)
    - 순수한 자바스크립트 기반이다.
```

### 1.2 React가 해결할 수 있는 문제
```
  React는 어떤 문제를 해결 하는가?
    - 복잡한 웹UI로 구성된 프론트엔드 어플리케이션을 개발하고 관리하는데 활용
    - 데이터가 변경될때마다  뷰를 직접 변경하고 관리하는것은 매우 어려움
    - 시간에 따라 변화하는 데이터를 다루는 거대한 어플리케이션의 개발
    - DOM 요소를 재사용하는 것이 점점 복잡해져서 DOM 요소를 매번 새롭게 생성하기로 결정
    - UI를 함수로 만듬
    - 데이터를 전달하고 호출하여 뷰를 렌더링 하므로 뷰가 예측 가능해짐
    - 메모리에 DOM 요소를 생성하는것은 빠르지만 DOM으로 렌더링 하는 과정에서 병복이 발생
    - DOM에서의 문제를 피하기 위한 알고리즘 생성

  React의 성공요인:
    - 훌륭한 성능
    - 개발자 친화적
    - 컴포넌트 기반 구조
```

### React의 장점
```
  jQuery의 경우를 생각해보면 네이티브 자바스크립트로 코딩할 때 크로스 브라우징 지원에 도움이 되었음
  예전에는 jQuery를 프레임이워크라고 불렀지만, 이제는 프레임워크란 조금 더 크고 강력한 기능을 갖춘것을 의마한다.
  jQuery AFTER:
    Backbone, AngularJS 자바스크립트 프레임워크도 새로운 방법을 제시

  React:
    - 단순한 웹 개발: 
      1. React는 순수 자바스크립트 만든 컴포넌트 기반 아키텍처
      2. 선언형 스타일
      3. 강력하고 개발자 친화적인 DOM 추상화를 제공
      4. React Native의 경우 DOM뿐만 아니라 Android나 iOS에서도 이런 이점을 얻을수 있음
    
    - 빠른 UI:
      1. React는 뛰어난 성능을 제공한다.
      2. 가상 DOM 채택과 DOM의 변경 사항을 비교할 때 사용하는 훌륭한 알고리즘 
      3. 헤드리스 브라우저를 사용하지 않고도 테스트 수행 가능

    - 코드량 감소:
      React 커뮤니티와 개발 생태계를 통해 수많은 라이브러리와 컴포넌트를 접할 수 있다.
      개발에 사용할 프레임워크를 선택할때 강점
```

#### 간결성
```javascript
  /*
  컴퓨터 공학에서 간결성은 개발자와 사용자에게 중요한 가치다.
  간결성은 편리하게 사용하는 것과는 다르다.
  간결하다 해도 경우에 따라 구현하기 어려울 수 있다.
  하지만 결과적으로 그렇지 않은 경우보다 우아하며 효율적이다.
  쉬운것이 복잡해지는 경우는 정말 나쁘다.(KISS 원칙: https://m.blog.naver.com/PostView.nhn?blogId=clocher&logNo=220156788805&proxyReferer=https%3A%2F%2Fwww.google.co.kr%2F)
  간결한 시스템이 더 잘 작동한다.

  React를 간결하게 만드는 기능들
    1. 선언형 스타일 채택: React는 뷰를 자동으로 갱신하는 선언형 스타일을 채택한다.
    2. 순수한 자바스크립트를 이용한 컴포넌트 기반 아키텍처: React는 컴포넌트에 자바스크립트만 사용 할 뿐 템플릿 엔진 같은 도메인 특정 언어를 사용하지 않는다. 
       또한 한 가지 기능을 개발하기 위해 기술을 분리하지 않는다.
    3. 강력한 추상화: React는 DOM을 쉽게 다룰수 있고, 같은 기능이자만 크로스 브라우징을 위해 다르게 구현할 수 밖에 없었던 인터페이스나 이벤트 핸들링을 정규화 했다.

  선언형 스타일 채택:
    1. 명령형 대신 선언형 스타일을 채택:
      - 선언형 스타일은 개발자가 순서대로 무엇을 해야 할지를 작성하는 명령형 스타일과 달리, 실행 결과가 어떻게 되어야 할지를 코드로 작성

    선언형 스타일의 장점: 
      - 복잡도 감소
      - 코드에 대한 이해도와 가독성 증가
  */
  // 두가지 방식의 차이를 알수 있는 코드 명령형 vs 선언형
  const arr = [1, 2, 3, 4, 5],
    arr2 = [];
  for (var i = 0; i < arr.length; i++) {
    arr2[i] = arr[i] * 2;
  }
  console.log('a', arr2);

  const arr = [1, 2, 3, 4, 5]
      arr2 = arr.map((v, i) => return v * 2);
  console.log('b', arr2);

  // 또다른 예제
  const profile = {account: '47574416'};
  const profileDeep = {account: {number: 47574416}};
  console.log(getNestedValueImperatively(profile, 'account') === '47574416');
  console.log(getNestedValueImperatively(profileDeep, 'account.number') === 47574416);

  var getNestedValueImperatively = (object, propertyName) => {
    const currentObject = object;
    const propertyNameList = propertyName.split('.');
    const maxNestedLevel = propertyNameList.length;
    let currentNestedLevel;

    for (currentNestedLevel = 0; currentNestedLevel < maxNestedLevel; currentNestedLevel++) {
      if (!curentObject || typeof currentObject === 'undefined') return undefined;
      currentObject = currentObject[propertyNameList[currentNestedLevel]];

      return currentObject;
    }
  };

  var getValue = (object, propertyName) => typeof Object === 'undefined' ? undefined: object[propertyName];
  var getNestedValueDelaratively = (object, propertyName) => propertyName.split('.').reduce(getValue, object);
  console.log(getNestedValueDelaratively({bar: 'baz'}, 'bar') === 'baz');
  console.log(getNestedValueDelaratively({bar: { baz: 1 }}, 'bar.baz') === 1));

  // 과거의 프로그래머는 명령형에 익숙하지만, 일반적으로는 선언형 프로그래밍이 더 단순하다.

  /*
    React UI를 구성할 때 선언형 스타일로 작성한다.
    UI요소를 선언형 스타일로 작성한 후 뷰에 변경이 발생하는 경우 React가 알아서 갱신한다.

    뷰를 갱신해야 할 때가 바로 선언형 스타일이 빛을 발하는 순간이다.
    이것을 내부상태 변화라고 부른다.
    React는 상태 변경에 따라 뷰를 갱신

    React는 내부적으로 가상 DOM을 사용하여 브라우저에 이미 반영된 뷰와 새로운 뷰의 차이점을 찾는다.
    이 과정을 DOM 비교(diffing) 또는 상태와 뷰의 보정(reconcliation)
    따라서 개발자는 상태 관리를 따로 해줄 필요가 없다.
    상태를 변경하면 뷰는 이에 따라 자동으로 갱신된다.(this is awsome!)

    jQuery는 갱신과정을 명령형으로 작성한후 DOM조작을 통해 뷰를 변경
    AngularJS는 자동으로 갱신하기는 하나 양방향 데이터 바인딩을 이용한다.
    이것은 말 그대로 뷰와 모델이 양방향으로 데이터를 통신하고 동기화 한다는 것을 의미

    jQuery와 AngularJS가 선택한 방식의 단점:
      - 각각은 극단적인 선택이라고 볼 수 있다.
      - jQuery는 아무것도 하지 않고 개발자가 직접 뷰의 갱신 과정을 하나하나 작성해야 한다.
      - AngularJS는 프레임워크가 모든 것을 처리한다.

      - jQuery 방식을 선택하면 실수가 잦아지고, 더 많은 노력을 들여야 구현 가능하다.
        실제 DOM을 직접 조작하는 방법은 UI가 간단할 때는 문제가 없지만 DOM 트리의 많은 부분을 다루게 되면 한계에 봉착한다.
      - 명령형으로 작성하면 선언형보다 함수 실행의 결과를 예측하기가 더 어렵다(data가공, 관리를 천재가 아니면 안하는게 좋다.)

      - AngularJS의 양방향 데이터 바인딩은 금세 통제하기 어려운 상태가 되므로 코드를 잘 설명하기 어렵다.
      - 기능이 늘어나면 갑작스럽게 다른 뷰에서 모델을 갱신하거나 그 모델이 다른 뷰를 갱신하는 문제가 발생하기도 한다.
      - AngularJS 방식이 어떤 면에서는 jQuery보다 가독성이 좋고, 직접 작성해야하는 부분이 적기는 하지만 템플릿과 ng-if 지시자처럼 도메인 특정 언어에 의존한다.

    자바스크립를 이용한 컴포넌트 기반 아키텍처
      - 관심사 분리
      - 느슨한 결합
      - 코드 재사용
      - 순수한 자바스크립트 구현한 컴포넌트 기반 아키텍처는 React이전에는 없었다.
      - AngularJS, Backbone, Ember 같은 기존의 프론트엔드 MVC 프레임워크에서는 자바스크립트 템플릿이 분리됨(AngularJS 같은 경우는 컴포넌트 대신 지시자라는 용어를 사용)
      - 컴포넌트 하나에 두가지 언어, 즉 파일을 두개 이상 사용시 문제점:
        * HTML을 서버에서만 렌더링 할 경우에는 HTML과 자바스크립트를 분리해도 문제가 없었고 매우 단순한 기능들을 구현
      - SPA의 경우 복잡한 사용자 입력을 처리하고 브라우저에서 렌덩링을 수행한다. 즉 HTML과 자바스크립트가 기능적으로 밀접하게 결합 됨
      - 프로젝트 하나 또는 컴포넌트 하나를 위한 작업이라면 HTML과 자바스크립트를 분리하지 않는 방식이 개발자에 합리적이라는게 요즘 대세
  */
  // AngularJS smple vs react sample
  <a ng-if="user-session" href="/logout">Logout</a>
  <a ng-if="!usr-session" href="/login">Login</a>
  // ng-if 같이 특정 지시자의 작동방식을 학습해야함

  // react case:
  if (user.session) return React.createElement('a', { href: '/logout' }, 'Logout');
  else return React.createElement('a', {href: '/login'}, 'Login');

  // AngularJs Reapeat vs react Repeat
  <div ng-repeat="account in accounts">
    {{account.name}}
  </div>

  // react case:
  accounts.map(account => react.createElement('div', null, account.name));

  /*
    계정목록이 변경되는 유지보수 상황을 가정해보자:
      템플릿을 사용할 경우 템플릿을 호출해서 사용하는 자바스크립트 파일을 열고, 계정을 찾아 속성을 확인해야 한다.

      반면 React는 자바스크립트와 마크업을 한 곳에 두어, 템플릿을 사용할 떄처럼 매번 파일이나 언어를 바꾸는 수고를 줄여 준다.

      Note: 일반적으로 관심사 분리는 좋은 패턴이다. 간단히 말해서, 데이터 서비스나 뷰 레이어처럼 서로 다른 함수를 분리하는것을 의미
      다만 템플릿 마크업과 이에 관련된 자바스크립트 코드를 다루는 경우는 결과적으로 한가지 기능을 위해 두 개의 파일을 사용하는 것이다.
      다뤄야 하는 파일이 .js와 .html 두 개이므로 관심사 분리라고 보기 어려움.

      AngularJS는 훌륭한 프레임워크이나 지시자처럼 특정 도메인 언어에 종속적인건 단점이다.
      React는 그나마 순수 자바스크립트에 가까우므로 이런 문제가 발생하지 않는다.

      즉 React를 사용하면서 얻은 지식은 다음 프로젝트에 React를 사용하지 않아도 사용 가능하다.
      순수하게 자바스크립트만 이용한 컴포넌트 기반 아키텍처이고 분리와 캡슐화가 잘 이뤄져 있고, 재사용 가능하고
      도메인 특정 언어나 템플릿, 지시자 같은 기능 없이도 더 나은 관심사 분리를 보장한다.

      학습곡선에 있어서도 자바스크립트를 잘 이해하고 있다면 별도의 다른 학습이 필요하지 않다.

    강력한 추상화
      - React는 강력한 문서 모델 추상화를 제공한다.
      - 내부의 인터페이스는 숨기고, 대신에 정규화 과정을 거친 합성 메서드와 속성을 제공한다.
        ex: React에서 onClick 이벤트가 발생하면, 이벤트 핸들러는 브라우저의 원본 이벤트 객체 대신 원본 객체를 감싼 합성 이벤트 객체를 전달 받는다.
            브라우저의 종류와 상관없이 항상 같은 이벤트 객체를 전달 받는 것이다. 또한 React는 터치 이벤트에서도 합성 이벤트를 제공하므로 크로스 브라우징에 유연한다.
      - 서버측 렌더링이 가능하다.(SEO에 유리)
  */
```

#### 속도와 테스트 용이성
```
  필요한 DOM 갱신 외에도 프레임워크에서 불필요한 갱신을 일으키는 경우가 있다.
  불필요한 갱신이 발생하면 UI가 복잡할 때는 더욱 더 성능이 저하된다.
  동적인 UI가 많은 웹 페이지의 경우 사용자 입장에서 사용성이 눈에 띄게 떨어진다.

  반면에, React의 가상 DOM은 자바스크립트 메모리에만 존재한다.
  데이터를 변경하면 React는 가상 DOM을 먼저 비교하고, 렌더링 변경이 필요한 경우에만 실제 DOM에 렌더링한다.

                      React 가상 DOM                                        실제DOM
                      ReactElement
2.상태변경->           ReactNode                     1.렌더링->              DOMNode
                      ReactComponent

                      3. 비교 알고리즘↓

                      가상 DOM:
                      상태 변경에따라                 4. 변경이 필요한 요소만 다시 렌더링 ->                  실제DOM
                      뷰를 갱신해야할 컴포넌트                                                                
                                                                                                          DOMNODE

  결과적으로 React는 꼭 필요한 부문만 갱신하여 내부 상태(가상 DOM)와 뷰(실제 DOM)를 같게 만든다.
  예를 들어 <p> 요소에 입력한 문장을 해당 컴포넌트의 상태(state)를 변경하여 늘리는 경우에는 요소 자체가 아닌
  해당 문장만 갱신한다. innerHTML이라고 할수 있다. 요소 전체 또는 서버 측 렌더링처럼 전체 페이지를 다시 렌더링하는 것에 비하면 성능이 뛰어나다.

  Note: 
    - 알고리즘에 관심이 있다면 http://mng.bz/PQ9X (보정에 알고리즘에 관한 글)
    - React의 비교 알고리즘에 대한 글 http://mng.bz/68L4

  끝으로 가상DOM의 장점은 PhantomJS 같은 헤드리스 브라우저 없이도 단위 테스트를 수행할수 있다는 점이다.
  Jasmine(http://jamine.github.io)을 기반으로 만든 Jest(https://facebook.gihub.io/jest)를 사용하면 명령줄에서 바로 
  React 컴포넌트를 테스트 가능하다.
```

#### React의 폭넓은 개발 커뮤니티와 생태계
```
  거대기업이 사용한다는 장점 (검증 되었다는 의미)
  개선 속도가 나날이 빨라짐

  React 개발 커뮤니티 목록
    - 컴포넌트: https://github.com/brillout/awesome-react-components, http://devarchy.com/react-components
    - 구글 머티리얼 디자인 명세에 따라 구현한: https://github.com/react-toolbox/react-toolbox
    - 머티리얼 디자인: https://github.com/react-toolbox/react-toolbox
    - 오피스 365용 React 컴포넌트: https://github.com/OfficeDev/office-ui-fabric-react
    - 오픈 소스 자바스크리트 패키지 모음 사이트: https://js.coach/
    - React 컴포넌트 모음: https://react.rocks
    - 칸 아카데미으 React 컴포넌트: https://khan.github.io/react-components
    - React 컴포넌트 검색: http://www.reactjsx.com

  오픈소스의 경우 프로젝트의 마케팅은 해당 오픈 소스의 폭넓은 전파나 코드 자체의 높은 수준만큼 중요하다.

  프로젝트의 웹 사이트 문서, 예제가 충분하지 않거나 로고가 이상한 경우에는 피하자.
  브랜드가 다는 아니지만, 믿고 선택하면 평타는 간다는 느낌
```

### React의 단점
```
  선언형과 명령형 같은 주제는 주관적 주제로 장단점에 있어서 양날의 검이다.

  리액트 경험자들의 단점 모음
    - React는 스위스 군용칼처럼 모든 기능을 갖춘 프레임워크는 아니다. 그러나 라이브러리를 이용하면 더 폭넓은 사용이 가능하다.
    - React는 다른 프레임워크만큼 성숙하지 않다. React의 핵심 API는 여전히 변화하고 있으며 컴포넌트의 생태계, 플러그인, 추가 기능등에 관한 모범 사례도 여전히 개발 중이다.
    - React에 정통한 수준이 될 만한 모범 사례나 훌륭한 책, 강의, 자료 등이 부족하다.
    - 단방향 바인딩은 복잡도를 줄이지만, 양방향 데이터 바인딩을 이용하는 개발자들에겐 불편하다.
    - React를 리액티브 프래이라고 보기엔 부족하다. RxJS 같은 도구를 사용해야 한다.(이벤트 기반이고 탄력성과 반응성을 지향 한다면) https://github.com/Reactive-Extensions/RxJS
```

### 웹 애플리케이션에 React 적용하기
```
  React Router나 데이터 관리 라이브러리를 떼어놓고, React 자체만 놓고보면 Backbone, Ember, AngularJS 같은 프레임워크보다는 템플릿 엔진(Handlebars, Blaze)이나 DOM 조작을 위한 
  라이브러리(jQuery, Zepto)와 더 비슷하다. 사실 많은 팀이 여러 프레임웍이나 라이브러리를 React로 교체해 성공했다.

  React는 UI 일부에만 적용 가능하다. 서서히 React로 리팩토링도 가능하단 뜻

  특정 백엔드에 종속적이지 않다. (MERN 스택 같은것이 필수가 아님)
  React는 UI 라이브러리일 뿐 어떤 형태의 백엔드나 프론트엔드 데이터 관리 라이브러리와도 공존 할 수 있다.

  정리
    - UI 라이브러리로 React와 관련된 Redux나 React Router를 활용한 단일 페이지 애플리케이션 스택의 구성
    - MVC의 V를 대체하는 UI 라이브러리로 기존 MVC 프레임워크와 결합
    - jQuery를 기반으로 서버 측 렌더링을 거친 애플리케이션에서 자동완성 등 일부 기능을 위한 UI 컴포넌트로 활용
    - 대부분의 로직을 직접 처리하는 전통적인 방식의 백엔드에서 서버 측 렌더링 템플릿 라이브러리로 활용
    - 백엔드와 프론트엔드에서 모두 자바스크립트를 사용하는 경우(express-react-views를 활용한 Express.js 등)
    - React Native를 UI 라이브러리로 사용한 모바일 앱
    - 여러 가지 렌더링 대상에 적용할 목적으로 사용하는 UI 라이브러리

  React는 다른 프론트엔드 기술과 함께 사용해도 잘 동작하지만, 단일 페이지 어플리케이션에 사용하는 경우가 궁합이 좋다.
  서버 측 리액트 express-react-view(https://github.com/reactjs/express-react-views)를 사용하면 React 컴포넌트를 백엔드에서 렌더링할 수 있다.
  서버 측 렌더링이 가능한 이유는 React를 활용해서 브라우저 외의 대상에도 렌더링할 수 있기 때문이다.
```

#### React 라이브러리와 렌더링 대상
```
  0.14 이후 버전부터는 기존의 React를 react와 react-dom이라는 두 패키지로 분리해서 npm에 배포하기 시작했다.
  React를 웹 개발뿐만 아니라 UI개발이 필요한 환경이라면 어디에나 사용할 수 있는 라이브러리도 만드는 과정을 시작

  before: React.render() 메서드의 경우 DOM 노드에 엘리먼트를 집어 넣음
  after: react-dom 패키지로 이전되어 ReactDOM.render()를 사용한다.(돔 전용 렌더 메서드)

  React 커뮤니티는 여러 가지 렌더링 대상에 React를 적용할 수 있는 패키지를 선보였다.
  컴포넌트 작성과 렌더링을 분리한 것이다. 
    - blessed(https://github.com/chjj/blessed) 터미널 인터페이스용 렌더러: http://github.com/Yomguithereal/react-blessed
    - ART 라이브러리용 렌더러(https://github.com/sebmarkbage/art): https://github.com/reactjs/react-art
    - <canvas> 렌더러: https://github.com/Flipboard/react-canvas
    - 3D 라이브러리 three.js용 렌더러(http://threejs.org): https://github.com/Izzimach/react-three
    - VR과 360도 인터페이스를 위한 렌더러: https://facebook.github.io/react-vr

  react와 react-dom이 분리되면서 웹용으로 개발된 React 컴포넌트와 네이티브 모바일 애을 위해 시작한 React Native용 컴포넌트 간에 코드 공유 가능해짐
  결과적으로 웹 개발에 React를 사용할 때는 react와 react-dom을 사용해야 한다.

  여기에 React의 유틸리티 라이브러리가 추가되었다. version 15.5 이전에는 이 중 일부가 Reac의 부가 기능(add-ons)으로 제공됨
  이런 유틸리티 라이브러리는 불변 데이터를 다루거나(https://github.com/kolodny/immutability-helper) 테스트를 수행할 떄 도움

  끝으로 React는 JSX와 궁합이 좋다. JSX는 React UI 개발을 편리하게 해주는 간단한 언어다. Babel 같은 도구를 사용해서 JSX를 자바스크립트로 변환한다.

  React와 관련된 많은 도구가 모듈화되어 다른 패키지로 분리됨
  모든것을 다 갖춘 단일 프레임워크에서 정해진 방식대로 구현하는 것외에 선택의 자유 및 다른 즐거움이 생긴다.(자유는 책임질수 있을때 유용하다!!!)
```

#### 단일 페이지 애플리케이션과 React
```
  단일 페이지 어플리케이션(single page application SPA) 아키텍처는 서버보다는 클라이언트, 즉 브라우저 측에 로직이 더 많은 펫 클라이언트(fat client || thick client)다.
  SPA는 HTML 렌더링, 입력값 검증, UI 변경 등의 기능을 브라우저에서 해결한다.

  1. 사용자가 새로운 페이지를 열기 위해 브라우저에 URL을 입력
  2. 브라우저가 URL 요청을 서버로 전송
  3. 서버는 응답으로 HTML, CSS, 자바스크립트 파일 같은 정적 자원을 보낸다. 대부분 HTML은 최소한의 기본 구조만 담고 있다. 
  4. 자바스크립트는 SPA를 위해 필요한 자원이다. 자바스크립트 로드 후 추가로 AJAX나 XHR 요청을 보내 서버에서 데이터를 불러온다.
  5. 데이터는 JSON, XML 등의 포맷으로 전달 받는다.
  6. SPA에 데이터가 전달되면 사용자 인터페이스를 구성하는 HTML을 렌더링한다. SPA는 템플릿에 전달받은 데이터를 밀어넣고 브라우저 상에서 UI를 렌더링한다.
  7. 브라우저 렌더링이 끝나면 SPA는 "로딩중..." 메시지를 없애고 사용 가능한 상태가 된다.
  8. 사용자가 웹페이지를 확인한다. 사용자는 페이지를 사용하면서 SPA를 통해 서버로 새로운 요청을 발생시키기도 하고, 앞에서 설명한 2~6단계를 거치기도 한다.
     이 단계에서는 경우에 따라 브라우저 라우팅이 이뤄지기도 한다. SPA에서 브라우저 라우팅을 구현하면 새로운 페이지를 로딩하지 않고 브라우저에서 다시 렌더링을 수행한다.
  cf: p54 그림 1-2 일반적인 SPA 아키텍처
  
  정리하면 SPA 방식은 UI 렌더링을 대부분 브라우저 상에서 해결한다. 모든 렌더링을 서버에서 해결하는 전통적인 방식과 달리 SPA에서는 데이터만 주고 받는다.
  (여기서 말하는 렌더링이란 템플릿으로 HTML을 생성하는 과정을 의미한다. 브라우저 상의 DOM에서 이뤄지는 렌더링과는 다른 개념이라고 생각하자.)

  SPA는 구현 방식으로는 MVC같은 아키텍처가 가장 인기가 좋지만, 다른 방식도 있다. React를 사용하는 데 MVC가 필수적인 것은 아니다. 그렇지만 간결하게 설명하기 위해서 MVC와 유사한 
  아키텍처를 사용한다고 가정해보자. 내비게이터나 라우팅 라이브러리가 MVC 패러다임의 컨트롤러처럼 데이터를 가져오고 이에 알맞은 받아온 데이터와 템플릿을 이용해 만든 HTML로 UI를 렌더링한다.
  UI는 클릭, 마우스 조작, 키 입력 같은 동작을 SPA에 전달한다.

  cf: p55 그림 1-3 단일 페이지 어플리케이션의 내부

  SPA 아키텍처는 브라우저에서 렌더링되므로 데이터도 브라우저에서 처리한다. 데이터를 이용해 HTML을 추가하거나 기존에 렌더링한 HTML을 변경한다. 이 덕분에 데스크롭 애플리케이션에 견줄 만큼
  훌륭한 웹 애플리케이션을 만들 수 있다. AngularJS, Backbone, Ember처럼 SPA 개발을 위한 프론트엔드 프레임워크의 예로 볼 수 있다.

  그림 1-3에서 React의 위치를 짚어보면 템플릿의 위치를 고를 수 있다. React는 뷰 계층이므로 데이터를 전달해서 HTML을 렌더링하는 목적으로 사용될 수 있다. 물론 React는 일반적인 템플릿 엔진보다는
  더많은 일을 한다. Underscroe, Handlebars, Mustche 같은 다른 템플릿 엔진과 React는 UI를 개발하는 방법, 갱신하는 방법, 상태를 관리하는 방법에서 차이가 있다.
```

#### React 개발 스택
```
  React와 함께 쓰기 위한 목적으로 개발한 라이브러리를 선택해서 개발 스택을 구성하기도 한다. 
    - 데이터 모데링과 백엔드 RefluxJS(https://github.com/reflux/refluxjs), Redux(http://redux.js.org) Meteor(https://www.meteor.com), Flux(https://github.com/facebook/flux)
    - 라우팅: React Router(https://github.com/reactjs/react-router)
    - React용 Bootstrap 컴포넌트: React-Bootstrap(https://react-bootstrap.github.io)

  Favorit react compnents list
    - date input component: https://github.com/Hacker0x01/react-datepicker
    - form input validator component: https://github.com/prometheusresearch/react-forms
    - WAI-ARIS 정의를 따르는 자동완성 컴포넌트: https://github.com/reactjs/react-autocomplete

  개발 스택에는 JSX도 있다. JSX는 React를 거부하는 이유가 되기도 한다. AngularJS에 익숙한 사람이라면 템플릿 코드 안에 자바스크립트를 작성해본 적이 있을 것이다.
  최신 웹 개발에서 단순 HTML은 너무나 정적이어서 그 자체로 사용하기가 어렵다. React와 JSX를 사용하는 것을 색안경을 끼고 보기보단 한 번쯤 공정한 입장에서 생각해 봐야 한다.

  JSX는 문법이 간단한데, XML이나 HTML의 <>를 이용하여 자바스크립트로 작성하는 React 객체를 만든다. JSX가 React와 잘 어울리는 이유는 코드 구현과 가독성 면에서 더 편리하기 때문이다.
  JSX는 자바스크립트로 변화하는 작은 언어라고 생각하면 좋다. JSX는 브라우저에서 작동하지 않지만 컴파일 과정의 소스 코드롤 활용된다. 
  smaple:
    if (user.session) return <a href="/logout">Logout</a>
    else return <a href="/login">Login</a>

  JSX 런타임 변환 라이브러리를 이용해서 브라우저에서 JSX를 사용하는 경우에도 결과적으로는 이를 변환한 자바스크립트를 실행하는 것이고, JSX를 실행하는 것이 아니다.
  이런 점에서 보면 JSX는 CoffeeScript와 비슷하다. 이런 언어는 자바스크립트로 변환하여 이용하여, 자바스크립트보다 편리한 문법과 기능을 쓸 수 있다.

  XML이 자바스크립트 사이에 들어가 있는 광경이 괴상하게 느껴지는 사람도 아마 있을 것이다.
  JSX를 꼭 사용해야하는건 아니지만, 사용하다보면 궁합이 좋다.(적응하면 문법이란게 패턴이라 편하다.)
```

### 첫 번째 React 앱 만들기: Hello World
```
  - 우선 JSX를 사용하지 않고 만들어 보기

  cf: sample code git url: https://github.com/azat-co/react-quickly

  folder - structure
    /hello-world
      /js
        react.js
        react-dom.js
      index.html

  Note: React의 경고와 오류 메시지는 프로덕션 빌드에는 포함되어 있지 않다. 
        여기에는 콘솔을 불필요한 메시지로 어지럽히지 않은려는 목적과 보안을 위한 목적,
        파일 크기를 줄이려는 목적이 있다. React의 프로덕션 빌드는 난독화 과정을 거친 
        react.min.js다. 또한, 난독화를 거치지 않은, 오류와 경고 메시지를 포함하고 있는
        개발 버전은 react.js다.

  React.createElement(elementName, data, child)
    elementName: HTML 태그명을 'h1'처럼 문자열로 작성하거나 직접 만든 컴포넌트 클래스 객체를 넘겨줄 수있다.
    data: 속성이나 상위 컴포넌트에 받는 값으로, null이나 {name: 'Azat'}와 같은 형태의 데이터다(상위컴포넌트에서 받는 값에 대해서는 나중에 살펴 보겠다.)
    child: 자식 엘리먼트나 태그 내부에 작성하는 테스트다.
```