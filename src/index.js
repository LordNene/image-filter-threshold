var utils = require('./utils');

/**
 * @name transform
 * @param {object} canvas
 * @param {object} context
 * @param {object} imageData
 * @param {number} threshold
 * Iterate over the array applying the threshold transformation
 */
function transform(imageData, threshold) {
    var data = imageData.data;

    for (var i = 0; i < data.length; i+= 4) {
        var r = data[i];
        var g = data[i+1];
        var b = data[i+2];
        var v = (0.2126 * r + 0.7152 * g + 0.0722 * b >= threshold) ? 255 : 0;
        data[i] = data[i + 1] = data[i + 2] = v;
    }

    return imageData;
}

/**
 * @name imageThreshold
 * @param {object} options
 * @param {string} options.data - data of a image extracted from a canvas
 * @param {string} options.threshold
 * @param {bool} options.asDataURL
 */
module.exports = function imageThreshold(options) {
    var result;
    var canvas;
    var context;

    if (!options.data || !options.threshold) {
        throw new Error('image-filter-threshold:: invalid options provided');
    }

    canvas = utils.getCanvas(options.data.width, options.data.height);
    context = canvas.getContext('2d');

    options.data = utils.getPixels(canvas, context, options.data);

    result = transform(options.data, options.threshold);

    if (options.asDataURL) {
        return utils.convertToDataURL(canvas, context, result);
    }

    return result;
}
