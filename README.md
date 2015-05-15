# [carousel-3d](http://paio-co-kr.github.io/carousel-3d) : jquery plugin 3D carousel slider

A simple 3D carousel widget.
It supports all major browsers including IE8,9 with best effort. Full 3D effect requires `css transform3d` support browsers. 
And this widget works with not only _**images**_ but any _**html elements**_ as child.

## Supports
* IE8~ (full 3D requires IE10~)
* Chrome(32~)
* Safari(6~)
* Firefox(9~)
* Opera(?~)
* iOS-Safari(ios5~)
* android-browser(?~)

Thanks to [Sauce Labs](http://saucelabs.com), I confirmed carousel working on above versions. I think I can say it works almost everywhere.

## Demo

[http://paio-co-kr.github.io/carousel-3d](http://paio-co-kr.github.io/carousel-3d)

[![demo image](http://paio-co-kr.github.io/carousel-3d/images/recent_browser.png)
](http://paio-co-kr.github.io/carousel-3d)


## Installation

`bower install carousel-3d`

## Dependencies
carousel-3d requires some modules. `jquery`, `javascript-detect-element-resize`, `modernizr`, `waitForImages`.
You will need to include those scripts before carousel-3d.js in html page or load it with requirejs or browserify as carousel-3d comes with UMD style module definition.

## Code Example
* **Extremely Easy! you don't need to code javascript.**
* Adding `data-carousel-3d` attribute on `div` will be rendered as carousel.
* Create items in the `<div data-carousel-3d></div>` tag. All items on that list will be arranged on 3D position.
* Items can be simple **image** or any complicated **html elements**.
* You can also `selected` attribute on item which will be default selected item.

in header, add css theme and required js.
```html
<link rel="stylesheet" href="../dist/styles/jquery.carousel-3d.default.css" />

<script src="../bower_components/jquery/jquery.js"></script>
<script src="../bower_components/javascript-detect-element-resize/jquery.resize.js"></script>
<script src="../bower_components/waitForImages/dist/jquery.waitforimages.js"></script>
<script src="../bower_components/modernizr/modernizr.js"></script>
<script src="../dist/jquery.carousel-3d.js" ></script>
```

in body
```html
<div id="wrapper">
    <div id="myCarousel" data-carousel-3d>
        <img src="./images/1.jpg" />
        <img src="./images/2.jpg" selected />
        <img src="./images/3.jpg" />
        <img src="./images/4.jpg" />
        <img src="./images/5.jpg" />
    </div>
</div>
```

* You will also want html document as child. wrap contents with a div.

```html
<div style="min-width: 640px; min-height: 420px; max-width: 640px; max-height: 420px;">
    <p style="background-color:black; color:white; margin:20px; padding:20px;">A simple html child</p>
    <div style="background-color:gray; color:white;">Html contents also works ok!!!</div>
    <div>The quick brown fox jumps over the lazy dog</div>
    <p>
        Make the fox
        <button type="button" onclick="alert('Jump!!');">jump</button>
    </p>
</div>
```
The Carousel will have parents 100% width & aspect height. so you will want wrap the div with appropriate size. And wide aspect(3:2, 2:1 ...) is recommanded for 3D rotating effect.

You can have multiple carousels with no effort. Just set proper attribues.
## API Reference
* Rotate carousel prev / next
```javascript
$('#myCarousel').Carousel3d('prev');
$('#myCarousel').Carousel3d('next');
```
* Rotate carousel by index
```javascript
$('#myCarousel').Carousel3d('rotate', 3);
```
* Event listener
```javascript
$('#myCarousel').on('select', function (evt, index) {
    console.log('item selected : ' + index);
});
```


## History
### 0.2.2
* removed semi-NSFW image.
* removed wrong js include in example html.

### 0.2.1
* bug fix : Multiple instances #4

### 0.2.0
* re-engineer project

### 0.1.0
* improved transforms
* added theme feature

## License

MIT © PAIO


# [케러셀-3d](http://paio-co-kr.github.io/carousel-3d) : 제이쿼리 플러그인 3D 케러셀 슬라이더

정말 간단한 3d  케러셀 위젯입니다.<br>
`css transform3d`와 같이 Full 3d 효과를 요구하는 브라우저들을 지원하는 것은 물론 IE8,9 에서도 최적의 성능을 보이도록 지원합니다. 또한 _**그림들**_ 뿐만 아니라 어떠한 _**HTML elements**_ 의 자식요소에서도 잘 작동합니다.

## 지원
* 인터넷 익스플로러 8 ~ (Full 3d를 요구하는 IE10~이상)
* 크롬(32~)
* 사파리(6~)
* 파이어폭스(9~)
* 오페라(?~)
* iOS 사파리(ios5~)
* 안드로이드 브라우저(?~)

먼저 도움을 주신 <a href="http://saucelabs.com">Sauce Labs</a>에 감사의 말씀을 전해드리며, 앞서 언급된 인터넷브라우저들의 버전에서 케러셀-3D가 잘 작동하는 것이 확인 되었습니다. 제 생각에는 거의 모든 곳에서 잘 작동한다고 할 수 있습니다.

## 데모

[http://paio-co-kr.github.io/carousel-3d](http://paio-co-kr.github.io/carousel-3d)

[![demo image](http://paio-co-kr.github.io/carousel-3d/images/recent_browser.png)
](http://paio-co-kr.github.io/carousel-3d)


## 설치

`bower install carousel-3d`

## 의존성
케러셀-3d는 `jquery`, `javascript-detect-element-resize`, `modernizr`, `waitForImages`등 과 같은 모듈들의 도움이 필요합니다. 여러분들이 케러셀-3d.js를 HTML페이지 안에서 구현 하거나 또는 필요한 자바스크립트와 함께 실어 구현하거나, 또는 UMD 스타일 모듈 정의에 따른 케러셀-3d를 구현하고 싶다면 앞서 언급한 스크립트들이 필요 할 것입니다.

## 코드 예시
* **정말 쉬워요! 자바스크립트 코드를 몰라도 됩니다.**
* `div`의 `data-carousel-3d`속성에 추가하세요. 케러셀로 되돌려질 것입니다.
* `<div data-carousel-3d></div>` 태그안에 아이템들을 만드세요. 그 리스트의 아이템들이 모두 3D 위치로 잡혀질 것입니다.
* **그림**이나 어떤 복잡한 **HTML elements** 아이템들도 간단 해집니다.
* `selected`속성을 이용하여 기본선택으로 된 아이템으로도 적용 할 수 있습니다.

css 테마 또는 필요한 자바스크립트의 헤더 안에 추가 하세요.
```html
<link rel="stylesheet" href="../dist/styles/jquery.carousel-3d.default.css" />

<script src="../bower_components/jquery/jquery.js"></script>
<script src="../bower_components/javascript-detect-element-resize/jquery.resize.js"></script>
<script src="../bower_components/waitForImages/dist/jquery.waitforimages.js"></script>
<script src="../bower_components/modernizr/modernizr.js"></script>
<script src="../dist/jquery.carousel-3d.js" ></script>
```

body 태그 안에
```html
<div id="wrapper">
    <div id="myCarousel" data-carousel-3d>
        <img src="./images/1.jpg" />
        <img src="./images/2.jpg" selected />
        <img src="./images/3.jpg" />
        <img src="./images/4.jpg" />
        <img src="./images/5.jpg" />
    </div>
</div>
```

* HTML문서의 자식요소가 필요할땐 div와 함께 컨텐츠를 감싸 주세요.

```html
<div style="min-width: 640px; min-height: 420px; max-width: 640px; max-height: 420px;">
    <p style="background-color:black; color:white; margin:20px; padding:20px;">A simple html child</p>
    <div style="background-color:gray; color:white;">Html contents also works ok!!!</div>
    <div>The quick brown fox jumps over the lazy dog</div>
    <p>
        Make the fox
        <button type="button" onclick="alert('Jump!!');">jump</button>
    </p>
</div>
```
케러셀은 100% width & aspect height 를 부모요소로 가집니다. 그래서 div를 적당한 크기로 감쌀 필요가 있습니다. 그리고 3d 선회 효과는 wide aspect(3:2, 2:1 ...)정도를 추천드립니다.

Multiple Carousels을 구현하고 싶다면 간단하게 proper attribues를 설정해 주는 것만으로 여러분이 원하는 대로 쉽게 구현 할 수 있습니다. 

## API 참조
* prev / next 케러셀 순환
```javascript
$('#myCarousel').Carousel3d('prev');
$('#myCarousel').Carousel3d('next');
```
* index 에 의한 케러셀 순환
```javascript
$('#myCarousel').Carousel3d('rotate', 3);
```
* 이벤트 리스너
```javascript
$('#myCarousel').on('select', function (evt, index) {
    console.log('item selected : ' + index);
});
```


## 히스토리
### 0.2.2
* semi-NSFW image 삭제됨.
* 예제 html 에서 잘못된 js 코드 삭제됨.

### 0.2.1
* 버그 수정 : Multiple instances #4

### 0.2.0
* Re-엔지니어 프로젝트
 
### 0.1.0
* 변화(변형) 향상됨
* 테마 특징 추가됨

## 라이센스

MIT © PAIO
