export interface IMovie {
    id: string;
    description: string;
    image: string;
    magnet: string;
    title: string;
    releaseDate: string;
    userId: any;
    created_at: Date;
    updated_at: Date;
}

export interface ICreateMovie {
    description: string;
    image: string;
    magnet: string;
    title: string;
    releaseDate: string;
    userId: any;
}

export interface IMovieId {
    id: string;
}

export interface IMovieTitle {
    title: string;
}

export interface IMovieUpdate {
    id: string;
    image: string;
    magnet: string;
    description: string;
    title: string;
    releaseDate: string;
    userId: any;
}
