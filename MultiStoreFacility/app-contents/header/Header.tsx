import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function Header({ nav }:any): JSX.Element {

    if (!nav)
        nav = useNavigation();

    const [searchText, setSearchText] = useState('');

    const searchForInputText = () => {
        console.log('Make Text Search call- may be http: ' + searchText)
    }

    const inputText = (text: any) => {
        setSearchText(text);
    }

    const handleNavigation = (path: any) => {
        nav.navigate(path);
        //nav.navigate(path, { firstName: 'Sheikh', lastName: 'Hapheej' });
    };

    return (
        <View style={styles.headerContainer}>
            <TextInput style={styles.input}
                onChangeText={(text) => inputText(text) }
                onSubmitEditing={() => searchForInputText() }
                returnKeyType="done" placeholder="Search items" />

            {/*<TouchableOpacity onPress={() => handleNavigation("Home")}>
                <Text style={styles.menu}>Home</Text>
            </TouchableOpacity>*/}
            <Button title="Home" onPress={() => handleNavigation("Home")} />
            <Button title="Register" onPress={() => handleNavigation("Register")} />
            { /* <FontAwesomeIcon icon={faHome} size={24} color="white" /> */ }
            { /* <FontAwesomeIcon icon={faUser} size={24} color="white" /> */ }
            { /* <FontAwesomeIcon icon={faSignInAlt} style={styles.icon} /> */ }
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 8,
        backgroundColor: '#2089dc',
    },
    input: {
        height: 30,
        width: 150,
        borderWidth: 1,
        padding: 5,
        borderColor: 'blue',
        borderRadius: 5,
        backgroundColor: 'white'
    },
    icon: {
        padding: 17,
        color: 'white',
        fontSize: 24,
    },
    menu: {
        padding: 5,
        color: 'white',
        fontSize: 20
    }
});

export default Header;
