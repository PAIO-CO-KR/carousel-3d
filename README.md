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

[![demo image](http://paio-co-kr.github.io/carousel-3d/images/recent_browser.png)
](http://paio-co-kr.github.io/carousel-3d)
[http://paio-co-kr.github.io/carousel-3d](http://paio-co-kr.github.io/carousel-3d)

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
