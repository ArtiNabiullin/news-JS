import './news.css';
import type { NewsArticle } from '../../../types/newsTypes';

class News {
    draw(data: NewsArticle[]): void {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector<HTMLTemplateElement>('#newsItemTemp');

        if (!newsItemTemp) {
            throw new Error('Template #newsItemTemp was not found');
        }

        news.forEach((item, idx) => {
            const newsClone = document.importNode(newsItemTemp.content, true);

            const newsItem = newsClone.querySelector<HTMLElement>('.news__item');

            if (!newsItem) {
                throw new Error('.news__item was not found');
            }

            if (idx % 2) newsItem.classList.add('alt');

            const newsMetaPhoto = newsClone.querySelector<HTMLElement>('.news__meta-photo');

            if (!newsMetaPhoto) {
                throw new Error('.news__meta-photo was not found');
            }

            newsMetaPhoto.style.backgroundImage = `url(${
                item.urlToImage || 'img/news_placeholder.jpg'
            })`;

            const newsMetaAuthor = newsClone.querySelector<HTMLElement>('.news__meta-author');

            if (!newsMetaAuthor) {
                throw new Error('.news__meta-author was not found');
                
            }

            newsMetaAuthor.textContent = item.author || item.source.name;

            const newsMetaDate = newsClone.querySelector<HTMLElement>('.news__meta-date');

            if (!newsMetaDate) {
                throw new Error('.news__meta-date was not found');
            }

            newsMetaDate.textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-');

            const newsDescTitle = newsClone.querySelector<HTMLElement>('.news__description-title');

            if (!newsDescTitle) {
                throw new Error('.news__description-title was not found');
            }

            newsDescTitle.textContent = item.title;

            const newsDescSource = newsClone.querySelector<HTMLElement>('.news__description-source');

            if (!newsDescSource) {
                throw new Error('.news__description-source was not found');
            }

            newsDescSource.textContent = item.source.name;

            const newsDescContent = newsClone.querySelector<HTMLElement>('.news__description-content');

            if (!newsDescContent) {
                throw new Error('.news__description-content was not found');
            }

            newsDescContent.textContent = item.description;

            const newsUrl = newsClone.querySelector<HTMLAnchorElement>('.news__read-more a');

            if (!newsUrl) {
                throw new Error('.news__read-more a was not found');
            }
            
            newsUrl.setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        const newsContainer = document.querySelector<HTMLElement>('.news');

        if (!newsContainer) {
            throw new Error('.news was not found');
        }

        newsContainer.innerHTML = '';

        newsContainer.appendChild(fragment);
    }
}

export default News;
