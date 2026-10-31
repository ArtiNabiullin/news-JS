import { NewsEndpoint } from '../../types/newsTypes';

type QueryOptions = Record<string, string>;

interface RequestParams {
    endpoint: NewsEndpoint;
    options?: QueryOptions;
}

type ResponseCallback<T> = (data: T) => void;

class Loader {
    constructor(
        private readonly baseLink: string,
        private readonly options: QueryOptions
    ) {}

    public getResp<T>(
        { endpoint, options = {} }: RequestParams,
        callback: ResponseCallback<T> = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load('GET', endpoint, callback, options);
    }

    errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: QueryOptions, endpoint: NewsEndpoint): string {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    public load<T>(
        method: 'GET',
        endpoint: NewsEndpoint,
        callback: ResponseCallback<T>,
        options: QueryOptions = {}
    ): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
