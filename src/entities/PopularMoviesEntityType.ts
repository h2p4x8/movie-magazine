type DefaultParamsType = {
    id: number;
}

type PopularMoviesAttributeEntityType = {
    "genre_ids": Array<number>;
    "original_language": "en" | 'de' | 'ru';
    "vote_average": number;
    "overview": string,
    "poster_path": string;
    "release_date": "2023-08-16",
    "title": string,
    "video": false,
    "vote_count": 863
}

export type PopularMoviesEntityType = DefaultParamsType & PopularMoviesAttributeEntityType;