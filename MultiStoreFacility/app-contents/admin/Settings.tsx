import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native';
import AccordionItem from '../components/AccordionItem';
import { View } from 'react-native';
import AdvAccordion from '../components/AdvAccordionItem';

function Settings({ nav }: any): JSX.Element {

    if (!nav)
        nav = useNavigation();

    const handleNavigation = (path: any) => {
        console.log('path to profile: '+path)
        nav.navigate(path);
        //nav.navigate(path, { firstName: 'Hapheej', lastName: 'M' });
    };

    const settingsData = [
        {
            title: 'Company Profile',
            content: <Text style={styles.textSmall}>
                We are about to update latest profiles
            </Text>
        }, {
            title: 'Company Plannings',
            content: <Text style={styles.textSmall}>
                Whenever company will have plans, you can see here
            </Text>
        }
    ];

    return (
        <SafeAreaView style={styles.container}>

            <Text>Settings Screen</Text>

            <ScrollView
                contentInsetAdjustmentBehavior="automatic" style={styles.container}
                showsVerticalScrollIndicator={false}>

                <AccordionItem title="Admin Pannel">
                    <TouchableOpacity onPress={() => handleNavigation("UsersDetail")}>
                        <Text style={styles.link}>Users List</Text>
                    </TouchableOpacity>
                </AccordionItem>

                <AccordionItem title="User Setting">
                    <Button title="Profile Update" onPress={() => handleNavigation("UpdateProfile")} />
                </AccordionItem>
                <AccordionItem title="Fast refresh">
                    <Text style={styles.textSmall}>See your changes as soon as you save.
                        With the power of JavaScript, React Native lets you iterate at
                        lightning speed.</Text>
                </AccordionItem>
                <AccordionItem title="Cross-platform">
                    <Text style={styles.textSmall}>React components wrap existing native code
                        and interact with native APIs via React’s declarative UI paradigm
                        and JavaScript. This enables native app development for whole new teams
                        of developers</Text>
                    <View style={styles.seperator}></View>
                    <Button title="See more..." />
                </AccordionItem>

                <AdvAccordion accordionData={settingsData} />
            </ScrollView>
            
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#e9f8f3'
    },
    textSmall: {
        fontSize: 16
    },
    seperator: {
        height: 12
    },
    link: {
        padding: 8,
        backgroundColor: '#7ca7e8',
        textAlign: 'center'
    }
});

export default Settings;
