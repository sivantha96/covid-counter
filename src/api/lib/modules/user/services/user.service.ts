import userSchems from "../schemas/user.schems";
import { IUser } from "../models/user.model";

export class UserService {

    public getAll(callback: Function) {
        userSchems.find({}, callback);
    }

    public createUser(user: IUser, callback: any) {
        const user_details = new userSchems(user);
        user_details.save(callback);
    }
}