import TestModel from '../support/TestModel';

test('returns attributes', () => {
    const result = (new TestModel({id: 1})).getSaveData();

    expect(result).toEqual({id: 1});
});
