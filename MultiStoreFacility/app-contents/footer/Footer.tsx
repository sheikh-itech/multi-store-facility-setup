import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faUser, faList, faCartShopping, faQrcode } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';

function Footer({ nav }: any): JSX.Element {

    if (!nav)
        nav = useNavigation();

    const handleNavigation = (path: any) => {
        nav.navigate(path);
        //nav.navigate(path, { firstName: 'Hapheej', lastName: 'M' });
    };

    return (
        <View style={styles.footerContainer}>
            <TouchableOpacity onPress={() => handleNavigation("Home")}>
                <FontAwesomeIcon icon={faHome} size={24} color="white" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleNavigation("RNCameraMSFItemsCart")}>
                <FontAwesomeIcon icon={faQrcode} size={24} color="white" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleNavigation("Home")}>
                <FontAwesomeIcon icon={faUser} size={24} color="white" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleNavigation("Home")}>
                <FontAwesomeIcon icon={faCartShopping} size={24} color="white" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleNavigation("Settings")}>
                <FontAwesomeIcon icon={faList} size={24} color="white" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: '#2089dc'
    }
});

export default Footer;
