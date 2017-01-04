const sinon = require('sinon');
const expect = require('chai').expect;
const worker = require('../src/worker');

describe('worker', function() {
    var self;

    beforeEach(function() {
        self = {
            postMessage: sinon.stub(),
            close: sinon.stub()
        };
    });

    context('message', function() {
        it('should make a postMessage and close itself', function(done) {
            self.addEventListener = function (type, fn) {
                const e = {
                    data: {
                        params: {
                            adjustment: 5
                        },
                        data: {
                            data: [
                                193,
                                219,
                                242,
                                255,
                                193,
                                219,
                                242,
                                255
                            ]
                        },
                        length: 8,
                        index: 0
                    }
                };

                fn(e);

                expect(self.postMessage.calledWith({
                    result: [
                        198,
                        224,
                        247,
                        255,
                        193,
                        219,
                        242,
                        255
                    ],
                    index: 0
                }));
                expect(self.postMessage.calledOnce).to.equal(true);
                expect(self.close.calledOnce).to.equal(true);

                done();
            };

            worker(self);
        });
    });
});
