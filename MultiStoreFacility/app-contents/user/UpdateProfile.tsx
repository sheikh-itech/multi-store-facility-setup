import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function UpdateProfile({ nav }: any): JSX.Element {

    if (!nav)
        nav = useNavigation();

    const handleNavigation = (path: any) => {
        nav.navigate(path);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text> Profile Update Screen</Text>
        </SafeAreaView>
    );
};
export default UpdateProfile;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        color: 'red'
    }
});
