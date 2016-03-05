function copyImageData(ctx, src) {
    var dst = ctx.createImageData(src.width, src.height);
    dst.data.set(src.data);
    return dst;
}

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
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');

    if (!options.data || !options.threshold) {
        throw new Error('image-threshold:: invalid options provided');
    }

    options.data = copyImageData(context, options.data);

    result = transform(canvas, context, options.data, options.threshold);

    return result;
}
