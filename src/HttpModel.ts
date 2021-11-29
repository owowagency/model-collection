import Model, {Attributes} from '@/Model';
import {Action} from '@/providers/Provider';
import HasHttpProvider from '@/providers/HasHttpProvider';
import HttpProvider from '@/providers/HttpProvider';

export default abstract class HttpModel<A extends Attributes> extends Model<A> implements HasHttpProvider {
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
    getEndpoint(action: Action): string {
        if (['delete', 'fetch', 'update'].includes(action)) {
            return `${this.endpoint}/${this.getIdentifier()}`;
        }

        return this.endpoint;
    }

    /**
     * @inheritdoc
     */
    getFetchParams(): Record<string|number, unknown> {
        return {};
    }
}
