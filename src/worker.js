var transform = require('./threshold');

module.exports = function (self) {
    self.addEventListener('message', function (e) {
        var threshold = e.data.params.threshold;

        var canvasData = e.data.data;
        var binaryData = canvasData.data;

        var length = e.data.length;
        var index = e.data.index;

        transform(binaryData, length, threshold);

        self.postMessage({
            result: canvasData,
            index: index
        });

        self.close();
    });
};
