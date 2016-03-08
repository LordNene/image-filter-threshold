var imageThreshold = require('../index');

function applyResults(selector, src) {
    var target;
    var image;

    target = document.querySelectorAll(selector)[0];

    image = document.createElement('img');
    image.setAttribute('src', src);
    target.appendChild(image);
}

window.onload = function () {

    var canvas;
    var context;
    var img = new Image;
    img.onload = function(){
        var canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        var context = canvas.getContext('2d');
        context.drawImage(img,0,0);

        var data = context.getImageData(0, 0, img.width, img.height);

        var results1 = imageThreshold({
            data: data,
            threshold: 50,
            asDataURL: true //if you want data to data transformation you don't need to include this
        });
        applyResults('#target-1', results1);

        var results2 = imageThreshold({
            data: data,
            threshold: 128,
            asDataURL: true //if you want data to data transformation you don't need to include this
        });
        applyResults('#target-2', results2);
    };
    img.src = "dummy.jpg";
}
