import { User } from "../beans/user";

export class Validation {

    public static validate(user: User): boolean {

        if(!user)
            return false;

        if(!user.username || user.username.length<=0)
        return false;

        if(!user.password || user.password.length<=0)
            return false;

        return true;
    }
}