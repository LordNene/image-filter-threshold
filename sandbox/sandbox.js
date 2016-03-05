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

    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    var img = new Image;
    img.onload = function(){
        context.drawImage(img,0,0);

        var data = context.getImageData(0, 0, img.width, img.height);

        var results1 = imageThreshold({
            data: data,
            threshold: 10
        });
        applyResults('#target-1', results1);

        var results2 = imageThreshold({
            data: data,
            threshold: 128
        });
        applyResults('#target-2', results2);
    };
    img.src = "http://lorempixel.com/400/200/sports/1/";
}