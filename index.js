/**
 * @name getCanvas
 * @param {number} w - width
 * @param {number} h - height
 * Create a canvas with the currect size
 */
function getCanvas(w, h) {
    var canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;

    return canvas;
}

/**
 * @name getPixels
 * @param {object} canvas
 * @param {object} context
 * @param {object} imageData
 * Get a deep copy of the image data so we don't change the original imageData
 */
function getPixels(canvas, context, imageData) {
    context.putImageData(imageData, 0, 0);
    return context.getImageData(0, 0, canvas.width, canvas.height);
}

/**
 * @name transform
 * @param {object} canvas
 * @param {object} context
 * @param {object} imageData
 * @param {number} threshold
 * Iterate over the array applying the threshold transformation
 */
function transform(canvas, context, imageData, threshold) {
    var data = imageData.data;

    for (var i = 0; i < data.length; i+= 4) {
        var r = data[i];
        var g = data[i+1];
        var b = data[i+2];
        var v = (0.2126 * r + 0.7152 * g + 0.0722 * b >= threshold) ? 255 : 0;
        data[i] = data[i + 1] = data[i + 2] = v;
    }

    context.putImageData(imageData, 0, 0);
    return canvas.toDataURL();
}

/**
 * @name imageThreshold
 * @param {object} options
 * @param {string} options.data - data of a image extracted from a canvas
 * @param {string} options.threshold
 */
module.exports = function imageThreshold(options) {
    var result;
    var canvas;
    var context;

    if (!options.data || !options.threshold) {
        throw new Error('image-threshold:: invalid options provided');
    }

    canvas = getCanvas(options.data.width, options.data.height);
    context = canvas.getContext('2d');

    options.data = getPixels(canvas, context, options.data);

    result = transform(canvas, context, options.data, options.threshold);

    return result;
}
