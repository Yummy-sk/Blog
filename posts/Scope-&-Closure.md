---
slug: 'Scope-&-Closure'
title: 'Scope & Closure'
description: '스코프와 클로저는 무엇일까?'
image: 'scope & closure.png'
date: '2022-04-06'
min: '☕️ 20 min read'
isFeatured: true
---

# 1. 스코프

## 1.1 스코프란?

```js
const x = 1;

function outerFunc() {
  const x = 10;

  function innerFunc() {
    console.log(x); // 10
  }

  innerFunc();
}

outerFunc();
```

위와 같이 `innerFunc` 의 결과가 10이 나온 이유가 무엇일까요?

그에 대한 정답은 스코프에 있습니다.

![Untitled](1.svg)

**변수는** **자신이 선언된 위치에 의해 이를 참조할 수 있는 범위가 결정됩니다.**

이렇게 **참조할 수 있는 범위를 우리는 스코프**라고 합니다.

## 1.2 스코프 체인

```js
function outerFunc() {
  // 외부 함수
  const x = 10;

  function innerFunc() {
    // 중첩 함수
    console.log(x); // 10
  }
}
```

위 예제와 같이 우리는 함수 안에 함수를 다시 정의할 수 있습니다.

이렇게 안에 정의된 함수를 중첩함수라고 하며, 이를 포함 하는 것을 외부 함수라고 합니다.

앞 예제에서 `innerFunc` 지역 안에 `x`를 선언하지 않았음에도 `outerFunc`의 `x`를 읽어올 수 있었습니다.

그 이유는 바로 함수는 각자의 스코프를 가지며, **계층적인 구조를 가지고 있기 때문**입니다.

### 🧐 그럼 어떻게 참조할 변수를 검색할 수 있을까?

앞서 우리는 각 함수는 각각의 스코프를 가지고 외부함수 또는 중첩함수에 의해 계층적인 구조를 가지고 있다는 것을 알아보았습니다.

```js
const x = 1;

function outerFunc() {
  // 외부 함수
  const x = 10;

  function innerFunc() {
    // 중첩 함수
    const y = 11;
    console.log(x); // 10
  }
}
```

위 코드의 스코프는 아래와 같이 구성될 것 입니다.

![Untitled](2.svg)

따라서, inner는 x를 가지고 있지 않음에도 outer의 x를 읽어올 수 있었던 이유도 이렇게 스코프는 계층적인 구조를 가지고 있기 때문입니다.

그래서 만약 현재 스코프에 없으면 순차적으로 상위 스코프를 읽다가 전역까지 갔는데도 없으면 그때 에러를 발생시키게 됩니다.

이러한 것을 가능하게 하는 것이 스코프 체인입니다.

> 변수 참조시, JS엔진은 스코프 체인을 통해 현재 자신의 스코프 부터 상위 스코프 방향으로 참조할 변수를 검색하게 된다.

## 1.3 스코프의 종류

스코프에는 다음 두 가지가 존재합니다.

1. 블록 레벨 스코프
2. 함수 레벨 스코프

### 🧐 블록 레벨 스코프

블록을 기준으로 스코프를 구성하는 것 입니다.

이에는 `if, for, while etc..` 가 있으며,

블록 레벨 스코프를 위해 ES6 부터 추가된 `let`과 `const`를 사용해야 합니다.

```js
const i = '전역';

for (let i = 0; i < 5; i++) {
  console.log(i); // 0 1 2 3 4
}

console.log(i); // 전역
```

### 🤨 함수 레벨 스코프

함수를 기준으로 스코프를 구성하는 것 입니다.

즉, 전역 함수 외부에 있는 변수는 모두 전역 변수가 됩니다.

```js
const x = '전역';

function func() {
  const x = '지역';
  console.log(x); // 지역
}

func();
```

### 🥸 렉시컬 스코프

```js
var x = 1;

function foo() {
  var x = 10;
  bar();
}

function bar() {
  console.log(x);
}

foo(); // 1
bar(); // 1
```

이 예제의 결과는 `bar` 함수의 **상위 스코프가 무엇인지에 따라 결정**됩니다.

