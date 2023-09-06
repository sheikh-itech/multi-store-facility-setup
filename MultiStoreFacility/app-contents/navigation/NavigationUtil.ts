import { NavigationContainerRef } from '@react-navigation/native';
import { routes } from './Routes';

let navigationRef: NavigationContainerRef<any>;

export const setNavigationRef = (ref: NavigationContainerRef<any>) => {
    navigationRef = ref;
};

export const navigateTo = <RouteName extends keyof typeof routes>
    (routeName: RouteName | any, params?: any) => {
    
    //console.log(routeName + '--' + params.firstName);
    
    if (navigationRef) {
        navigationRef.navigate(routeName, params);
    }
};
