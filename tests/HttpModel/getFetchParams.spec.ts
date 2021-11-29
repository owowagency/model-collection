import TestHttpModel from '../support/TestHttpModel';

test('returns an empty object', () => {
    const result = (new TestHttpModel()).getFetchParams();

    expect(result).toEqual({});
});