1. **함수를 어디서 호출** 했는지에 따라 함수의 상위 스코프를 결정한다.
2. **함수를 어디서 정의** 했는지에 따라 함수의 상위 스코프를 결정한다.

첫 번째 방식과 같이 함수의 정의 위치 기준이 아니라 **어디에서 호출 했는지에 따라** 사용할 상위 스코프가 결정 되는 것을 **동적 스코프 ( 동적 영역 규칙 )**

두 번째 방식과 같이 **함수의 정의가 평가되는 시점에 상위 스코프가 정적으로 결정되기 때문에 정적 스코프(정적 영역 규칙, 렉시컬 스코프)**라고 부릅니다.

자바스크립트는 기본적으로 함수 레벨 스코프를 따르며, **함수가 어디에서 선언되었느냐에 따라 스코프를 구성**하게 됩니다.

따라서, JS는 함수의 **정의가 평가되는 시점에 상위 스코프가 정적으로 결정되기 때문에 정적 스코프**라고 부릅니다.

이를 렉시컬 스코프 ( 정적 영역 규칙 ) 라고 하며, 자바스크립트는 렉시컬 스코프를 따름을 알 수 있습니다.

# 2. 실행 컨텍스트

이번에는 실행 컨텍스트에 대해서 정말 간단히 알고 넘어가겠습니다.

## 2.1 실행 컨텍스트란?

실행 컨텍스트란 스코프, 식별자, 코드 실행 순서들을 관리하는 것을 말합니다.

모든 함수는 자신만의 실행 컨텍스트를 가지며 이에는 렉시컬 환경이라는 것이 있습니다.

그리고 이 실행 컨텍스트의 순서를 제어하는 콜스택이 있습니다.

## 2.2 콜 스택

```js
var x = 1;
const y = 2;

function foo() {
  var x = 3;
  const y = 4;

  function bar() {
    const z = 5;
    console.log(x + y + z);
  }
  bar();
}

foo();
```

![Untitled](3.svg)

콜 스택은 실행 컨텍스트의 순서를 제어하는 말 그대로 스택입니다.

JS엔진은 코드의 평가 시점에 함수가 선언된 순서에 따라 해당 스택에 함수의 실행 컨텍스트를 push 합니다.

## 2.2 렉시컬 환경

이 렉시컬 환경의 구성은 다음과 같습니다.

1. 환경 레코드 → 스코프에 포함된 것들을 관리하는 저장소
2. 외부 환경에 대한 참조 → 상위 렉시컬 환경을 가리키는 포인터 역할

```js
var x = 1;
const y = 2;

function foo() {
  var x = 3;
  const y = 4;

  function bar() {
    const z = 5;
    console.log(x + y + z); // 12
  }
  bar();
}

foo();
```

그래서 위 코드의 최종적인 결과는 다음과 같이 됩니다. ( 생략한것이 정말 많지만, 대략 이정도로 구성된다.. )

![Untitled](4.svg)

이와 같이 현재 스코프에 없는 변수는 외부 참조의 체이닝에 따라 식별자를 검색하게 됩니다.

따라서, `bar`를 실행했을 때 먼저 전역에서 `console`을 찾고 `x`, `y`는 바로 상위 스코프인 `foo`에서 찾아 `12`라는 결과가 나온 것을 알 수 있습니다.

# 3. 클로저

그래서 **클로저는 함수와 그 함수가 선언된 렉시컬 환경과의 조합**입니다.

![zzal](5.svg)

와 같이 말하면 저도 뭔말인가 싶습니다..

우리는 이 말을 이해해보는 것을 목표로 해보겠습니다..

클로저는 함수를 일급 객체로 취급하는 함수형 프로그래밍 언어에서 사용되는 중요한 특성입니다.

즉, 클로저는 자바스크립트의 고유의 개념이 아닙니다.

### 🤔 외부 환경 참조는 어떻게 결정될까?

위에서 알아봤던 외부 환경에 대한 참조의 결정은 JS 내부슬롯인 `[[Enviroment]]` 에 의해 결정됩니다.

