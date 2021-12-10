import TestHttpCollection from '../support/TestHttpCollection';

test('returns items', () => {
    const collection = new TestHttpCollection();

    collection.items = [{id: 1}];

    expect(collection.getSaveData()).toEqual([{id: 1}]);
});
