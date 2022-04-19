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

export interface IUserToken {
    id: string;
    token: string;
    user_id: string;
    created_at: Date;
    updated_at: Date;
}

export interface ICreateSession {
    email: string;
    password: string;
}

export interface IUserAuthenticated {
    user: IUser;
    token: string;
}