함수를 평가할 때 현재 실행중인 함수를 JS 내부 슬롯인 `[[Environment]]` 에 저장됩니다.

```js
var x = 1;
const y = 2;

function foo() {
  var x = 3;
  const y = 4;

  function bar() {
    const z = 5;
    console.log(x + y + z); // 12
  }
  bar();
}

foo();
```

![Untitled](6.png)

따라서, **외부 환경 참조는 함수를 실행 시**, `[[Enviroment]]` 를 보고 상위 스코프를 알 수 있게 되는 것 입니다.

## 3. 1 클로저란?

이제부터는 중첩함수를 안에서 실행하는 것이 아닌 중첩함수를 반환하는 예제를 살펴보겠습니다.

```js
const x = 1;

function outerFunc() {
  const x = 10;
  return function innerFunc() {
    console.log(x);
  };
}

const outer = outerFunc();
outer();
```

이 코드의 실행결과는 어떻게 될까요??

`outerFunc` 가 호출되는 순간 `outerFunc` 의 수명을 다했습니다.

하지만, `innerFunc` 는 `outerFunc` 의 변수 `x` 를 참조하고 있습니다.

그래서 일반적으로 에러가 날것 같지만, 코드를 실행해보면 결과는 `10` 이 나옵니다.

이처럼 **외부 함수보다 중첩 함수가 더 오래 유지되는 경우 중첩 함수는 이미 생명 주기를 종료한 외부 함수를 참조**할 수 있습니다.

이러한 중첩 함수를 **클로저**라고 부릅니다.

> 상위 함수보다 수명이 더 길게 유지되고 상위 변수를 참조할 수 있다면 그 함수는 클로저!

### 🤭 **클로저는 함수와 그 함수가 선언된 렉시컬 환경과의 조합이다.**

```js
const x = 1;

function outerFunc() {
  const x = 10;
  return function innerFunc() {
    console.log(x);
  };
}

const outer = outerFunc();
outer();
```

다시 코드로 돌아와서,

`outerFunc` 가 실행될 때 `innerFunc` 함수 객체 내 `[[Enviroment]]` 는 자기 자신이 되었을 것 입니다.

그리고 `outerFunc` 가 실행 될때 그때 `innerFunc` 가 평가되고 `innerFunc` 가 실행될때 `outerFunc` 의 `[[Enviroment]]` 를 보고 외부 렉시컬 환경에 대한 참조가 결정됩니다.

따라서 현재 실행되는 `innerFunc` 함수의 외부 렉시컬 환경 참조는 `outerFunc` 의 렉시컬 환경의 `innerFunc` 객체 `[[Enviroment]]` 와 조합됩니다.

### 🤨 이와 같이 상위 스코프를 기억하는 것이 클로저이다!

정리하자면 다음과 같습니다.

중첩함수 `inner` 는 외부 함수 `outer` 보다 더 오래 생존했습니다.

이때 외부 함수 보다 더 오래 생존한 `inner` 중첩 함수는 `outer` 외부 함수의 생존 여부 상관없이 자신이 정의된 위치에 의해 상위 스코프를 가억합니다.

이와 같이 JS의 모든 함수는 상위 스코프를 기억하므로 이론적으로 모든 함수는 클로저가 될 수 있습니다.

### 🤨 하지만, 모든 것을 클로저라고 하지 않습니다.

이론적으로는 모든 함수가 클로저는 맞습니다.

하지만, 프로그램이 커졌을 때 수많은 함수를 기억하기에는 메모리는 물리적인 매체이기 때문에 한계가 있습니다.

따라서, 브라우저는 최적화를 통해 중첩 함수가 외부 함수보다 수명이 길고 외부 함수의 요소를 참조하고 있을 때 클로저로 기억합니다.

## 3.2 자유변수

```js
const x = 1;

function outerFunc() {
  const x = 10;
  const y = 11;
  return function innerFunc() {
    console.log(x);
  };
}

const outer = outerFunc();
outer();
```

위와 같이 `innerFunc` 는 `outerFunc` 의 변수 `x`, `y` 중 `x` 만 기억하고 있습니다.

