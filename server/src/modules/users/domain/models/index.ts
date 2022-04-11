import { IMovie } from "../../../movies/domain/models";

export interface IUser {
    id: string;
    name: string;
    email: string;
    password: string;
    avatar: string;
    movies: IMovie[];
    created_at: Date;
    updated_at: Date;
}

export interface ICreateUser {
    name: string;
    email: string;
    password: string;
    avatar: string;
}

export interface IUserId {
    userId: string;
}

export interface IUserUpdateAvatar {
    userId: string;
    avatarFilename: string;
}

export interface IUserUpdate {
    userId: string;
    name: string;
    email: string;
    password?: string;
    oldPassword?: string;
}
