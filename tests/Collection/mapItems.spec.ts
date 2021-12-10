import TestCollection from '@/tests/support/TestCollection';
import TestModel from '@/tests/support/TestModel';

test('maps items', () => {
    // Prepare
    const collection = new TestCollection([{id: 1}]);

    const spy = jest.spyOn(TestCollection.prototype, 'getModel');

    // Execute
    const result = collection.mapItems([{id: 2}, new TestModel({id: 3})]);

    // Assert
    expect(result).toStrictEqual([
        new TestModel({id: 2}),
        new TestModel({id: 3}),
    ]);

    expect(spy).toBeCalledTimes(1);
});
