import Register from '../user/Register';
import Home from '../body-content/home/Home';
import UpdateProfile from '../user/UpdateProfile';
import Profile from '../user/Profile';
import Settings from '../admin/Settings';
import UsersDetail from '../admin/UsersDetail';
import MSFItemsCart from '../body-content/cart/MSFItemsCart';
import RNCameraMSFItemsCart from '../body-content/cart/RNCameraMSFItemsCart';
import RNCameraImageQRScanner from '../body-content/RNCameraScanner/RNCameraImageQRScanner';
import RNCameraVideoQRScanner from '../body-content/RNCameraScanner/RNCameraVideoQRScanner';

/*  Add route defination for all components/views here
    keep headerShown 'true' to Show the navigation bar
*/

export const routes = [
    { name: 'Home', ele: Home, options: { headerShown: true } },
    { name: 'Profile', ele: Profile, options: { headerShown: false } },
    { name: 'UpdateProfile', ele: UpdateProfile, options: { headerShown: false } },
    { name: 'Register', ele: Register, options: { headerShown: false } },
    { name: 'Settings', ele: Settings, options: { headerShown: false } },
    { name: 'UsersDetail', ele: UsersDetail, options: { headerShown: false } },
    { name: 'MSFItemsCart', ele: MSFItemsCart, options: { headerShown: false } },
    { name: 'RNCameraMSFItemsCart', ele: RNCameraMSFItemsCart, options: { headerShown: false } },
    { name: 'RNCameraImageQRScanner', ele: RNCameraImageQRScanner, options: { headerShown: false } },
    { name: 'RNCameraVideoQRScanner', ele: RNCameraVideoQRScanner, options: { headerShown: false } }
] as const;
