const imageThreshold = require('../src/index');

/**
 * @name convertToDataURL
 * @param {object} canvas
 * @param {object} context
 */
function convertToDataURL(canvas, context, imageData) {
    context.putImageData(imageData, 0, 0);
    return canvas.toDataURL();
}

function applyResults(selector, canvas, context, src) {
    const target = document.querySelectorAll(selector)[0];
    const image = document.createElement('img');
    image.setAttribute('src', convertToDataURL(canvas, context, src));
    target.appendChild(image);
}

window.onload = function () {
    const img = new Image;
    img.onload = function () {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const context = canvas.getContext('2d');
        context.drawImage(img, 0, 0);

        const data = context.getImageData(0, 0, img.width, img.height);

        imageThreshold({
            data: data,
            threshold: 50
        }).then(function (results) {
            applyResults('#target-1', canvas, context, results);
        });

        imageThreshold({
            data: data,
            threshold: 128
        }).then(function (results) {
            applyResults('#target-2', canvas, context, results);
        });
    };

    img.src = 'dummy.jpg';
};
