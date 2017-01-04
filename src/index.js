var imageFilterCore = require('image-filter-core');
var worker = require('./worker');

/**
 * @name threshold
 * @param {object} options
 * @param {string} options.data - data of a image extracted from a canvas
 * @param {string} options.contrast - contrast value to apply
 * @param {string} options.nWorkers - number of workers
 * @param {bool} options.asDataURL
 * @returns {promise}
 */
module.exports =  function threshold(options) {
    if (!options.data || !options.threshold) {
        throw new Error('image-filter-threshold:: invalid options provided');
    }

    var nWorkers = options.nWorkers || 4;
    var params = {
        threshold: options.threshold
    };
    var canvas = imageFilterCore.getCanvas(options.data.width, options.data.height);
    var context = canvas.getContext('2d');

    // Drawing the source image into the target canvas
    context.putImageData(options.data, 0, 0);

    var len = canvas.width * canvas.height * 4;
    var segmentLength = len / nWorkers; // This is the length of array sent to the worker
    var blockSize = canvas.height / nWorkers; // Height of the picture chunck for every worker

    return imageFilterCore.apply(
        worker,
        nWorkers,
        canvas,
        context,
        params,
        blockSize,
        segmentLength
    );
};
