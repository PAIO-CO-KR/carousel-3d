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

![demo image](http://paio-co-kr.github.io/carousel-3d/images/recent_browser.png)

## Installation

`bower install carousel-3d`

## Dependencies
carousel-3d requires some modules. `jquery`, `javascript-detect-element-resize`, `modernizr`.
You will need to include those scripts before carousel-3d.js in html page or load it with requirejs or browserify as carousel-3d comes with UMD style module definition.

## Code Example
* **Extremely Easy! not even one javascript call required.**
* Adding `data-carousel-3d` attribute on `ul` will be rendered as carousel.
* Create items under the list tag. All items on that list will be arranged on 3D position.
* Items can be simple **image** or any complicated **html elements**.
* You can also `selected` attribute on item which will be default selected item.

in header, add css theme and required js.
```html
<link rel="stylesheet" href="theme/default/carousel-3d.css" />

<script src="bower_components/jquery/jquery.js"></script>
<script src="bower_components/javascript-detect-element-resize/jquery.resize.js"></script>
<script src="bower_components/modernizr/modernizr.js"></script>
<script src="carousel-3d.js" ></script>
```

in body
```html
<div id="wrapper">
    <ul id="myCarousel" data-carousel-3d class="theme-default something">
        <li><img src="./images/castles-616573_640.jpg" /></li>
        <li selected><img src="./images/cup-617422_640.jpg" /></li>
        <li><img src="./images/fresh-peppers-619132_640.jpg" /></li>
        <li><img src="./images/keyboard-621830_640.jpg" /></li>
        <li><img src="./images/landscape-540122_640.jpg" /></li>
    </ul>
</div>
```

* You will also want html document as child. wrap contents with a div.

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
$('#myCarousel').carousel3d('prev');
$('#myCarousel').carousel3d('next');
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
### 0.1.1
* bug fix : remove image content margin

### 0.1.0
* improved transforms
* added theme feature

## License

MIT.
