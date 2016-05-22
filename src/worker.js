import { transform } from './threshold';

module.exports = function (self) {
    self.addEventListener('message', (e) => {
        const threshold = e.data.params.threshold;

        const canvasData = e.data.data;
        const binaryData = canvasData.data;

        const length = e.data.length;
        const index = e.data.index;

        transform(binaryData, length, threshold);

        self.postMessage({
            result: canvasData,
            index
        });

        self.close();
    });
};
