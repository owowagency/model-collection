import Collection from '@/Collection';
import HasHttpProvider from '@/providers/HasHttpProvider';
import HttpProvider from '@/providers/HttpProvider';

export default abstract class HttpCollection<M, A> extends Collection<M, A> implements HasHttpProvider {
    /**
     * @inheritdoc
     */
    abstract endpoint: string;

    /**
     * @inheritdoc
     */
    provider = new HttpProvider();

    /**
     * @inheritdoc
     */
    getEndpoint(): string {
        return this.endpoint;
    }

    /**
     * @inheritdoc
     */
    getFetchParams() {
        return this.attributes;
    }

    /**
     * @inheritdoc
     */
    getSaveData() {
        return this.items;
    }
}
