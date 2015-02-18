# [carousel-3d](http://paio-co-kr.github.io/carousel-3d) : jquery plugin 3D carousel

A simple 3D carousel widget.
It supports all major browsers including IE8,9 with best effort. Full 3D effect requires `css transform3d` support browsers. 
And this widget works with not only _**images**_ but any _**html elements**_ as child.

## Supports
* IE8~ (full 3D requires IE10~)
* Chrome
* Safari
* Firefox
* Opera

## Demo

[http://paio-co-kr.github.io/carousel-3d](http://paio-co-kr.github.io/carousel-3d)

![demo image](http://paio-co-kr.github.io/carousel-3d/images/recent_browser.png)

## Installation

`bower install carousel-3d`

## Dependencies
carousel-3d requires some modules. `jquery`, `javascript-detect-element-resize`, `modernizr`.
You will need to include those scripts before carousel-3d.js in html page or load it with requirejs or browserify as carousel-3d comes with UMD style module definition.
```html
<script src="bower_components/jquery/jquery.js"></script>
<script src="bower_components/javascript-detect-element-resize/jquery.resize.js"></script>
<script src="bower_components/modernizr/modernizr.js"></script>
<script src="carousel-3d.js" ></script>
```

## Code Example
* **Extremely Easy! not even one javascript call required.**
* Adding `data-carousel-3d` attribute on any element will be rendered as carousel.
* Create a list and items with `data-carousel-3d-children` attribute on list tag. All items on that list will be arranged on 3D position.
* Items can be simple image or any complicated html elements. They will properly rendered(scaled).
* You can also `selected` attribute on item which will be default selected item.
* The elements with `data-carousel-3d-left` and `data-carousel-3d-right` will become buttons on each side.

```html
<div id="wrapper">
    <div id="myCarousel" data-carousel-3d >
        <img src="./images/left.png" data-carousel-3d-left />
        <img src="./images/right.png" data-carousel-3d-right />
        <ul data-carousel-3d-children>
            <li><img src="./images/castles-616573_640.jpg" /></li>
            <li selected><img src="./images/cup-617422_640.jpg" /></li>
            <li><img src="./images/dart-444201_640.jpg" /></li>
            <li><img src="./images/fresh-peppers-619132_640.jpg" /></li>
            <li><img src="./images/keyboard-621830_640.jpg" /></li>
            <li><img src="./images/landscape-540122_640.jpg" /></li>
        </ul>
    </div>
</div>
```

* You will also want html document as child.

```html
<li>
    <div>
    <p style="background-color:black; color:white; margin:20px; padding:20px;">A simple html child</p>
    <div style="background-color:gray; color:white;">Html contents also works ok!!!</div>
    <div>The quick brown fox jumps over the lazy dog</div>
    <p>
    Make the fox
    <button type="button" onclick="alert('Jump!!');">jump</button>
    </p>
    </div>
</li>
```
The Carousel will have parents 100% width & height. so you will want wrap the div with appropriate size. And wide aspect(150%) is recommanded to show 3D rotating effect.

You can have multiple carousels with no effort. Just set proper attribues.
## API Reference
* Rotate carousel
```javascript
$('#myCarousel').carousel-3d('left');
$('#myCarousel').carousel-3d('right');
```
* Event listener
```javascript
$('#myCarousel').on('select', function (evt, index) {
    console.log('item selected : ' + index);
});
```


## TODO
* add bottom indicator

## History
### 0.0.6
* improved IE8,9 transform.

### 0.0.5
* added 'select' event

### 0.0.4
* bug fix: not initialized on safari 8
 

## License

MIT.
