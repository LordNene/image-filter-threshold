import { expect } from 'chai';
import { transform } from '../src/threshold';

describe('threshold', () => {
    it('should apply transformation and return as imageData', () => {
        const data = [
            193,
            219,
            242,
            255,
            193,
            219,
            242,
            255
        ];

        const expectedData = [
            255,
            255,
            255,
            255,
            193,
            219,
            242,
            255
        ];

        transform(data, 4, 5);

        expect(data).to.deep.equal(expectedData);
    });
});
