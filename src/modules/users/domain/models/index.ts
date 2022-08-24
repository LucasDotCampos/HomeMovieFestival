export interface IUser {
    id: string;
    name: string;
    email: string;
    password: string;
    avatar: string;
    created_at: Date;
    updated_at: Date;
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

export interface IUserAuthenticated {
    user: IUser;
    token: string;
}
