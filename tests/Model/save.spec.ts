import Base from '@/Base';
import TestModel from '../support/TestModel';

const attributes = {
    id: 69,
};

test('syncs original when saved', async () => {
    const mockBaseSave = jest.fn();

    Base.prototype.save = mockBaseSave;

    const model = new TestModel(attributes);

    const mockSync = jest.fn();

    model.syncOriginal = mockSync;

    await model.save('update');

    expect(mockSync).toBeCalled();

    expect(mockBaseSave).toBeCalled();
});
