![build status](https://travis-ci.org/canastro/image-filter-threshold.svg?branch=master)
[![npm version](https://badge.fury.io/js/image-filter-threshold.svg)](https://badge.fury.io/js/image-filter-threshold)

# image-threshold

Small library to apply a threshold transformation to a image.

## Install

```
npm install image-threshold --save
```

## Usage
It applies a threshold transformation to a base64 image. If you want a more complete library, please check image-filters that wraps this and other libraries to provide a more complete suite of image filters.

The default operation of this library is to consume imageData and return transformed imageData, but to facilitate a bit you can pass `asDataURL` as true to return a dataURL that you can inject into a image tag.

JS file:
```js
var imageThreshold = require('image-threshold');

var result = imageThreshold({
    data: IMAGE_DATA,
    threshold: 30
});
```

# Frequent questions:
### How can I get image data from a image tag?

```js
var element = document.getElementById('#dummy-image');
var canvas = document.createElement('canvas');
var context = canvas.getContext('2d');
context.drawImage(element, 0, 0 );
var imageData = context.getImageData(0, 0, element.width, element.height);
```

### How can I get image data from url?

```js
var element = document.createElement('img');
element.setAttribute('src', options.url);
//...repeat process from the previous answer
```

### How can I use the output of this?

```js
imageThreshold({
    data: IMAGE_DATA
}).then(function (result) {
    var image = document.createElement('img');
    image.setAttribute('src', result);

    var target = document.getElementById('#dummy-target');
    target.appendChild(image);
});
```
