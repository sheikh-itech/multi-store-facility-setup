import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, ScrollView, StyleSheet, Text } from 'react-native';
import InputFocusBlur from '../components/InputFocusBlur';
import { View } from 'react-native';
import HttpService from '../common/services/HttpService';
import ApiUrls from '../navigation/ApiUrls';

function Register({ nav }: any): JSX.Element {

    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        password: '',
        address: {
            village: '',
            city: '',
            zipcode: '',
        },
    });

    const handleInputChange = (fieldName: any, value: any) => {
        setUser((prevUser) => ({
            ...prevUser,
            [fieldName]: value,
        }));
    };

    const handleAddressChange = (field: any, value: any) => {
        setUser((prevUser) => ({
            ...prevUser,
            address: {
                ...prevUser.address,
                [field]: value                
            },
        }));
    };

    const handleZipcodeChange = (value: any) => {
        // Check if value contains only digits
        if (/^\d*$/.test(value)) {
            setUser((prevUser) => ({
                ...prevUser,
                address: {
                    ...prevUser.address,
                    zipcode: value,
                },
            }));
        }
    };

    const handleRegister = (user: any) => {

        HttpService.postApi(ApiUrls.AddObjects, user)
            .then((data) => {
                console.log('Post Request Successful:', data);
            })
            .catch((error) => {
                console.error('Post Request Failed:', error);
            });
        //navigation.navigate();
    };

    const renderUserTable = () => {
        return (
            <View style={styles.table}>
                <View style={styles.tableRow}>
                    <Text style={styles.tableHeaderCell}>Field</Text>
                    <Text style={styles.tableHeaderCell}>Value</Text>
                </View>
                {Object.entries(user).map(([key, value]) => (
                    <View style={styles.tableRow} key={key}>
                        <Text style={styles.tableCell}>{key}</Text>
                        <Text style={styles.tableCell}>{JSON.stringify(value)}</Text>
                    </View>
                ))}
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <InputFocusBlur
                        placeholder="First Name"
                        value={user.firstName}
                        onChangeText={(text) => handleInputChange('firstName', text)}
                        //isFocused={/* add your logic to determine focus state */}
                    />
                    <InputFocusBlur
                        placeholder="Last Name"
                        value={user.lastName}
                        onChangeText={(text) => handleInputChange('lastName', text)}
                        //isFocused={/* add your logic to determine focus state */}
                    />
                    <InputFocusBlur
                        placeholder="Password"
                        value={user.password}
                        onChangeText={(text) => handleInputChange('password', text)}
                        secureTextEntry={ true }
                    />
                    <InputFocusBlur
                        placeholder="Village"
                        value={user.address.village}
                        onChangeText={(text) => handleAddressChange('village', text)}
                        //isFocused={/* add your logic to determine focus state */}
                    />
                    <InputFocusBlur
                        placeholder="City"
                        value={user.address.city}
                        onChangeText={(text) => handleAddressChange('city', text)}
                        //isFocused={/* add your logic to determine focus state */}
                    />
                    <InputFocusBlur
                        placeholder="Zipcode"
                        value={user.address.zipcode}
                        onChangeText={(text) => handleZipcodeChange(text)}
                        keyboardType='numeric'
                    />
                </View>

                <Button title="Register" onPress={() => handleRegister(user)} />

                {/* User table */}
                <View style={styles.container}>
                    <Text>User Information:</Text>
                    {renderUserTable()}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
export default Register;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    table: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        padding: 10,
    },
    tableHeaderCell: {
        flex: 1,
        fontWeight: 'bold',
    },
    tableCell: {
        flex: 1,
    }
});
