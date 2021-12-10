import TestCollection from '@/tests/support/TestCollection';
import TestModel from '@/tests/support/TestModel';

test('calls mapItems', () => {
    const mockedMapItems = jest.fn();

    TestCollection.prototype.mapItems = mockedMapItems;

    const collection = new TestCollection();

    collection.fill([{id: 1}]);

    expect(mockedMapItems).toBeCalledWith([{id: 1}]);
});
