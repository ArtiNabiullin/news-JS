import News from './news/news';
import Sources from './sources/sources';
import type { NewsResponse, SourcesResponse } from '../../types/newsTypes';


export class AppView {
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: NewsResponse): void {
        if (data.status !== 'ok') {
            console.error(data.message);
            return;
        }
        this.news.draw(data.articles);
    }

    drawSources(data: SourcesResponse): void {
        if (data.status !== 'ok') {
            console.error(data.message);
            return;
        }

        this.sources.draw(data.sources);
    }
}

export default AppView;
