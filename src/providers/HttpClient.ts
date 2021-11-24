import {RequestConfig} from '@/providers/HttpProvider';

export type RequestMethod = 'delete' | 'get' | 'post' | 'put';

interface HttpClient {
    /**
     * Makes a delete request.
     */
    delete(url: string, config?: Record<string, unknown>): Promise<unknown>;

    /**
     * Makes a get request.
     */
    get(url: string, config?: Record<string, unknown>): Promise<unknown>;

    /**
     * Makes a patch request.
     */
    patch(url: string, config?: Record<string, unknown>): Promise<unknown>;

    /**
     * Makes a post request.
     */
    post(url: string, config?: Record<string, unknown>): Promise<unknown>;

    /**
     * Makes a put request.
     */
    put(url: string, config?: Record<string, unknown>): Promise<unknown>;

    /**
     * Makes a generic request,
     */
    request(config: RequestConfig): Promise<unknown>;
}

export default HttpClient;
