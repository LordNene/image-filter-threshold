# image-threshold

Small library to apply a threshold transformation to a image.

## Install

```
npm install image-threshold --save
```

## Usage
It applies a threshold transformation to a base64 image. If you want a more complete library, please check image-filters that wraps this and other libraries to provide a more complete suite of image filters.

JS file:
```js
var imageThreshold = require('image-threshold');

var result = imagethreshold({
    data: IMAGE_DATA,
    threshold: 30
});
```
