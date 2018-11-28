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