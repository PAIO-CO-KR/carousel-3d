# carousel-3d

A simple 3D carousel widget.
It supports all major browsers including IE8,9 with best effort. Full 3D effect requires `css transform3d` support browsers. 

## Demo

[http://paio-co-kr.github.io/carousel-3d](http://paio-co-kr.github.io/carousel-3d)

## Installation

bower install carousel-3d

## Code Example
* Adding `data-carousel-3d` attribute on any element will be rendered as carousel.
* Create a list and items with `data-carousel-3d-children` attribute on list tag. All items on that list will be arranged on 3D position.
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
The Carousel will have parents 100% width & height. so you will want wrap the div with appropriate size. And wide aspect(150%) is recommanded to show 3D rotating effect.

You can have multiple carousels with no effort. Just set proper attribues.
## API Reference
You can rotate carousel with code below.
```javascript
$('#myCarousel').carousel-3d('left');
$('#myCarousel').carousel-3d('right');
```
## License

MIT.