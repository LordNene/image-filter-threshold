![build status](https://travis-ci.org/canastro/image-filter-threshold.svg?branch=master)
[![npm version](https://badge.fury.io/js/image-filter-threshold.svg)](https://badge.fury.io/js/image-filter-threshold)
[![codecov](https://codecov.io/gh/canastro/image-filter-threshold/branch/master/graph/badge.svg)](https://codecov.io/gh/canastro/image-filter-threshold)

# image-filter-threshold

Small library to apply a threshold transformation to a image using webworkify to split work between multiple webworkers.

## Install

```
npm install image-filter-threshold --save
```

## Usage
It applies a threshold transformation to a base64 image. If you want a more complete library, please check image-filters that wraps this and other libraries to provide a more complete suite of image filters.

This library consumes ImageData and outputs ImageData in a Promise. You can use `image-filter-core` to convert from ImageData to dataURL.

PS: This library depends on `webworkify` so its only compatible with browserify.

JS file:
```js
var imageThreshold = require('image-threshold');

var result = imageThreshold({
    data: IMAGE_DATA,
    threshold: 30
});
```

## Frequent questions:
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
var imageFilterCore = require('image-filter-core');
imageThreshold({
    data: IMAGE_DATA
}).then(function (result) {
    // result === ImageData object
    var image = document.createElement('img');
    image.setAttribute('src', imageFilterCore.convertImageDataToCanvasURL(imageData));
    target.appendChild(image);
});
```
