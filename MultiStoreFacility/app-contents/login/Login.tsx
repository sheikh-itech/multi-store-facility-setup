import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, ScrollView, StyleSheet, Text } from 'react-native';
import InputFocusBlur from '../components/InputFocusBlur';
import { View } from 'react-native';
import HttpService from '../common/services/HttpService';
import ApiUrls from '../navigation/ApiUrls';
import UserService from '../common/services/UserService';

function Login({ setIsLoggedIn }: any): JSX.Element {

    useEffect(() => {
        authorize();
    }, []);

    const [user, setUser] = useState({
        username: '',
        password: ''
    });

    const authorize = () => {
        UserService.getUserToken()
            .then(res => {
                HttpService.postApi(ApiUrls.Validate, res)
                    .then((resp: any) => {
                        if(resp.success)
                            setIsLoggedIn(true);
                        else {
                            setIsLoggedIn(false);
                            UserService.logOut();
                        }
                    })
                    .catch((error) => {
                        setIsLoggedIn(false);
                        UserService.logOut();
                    });
            })
            .catch(err => { 
                setIsLoggedIn(false);
                UserService.logOut();
            })
    };

    const handleInputChange = (fieldName: any, value: any) => {
        setUser((prevUser) => ({
            ...prevUser,
            [fieldName]: value,
        }));
    };

    const handleLogin = (user: any) => {
        
        HttpService.postApi(ApiUrls.Authenticate, user)
            .then((res: any) => {
                if(res.success) {
                    setIsLoggedIn(true);
                    UserService.setUserDetail(res.data);
                } else {
                    setIsLoggedIn(false);
                    UserService.logOut();
                }
            })
            .catch((error) => {
                setIsLoggedIn(false);
                UserService.logOut();
            });
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <InputFocusBlur
                        placeholder="Username"
                        value={user.username}
                        onChangeText={(text) => handleInputChange('username', text)}
                    />
                    <InputFocusBlur
                        placeholder="Password"
                        value={user.password}
                        onChangeText={(text) => handleInputChange('password', text)}
                        secureTextEntry={true}
                    />
                </View>

                <Button title="Login" onPress={() => handleLogin(user)} />

            </ScrollView>
        </SafeAreaView>
    );
};
export default Login;

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
