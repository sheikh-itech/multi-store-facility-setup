import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Keychain from 'react-native-keychain';

class UserService {

    private static storageKey = '~msf-ud';
    private static isKeychain = true;

    public static setUserDetail(userDetail: any): void {

        if (UserService.isKeychain)
            Keychain.setGenericPassword(UserService.storageKey, JSON.stringify(userDetail));
        else
            AsyncStorage.setItem(UserService.storageKey, JSON.stringify(userDetail));
    }

    public static logOut() {

        if (UserService.isKeychain)
            Keychain.resetGenericPassword();
        else
            AsyncStorage.clear();
    }

    public static async getUsername() {

        let detail = await this.getUserDetail();
        return detail ? detail.username : null;
    }

    public static async getUserId() {

        let detail = await this.getUserDetail();
        return detail ? detail.userId : null;
    }

    public static async getUserRoleId() {

        let detail = await this.getUserDetail();
        return detail ? detail.userId : null;
    }

    public static async getUserRoles() {

        let detail = await this.getUserDetail();
        return detail ? detail.roles : null;
    }

    public static async getUserMail() {

        let detail = await this.getUserDetail();
        return detail ? detail.email : null;
    }

    public static async getUserToken() {

        let detail = await this.getUserDetail();
        return detail ? detail.token : null;
    }

    public static async getUserModules() {

        let detail = await this.getUserDetail();
        return detail ? detail.grantedModules : null;
    }

    public static async getModuleMappings() {

        let detail = await this.getUserDetail();
        return detail ? detail.moduleMapping : null;
    }

    private static async getUserDetail(): Promise<any | null> {

        let itemValue: any;
        try {
            if (UserService.isKeychain)
                itemValue = await Keychain.getGenericPassword();
            else
                itemValue = await AsyncStorage.getItem(UserService.storageKey);

            if (itemValue != null && UserService.isKeychain && itemValue.password)
                return JSON.parse(itemValue.password);
            else if (itemValue != null && !UserService.isKeychain)
                return JSON.parse(itemValue);
            else
                return null;

        } catch (error) {
            return null;
        }
    }
}
export default UserService;