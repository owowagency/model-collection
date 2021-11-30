import HttpClient, {RequestMethod} from '@/providers/HttpClient';
import axios, {AxiosResponse} from 'axios';
import HasHttpProvider from '@/providers/HasHttpProvider';
import Provider from '@/providers/Provider';

export interface RequestConfig {
    data?: any;
    method?: RequestMethod;
    params?: any;
    url?: string;
}

class HttpProvider implements Provider {
    /**
     * @inheritdoc
     */
    async create(model: HasHttpProvider, config: RequestConfig = {}): Promise<any> {
        return this.makeRequest(
            model,
            'post',
            model.getEndpoint('create'),
            {data: model.getSaveData(), ...config},
        );
    }

    /**
     * @inheritdoc
     */
    async delete(model: HasHttpProvider, config: RequestConfig = {}): Promise<any> {
        return this.makeRequest(
            model,
            'delete',
            model.getEndpoint('delete'),
            config,
        );
    }

    /**
     * @inheritdoc
     */
    async fetch(model: HasHttpProvider, config: RequestConfig = {}): Promise<any> {
        return this.makeRequest(
            model,
            'get',
            model.getEndpoint('fetch'),
            {params: model.getFetchParams(), ...config},
        );
    }

    /**
     * Returns the client that is used to make HTTP requests.
     */
    getHttpClient(): HttpClient {
        return axios;
    }

    /**
     * Makes an HTTP request.
     */
    async makeRequest(model: HasHttpProvider, method: RequestMethod, url: string, config: RequestConfig = {}): Promise<any> {
        let result;

        const requestConfig: RequestConfig = {
            url,
            method,
            ...config,
        };

        try {
            result = await this.getHttpClient().request(requestConfig) as AxiosResponse;
        } catch (e) {
            if (e.response?.status === 422) {
                model.errors.setErrors(e.response.data.errors);
            }

            throw e;
        }

        return result.data;
    }

    /**
     * @inheritdoc
     */
    async update(model: HasHttpProvider, config: RequestConfig = {}): Promise<any> {
        return this.makeRequest(
            model,
            'put',
            model.getEndpoint('update'),
            {data: model.getSaveData(), ...config},
        );
    }
}

export default HttpProvider;
