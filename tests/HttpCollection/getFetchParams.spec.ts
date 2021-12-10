import TestHttpCollection from '../support/TestHttpCollection';

test('returns attributes', () => {
    const result = (new TestHttpCollection([], {page: 1})).getFetchParams();

    expect(result).toEqual({page: 1});
});
