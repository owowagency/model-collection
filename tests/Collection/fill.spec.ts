import TestCollection from '@/tests/support/TestCollection';
import TestModel from '@/tests/support/TestModel';

test('calls mapItems and sets items', () => {
    const mockedMapItems = jest.fn()
        .mockReturnValue([{id: 2}]);

    TestCollection.prototype.mapItems = mockedMapItems;

    const collection = new TestCollection();

    collection.fill([{id: 1}]);

    expect(mockedMapItems).toBeCalledWith([{id: 1}]);

    expect(collection.items).toEqual([{id: 2}]);
});
