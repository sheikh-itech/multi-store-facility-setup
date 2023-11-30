import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, ScrollView, StyleSheet, Text } from 'react-native';
import InputFocusBlur from '../components/InputFocusBlur';
import { View } from 'react-native';
import HttpService from '../common/services/HttpService';
import ApiUrls from '../navigation/ApiUrls';
import UserService from '../common/services/UserService';
import { Pressable } from 'react-native';

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

    const handleLogin = async (user: any) => {
        
        HttpService.postApi(ApiUrls.Authenticate, user)
            .then((res: any) => {
                if(res.success || (res.status===200)) {
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
        <SafeAreaView style={styles.safeArea}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
                <View style={styles.container}>
                    <InputFocusBlur
                        placeholder="Username"
                        value={user.username}
                        onChangeText={(text) => handleInputChange('username', text)}
                        width={'90%'}
                    />
                    <InputFocusBlur
                        placeholder="Password"
                        value={user.password}
                        onChangeText={(text) => handleInputChange('password', text)}
                        secureTextEntry={true}
                        width={'90%'}
                    />

                    <Pressable style={styles.button} onPress={() => handleLogin(user)}>
                        <Text style={styles.loginText}>Login</Text>
                    </Pressable>
                </View>
                

            </ScrollView>
        </SafeAreaView>
    );
};
export default Login;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center', // Center children vertically
        alignItems: 'center', // Center children horizontally
    },
    button: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#65a4ad',
        borderColor: '#17a2b8',
        paddingTop: 10,
        paddingBottom: 10
    },
    loginText: {
        color: '#fff'
    }
});
