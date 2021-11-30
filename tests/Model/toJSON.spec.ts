import TestModel from '../support/TestModel';

test('returns attributes', () => {
    const attributes = {
        id: 1,
        // Test an object that has its own `toJSON` to test if that one is also
        // called.
        object: {
            toJSON: () => ({id: 2}),
        },
    };
    const result = (new TestModel(attributes)).toJSON();

    expect(JSON.parse(JSON.stringify(result))).toEqual({id: 1, object: {id: 2}});
});
