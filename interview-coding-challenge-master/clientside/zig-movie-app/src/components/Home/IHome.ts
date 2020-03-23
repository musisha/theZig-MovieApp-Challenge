
//type for movies property of the state in home component
type IMovies = 
        {"movies": {
                    "popularity": number,
                    "vote_count": number,
                    "video": boolean,
                    "poster_path": string,
                    "id": number,
                    "adult": boolean,
                    "backdrop_path": string,
                    "original_language": string, 
                    "original_title": string,
                    "genre_ids": number[],
                    "title": string,
                    "vote_average": number,
                    "overview": string,
                    "release_date": string
                }
            };


let myType: {
        "popularity": number,
        "vote_count": number,
        "video": boolean,
        "poster_path": string,
        "id": number,
        "adult": boolean,
        "backdrop_path": string,
        "original_language": string, 
        "original_title": string,
        "genre_ids": number[],
        "title": string,
        "vote_average": number,
        "overview": string,
        "release_date": string
    }



export interface IHome {
    movies: IMovies[],
    heroimage: {
        "popularity": number,
        "vote_count": number,
        "video": boolean,
        "poster_path": string,
        "id": number,
        "adult": boolean,
        "backdrop_path": string,
        "original_language": string, 
        "original_title": string,
        "genre_ids": number[],
        "title": string,
        "vote_average": number,
        "overview": string,
        "release_date": string
    } | any,
    loading: boolean,
    currentPage: number,
    totalPages: number,
    searchterm: string,
}