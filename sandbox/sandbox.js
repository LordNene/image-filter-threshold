import imageThreshold from '../src/index';

function applyResults(selector, src) {
    const target = document.querySelectorAll(selector)[0];
    const image = document.createElement('img');
    image.setAttribute('src', src);
    target.appendChild(image);
}

window.onload = function () {

    const img = new Image;
    img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const context = canvas.getContext('2d');
        context.drawImage(img, 0, 0);

        const data = context.getImageData(0, 0, img.width, img.height);

        imageThreshold({
            data: data,
            threshold: 50
        }).then((results) => {
            applyResults('#target-1', results);
        });

        imageThreshold({
            data: data,
            threshold: 128
        }).then((results) => {
            applyResults('#target-1', results);
        });
    };

    img.src = 'dummy.jpg';
};
