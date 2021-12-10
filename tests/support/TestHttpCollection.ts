import HasHttpProvider from '@/providers/HasHttpProvider';
import HttpCollection from '@/HttpCollection';
import TestModel from './TestModel';

/**
 * A class used to test implementation of the `Collection` class with an
 * `HttpProvider`.
 */
export default class TestHttpCollection extends HttpCollection<TestModel> implements HasHttpProvider {
    /**
     * @inheritdoc
     */
    endpoint = 'test-models';

    /**
     * @inheritdoc
     */
    getModel(): typeof TestModel {
        return TestModel;
    }
}
