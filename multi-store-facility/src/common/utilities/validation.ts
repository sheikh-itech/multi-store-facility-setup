import { Login } from "../beans/login";
import { Register } from "../beans/register";

export class Validation {

    public static validate(login: Login): boolean {

        if (!login)
            return false;

        if (!login.username || login.username.length < 1)
            return false;

        if (!login.password || login.password.length < 1)
            return false;

        return true;
    }

    public static registerValidate(user: Register): string {

        if (!user.firstName || user.firstName.length < 1)
            return 'First Name Required';

        if (!user.lastName || user.lastName.length < 1)
            return 'Last Name Required';
        if (!user.mobile || user.mobile.toString().length < 10)
            return "Mobile don't have 10 digits";
        if (!user.password || user.password.length < 5)
            return 'Password of length 5 required';
        if (!user.dob || user.dob.length < 10)
            return 'Invalid birth date';

        return 'OK';
    }
}