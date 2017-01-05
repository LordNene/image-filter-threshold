var imageFilterCore = require('image-filter-core');
var worker = require('./worker');

/**
 * @name threshold
 * @param {Object} options
 * @param {ImageData} [options.data] - data of a image extracted from a canvas
 * @param {String} [options.contrast] - contrast value to apply
 * @param {String} [options.nWorkers] - number of workers
 * @returns {Promise}
 */
module.exports =  function threshold(options) {
    if (!options.data || !options.threshold) {
        throw new Error('image-filter-threshold:: invalid options provided');
    }

    var params = {
        threshold: options.threshold
    };
    var canvas = imageFilterCore.getCanvas(options.data.width, options.data.height);
    var context = canvas.getContext('2d');

    // Drawing the source image into the target canvas
    context.putImageData(options.data, 0, 0);

    return imageFilterCore.apply(
        worker,
        options.nWorkers,
        canvas,
        context,
        params
    );
};
