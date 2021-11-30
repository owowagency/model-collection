import TestHttpModel from '../support/TestHttpModel';

const actionsWith = ['delete', 'fetch', 'update'];

const actionsWithout = ['create', 'index'];

test(`returns endpoint with identifier when action is ${actionsWith.join(', ')}`, () => {
    const mockGetIdentifier = jest.fn()
        .mockReturnValue(1);

    TestHttpModel.prototype.getIdentifier = mockGetIdentifier;

    actionsWith.forEach(a => {
        const result = (new TestHttpModel()).getEndpoint(a);

        expect(result).toBe('test-models/1');
    });

    expect(mockGetIdentifier).toBeCalledTimes(actionsWith.length);
});

test(`returns endpoint without identifier when action is ${actionsWithout.join(', ')}`, () => {
    actionsWithout.forEach(a => {
        const result = (new TestHttpModel()).getEndpoint(a);

        expect(result).toBe('test-models');
    });
});
