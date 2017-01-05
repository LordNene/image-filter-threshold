const sinon = require('sinon');
const expect = require('chai').expect;
const utils = require('image-filter-core');
const imageFilterCore = require('image-filter-core');
const imageFilterThreshold = require('../src/index');

describe('index', function() {
    var sandbox;
    var canvas;
    var context;

    beforeEach(function() {
        // Create a sandbox for the test
        sandbox = sinon.sandbox.create();
    });

    afterEach(function() {
        // Restore all the things made through the sandbox
        sandbox.restore();
    });

    beforeEach(function() {
        context = {
            getImageData: sandbox.stub(),
            putImageData: sandbox.stub()
        };

        canvas = {
            width: 100,
            height: 150,
            getContext: sandbox.stub().returns(context)
        };

        sandbox.stub(utils, 'getCanvas').returns(canvas);
    });

    it('should throw error by missing parameters', function() {
        function fn() {
            imageFilterThreshold({});
        };

        expect(fn).to.throw(/image-filter-threshold:: invalid options provided/);
    });

    it('should apply transformation and return as imageData', function(done) {
        var imageData = {
            data: [193, 219, 242, 255]
        };

        sandbox.stub(imageFilterCore, 'apply', function () { return Promise.resolve(); });

        // const expectedData = {
        //     data: [224.34440379022422, 262.88216530631394, 296.9732620320856, 255]
        // };

        imageFilterThreshold({
            data: imageData,
            threshold: 10
        }).then(function (result) {
            // TODO: VALIDATE calledWith
            expect(imageFilterCore.apply.calledOnce).to.equal(true);
            done();
        });
    });
});
