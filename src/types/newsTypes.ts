export enum NewsEndpoint {
    Sources = 'sources',
    Everything = 'everything',
}

export interface ArticleSource {
    name: string;
    id: string | null;
}

export interface NewsArticle {
    source: ArticleSource;
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
}

export interface NewsSource {
    id: string;
    name: string;
}

export interface ApiErrorResponse {
    status: 'error';
    code: string;
    message: string;
}

export type SourcesResponse =
    | {
          status: 'ok';
          sources: NewsSource[];
      }
    | ApiErrorResponse;

export type NewsResponse =
    | {
          status: 'ok';
          totalResults: number;
          articles: NewsArticle[];
      }
    | ApiErrorResponse;

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function isNewsSource(value: unknown): value is NewsSource {
    if (!isRecord(value)) {
        return false;
    }

    return typeof value.id === 'string' && typeof value.name === 'string';
}

export function isSourcesResponse(value: unknown): value is SourcesResponse {
    if (!isRecord(value)) {
        return false;
    }

    if (value.status === 'error') {
        return typeof value.code === 'string' && typeof value.message === 'string';
    }

    if (value.status === 'ok') {
        return Array.isArray(value.sources) && value.sources.every(isNewsSource);
    }

    return false;
}

export function isArticleSource(value: unknown): value is ArticleSource {
    if (!isRecord(value)) {
        return false;
    }

    return typeof value.name === 'string' && (typeof value.id === 'string' || value.id === null);
}

export function isNewsArticle(value: unknown): value is NewsArticle {
    if (!isRecord(value)) {
        return false;
    }

    return (
        isArticleSource(value.source) &&
        (typeof value.author === 'string' || value.author === null) &&
        typeof value.title === 'string' &&
        (typeof value.description === 'string' || value.description === null) &&
        typeof value.url === 'string' &&
        (typeof value.urlToImage === 'string' || value.urlToImage === null) &&
        typeof value.publishedAt === 'string'
    );
}

export function isNewsResponse(value: unknown): value is NewsResponse {
    if (!isRecord(value)) {
        return false;
    }

    if (value.status === 'error') {
        return typeof value.code === 'string' && typeof value.message === 'string';
    }

    if (value.status === 'ok') {
        return (
            typeof value.totalResults === 'number' &&
            Array.isArray(value.articles) &&
            value.articles.every(isNewsArticle)
        );
    }

    return false;
}
