import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class UserService {
    
    public static setUserDetail(userDetail: any, rememberMe: boolean = false): void {
        if(rememberMe)
            localStorage.setItem('~msf-ud', JSON.stringify(userDetail));
        else {
            UserService.logOut();
            sessionStorage.setItem('~msf-ud', JSON.stringify(userDetail));
        }
    }

    public static logOut() {
        
        localStorage.removeItem('~msf-ud');
    }

    public static getUsername() {

        let detail = this.getUserDetail();
        return  detail ? detail.username : null;
    }

    public static getUserId() {

        let detail = this.getUserDetail();
        return  detail ? detail.userId : null;
    }

    public static getUserRoleId() {

        let detail = this.getUserDetail();
        return  detail ? detail.userId : null;
    }

    public static getUserRoles() {

        let detail = this.getUserDetail();
        return  detail ? detail.roles : null;
    }

    public static getUserMail() {

        let detail = this.getUserDetail();
        return  detail ? detail.email : null;
    }

    public static getUserToken() {

        let detail = this.getUserDetail();
        return detail ? detail.token : null;
    }

    public static getUserModules() {

        let detail = this.getUserDetail();
        return  detail ? detail.grantedModules : null;
    }

    public static getModuleMappings() {

        let detail = this.getUserDetail();
        return  detail ? detail.moduleMapping : null;
    }

    private static getUserDetail() {

        let token = localStorage.getItem("~msf-ud");

        if (token != null)
            return JSON.parse(token);
        else {
            token = sessionStorage.getItem("~msf-ud");
            if (token != null)
                return JSON.parse(token);
        }

        return null;
    }
}
