import Base from '@/Base';
import TestModel from '../support/TestModel';

const attributes = {
    id: 69,
};

test('syncs original when fetched', async () => {
    const mockBaseFetch = jest.fn();

    Base.prototype.fetch = mockBaseFetch;

    const model = new TestModel(attributes);

    const mockSync = jest.fn();

    model.syncOriginal = mockSync;

    await model.fetch();

    expect(mockSync).toBeCalled();

    expect(mockBaseFetch).toBeCalled();
});
