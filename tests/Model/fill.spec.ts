import TestModel from '@/tests/support/TestModel';

test('fills', () => {
    // Prepare
    const mockedFillAttributes = jest.fn();

    TestModel.prototype.fillAttributes = mockedFillAttributes;

    const model = new TestModel({id: 1});

    const attributes = {
        id: 2,
        title: 'not casted',
    };

    // Execute
    model.fill(attributes);

    // Assert
    expect(mockedFillAttributes).toBeCalledWith(attributes);
});
