import TestHttpCollection from '../support/TestHttpCollection';

test('returns endpoint', () => {
    const result = (new TestHttpCollection()).getEndpoint();

    expect(result).toBe('test-models');
});
