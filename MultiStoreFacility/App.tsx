import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { StatusBar, useColorScheme } from 'react-native';

import { enableScreens } from 'react-native-screens';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Colors } from 'react-native/Libraries/NewAppScreen';

import NavStack from './app-contents/navigation/NavStack';
import Header from './app-contents/header/Header';
import Footer from './app-contents/footer/Footer';
import Login from './app-contents/login/Login';

function App(): JSX.Element {

    enableScreens();

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    /** SafeAreaView vs SafeAreaProvider
     * SafeAreaView: in-built provider for basic app
     * SafeAreaProvider: third part for complex app
     */

    return (
        /*
        <SafeAreaView style={backgroundStyle}>
            ...
        </SafeAreaView>
        */

        <SafeAreaProvider style={backgroundStyle}>

            { /* StatusBar shows Time|Battery-Info|Network-Info etc */}
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={backgroundStyle.backgroundColor}
            />

            <NavigationContainer>
                {isLoggedIn ? (
                    <>
                        <Header />
                        <NavStack />
                        <Footer />
                    </>
                ) : (
                    <Login setIsLoggedIn={setIsLoggedIn} />
                )}
            </NavigationContainer>

        </SafeAreaProvider>
    );
}

export default App;
