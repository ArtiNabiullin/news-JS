import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        const { API_URL, API_KEY } = process.env;

        if(!API_URL || !API_KEY) {
            throw new Error('Missing API_URL or API_KEY environment variable');
        }

        super(API_URL, {
            apiKey: API_KEY,
        });
    }
}

export default AppLoader;