![스크린샷 2022-04-05 오후 4.22.52.png](7.png)

따라서, 대부분의 모던 브라우저는 최적화를 통해 상위 스코프의 식별자 중에서 클로저 함수 `innerFunc` 가 참조하고 있는 식별자 만을 기억합니다.

이와 같이 클로저에 의해 참조되는 상위 스코프의 변수를 **자유 변수**라고 합니다.

### 😎 번외) 왜 렉시컬은 렉시컬이고 왜 클로저는 클로저일까..

- **Lexical → 한 언어의 어휘**

  Lexical Scope는 코드가 정의된 위치에 따라 스코프가 결정됩니다.

  따라서 논리적인 실행 순서에 의해 동적으로 결정되는 것이 아닌 코드가 정의된 해당 코드 글자의 위치에 의해 고정됩니다. → **글자의 위치 그래서 Lexical**

- **Closure → 어떠한 시설이 폐쇄되는 상황**
  클로저는 중첩 함수가 외부 함수의 변수를 참조하면 해당 참조 변수 즉, 자유변수를 사라지지 못하게 합니다.
  그래서, 외부함수에서 선언한 변수를 내부 함수에서 참조하고 있다면 해당 변수를 자유변수로 만들고 **사라지지 못하도록 폐쇄 시켜서 Clousre**

## 3.3 클로저 활용

클로저는 상태를 안전하게 변경하고 유지하기 위해 사용됩니다.

즉, **상태의 안전한 은닉과 특정 함수에게만 상태 변경을 허용하기 위한 용도로 사용**됩니다.

```js
let num = 0;

const increase = () => {
  return ++num;
};

console.log(increase()); // 1
console.log(increase()); // 2
console.log(increase()); // 3
```

위와 같이 숫자를 증가하는 코드가 있다고 가정해봅시다.

현재로써는 전역 변수 `num` 을 변경하고 참조하고 있기 때문에 어디에서든 변경이 가능합니다.

```js
let num = 0;

const increase = () => {
  return ++num;
};

num = Infinity;

console.log(increase()); // Infinity
console.log(increase()); // Infinity
console.log(increase()); // Infinity
```

### 😆 캡슐화와 이전 상태 유지를 위해 클로저를 사용해보자..

```js
const increase = (function () {
  // 카운트 상태 변수
  let num = 0;

  // 클로저
  return function () {
    // 카운트 상태를 1만큼 증가 시킨다.
    return ++num;
  };
})();

console.log(increase()); // 1
console.log(increase()); // 2
console.log(increase()); // 3
```

먼저 즉시 실행 함수는 중첩 함수를 반환해, `increase` 로 반환 하고 수명을 다 했습니다.

![Untitled](8.png)

하지만, 외부 함수의 `num` 변수는 중첩함수 클로저에 의해 묶여있기 때문에 자유변수가 되어 GCC의 대상이 되지 않는것을 볼 수 있으며,

`num` 자유 변수는 오로지 중첩 함수에서만 클로저로 닫혀있기에 오직 중첩 함수에서만 변경될 수 있음을 알 수 있습니다.

> 이와 같이 클로저는 상태가 의도치 않게 변경되지 않도록 안전하게 은닉하고 특정 함수에게만 상태 변경을 허용해, 상태를 안전하게 변경하도록 유지하기 위해 사용됩니다!

## 3.4 정리

### 🙂 정리를 해보자..

변수 값의 스코프가 넓으면 (전역상태), 언제든지 변경될 수 있습니다. → 오류 발생

상태 변경이나 가변 데이터를 피하고 불변성을 지향하는 함수형 프로그래밍에서 **부수 효과를 최대한 억제 & 오류를 피하고 프로그램의 안정성을 높이기 위해 클로저는 적극적으로 사용됩니다.**

## 참고

[모던 자바스크립트 Deep Dive](https://www.aladin.co.kr/search/wsearchresult.aspx?SearchTarget=All&SearchWord=%EB%AA%A8%EB%8D%98+%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8+Deep+Dive&x=0&y=0)
