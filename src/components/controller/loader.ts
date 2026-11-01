import { NewsEndpoint } from '../../types/newsTypes';

interface QueryOptions {
    apiKey: string;
    sources: string;
}

type LoaderOptions = Readonly<Pick<QueryOptions, 'apiKey'>>;
type RequestOptions = Partial<Pick<QueryOptions, 'sources'>>;
type ResponseValidator<T> = (value: unknown) => value is T;

interface RequestParams {
    endpoint: NewsEndpoint;
    options?: RequestOptions;
}

type ResponseCallback<T> = (data: T) => void;

class Loader {
    constructor(
        private readonly baseLink: string,
        private readonly options: LoaderOptions
    ) {}

    public getResp<T>(
        { endpoint, options = {} }: RequestParams,
        validateResponse: ResponseValidator<T>,
        callback: ResponseCallback<T> = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load('GET', endpoint, callback, validateResponse, options);
    }

    errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: RequestOptions, endpoint: NewsEndpoint): string {
        const params = new URLSearchParams({ apiKey: this.options.apiKey });

        if (options.sources !== undefined) {
            params.set('sources', options.sources);
        }

        return `${this.baseLink}${endpoint}?${params.toString()}`;
    }

    public load<T>(
        method: 'GET',
        endpoint: NewsEndpoint,
        callback: ResponseCallback<T>,
        validateResponse: ResponseValidator<T>,
        options: RequestOptions = {}
    ): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data: unknown) => {
                if (!validateResponse(data)) {
                    throw new Error(`Invalid response received from ${endpoint}`);
                }

                callback(data);
            })
            .catch((err) => console.error(err));
    }
}

export default Loader;
