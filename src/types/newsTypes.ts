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
