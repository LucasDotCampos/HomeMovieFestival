import { ICreateUser, IUser } from "../models";

export interface IUsersRepository {
    findAll(): Promise<IUser[]>;
    findByName(name: string): Promise<IUser>;
    findById(userId: string): Promise<IUser>;
    findByemail(email: string): Promise<IUser>;
    create(data: ICreateUser): Promise<IUser>;
    save(user: IUser): Promise<IUser>;
    remove(user: IUser): Promise<void>;
}
