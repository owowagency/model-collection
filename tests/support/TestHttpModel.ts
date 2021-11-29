import HasHttpProvider from '@/providers/HasHttpProvider';
import HttpModel from '@/HttpModel';
import {TestModelData} from './TestModel';

/**
 * A class used to test implementation of the `Model` class with an
 * `HttpProvider`.
 */
export default class TestHttpModel extends HttpModel<TestModelData> implements HasHttpProvider {
    /**
     * @inheritdoc
     */
    endpoint = 'test-models';
}
