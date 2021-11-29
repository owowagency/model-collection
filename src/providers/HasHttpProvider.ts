import {Action} from '@/providers/Provider';
import Errors from '@/Errors';

interface HasHttpProvider {
    /**
     * The endpoint that is used to make HTTP request.
     */
    endpoint: string;

    /**
     * The errors that happened during an action.
     */
    errors: Errors;

    /**
     * Returns the endpoint for the specified action.
     */
    getEndpoint(action?: Action): string;

    /**
     * Returns the parameters used during the fetch action.
     */
    getFetchParams: () => Record<string|number, unknown>;

    /**
     * Returns the data used during the create and update actions.
     */
    getSaveData: () => unknown;
}

export default HasHttpProvider;
