import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { routes } from './Routes';

function NavStack(): JSX.Element {

    const Stack = createNativeStackNavigator();

    return (
        <>
            <Stack.Navigator initialRouteName="ProductsInfo">

                {routes.map((route: any) => (
                    <Stack.Screen
                        key={route.name}
                        name={route.name}
                        component={route.ele}
                        options={route.options}
                        initialParams={route.callback ? { callback: route.callback } : {}}
                    />
                ))}
            </Stack.Navigator>
        </>
    );
};

export default NavStack;

