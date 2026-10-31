import AppLoader from './appLoader';
import { NewsEndpoint } from '../../types/newsTypes';
import type { SourcesResponse, NewsResponse } from '../../types/newsTypes';

class AppController extends AppLoader {
    getSources(callback: (data: SourcesResponse) => void): void {
        super.getResp<SourcesResponse>(
            {
                endpoint: NewsEndpoint.Sources,
            },
            callback
        );
    }

    getNews(e: MouseEvent, callback: (data: NewsResponse) => void): void {
        const container = e.currentTarget;
        const clickedElement = e.target;

        if (!(container instanceof HTMLElement) || !(clickedElement instanceof Element)) {
            return;
        }

        const sourceItem = clickedElement.closest<HTMLElement>('.source__item');

        if (!sourceItem || !container.contains(sourceItem)) {
            return;
        }

        const sourceId = sourceItem.getAttribute('data-source-id');

        if (!sourceId || container.getAttribute('data-source') === sourceId) {
            return;
        }

        container.setAttribute('data-source', sourceId);

        super.getResp<NewsResponse>(
            {
                endpoint: NewsEndpoint.Everything,
                options: {
                    sources: sourceId,
                },
            },
            callback
        );
    }
}

export default AppController;
