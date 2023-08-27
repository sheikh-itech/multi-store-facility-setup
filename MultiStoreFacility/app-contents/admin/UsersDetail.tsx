import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import HttpService from '../common/services/HttpService';
import ApiUrls from '../navigation/ApiUrls';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';

function UsersDetail({ nav }: any): JSX.Element {

    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);

    useEffect(() => { listAllUsers();  }, []);

    const listAllUsers = () => {
        debugger
        HttpService.getApi(ApiUrls.ListObjects)
            .then((res) => {
                setUsers(res.data);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
            });
    };

    const deleteUser = (firstName: any) => {
        HttpService.deleteApi(ApiUrls.DeleteObjects + '/' + firstName)
            .then((res) => {
                listAllUsers();
            })
            .catch((err) => {
                setLoading(false);
            });
    }

    const renderUserTable = () => {

        if (loading) {
            return <Text>Loading users...</Text>;
        }

        if (users.length === 0) {
            return <Text>No users found</Text>;
        }

        return (
            <View style={styles.table}>
                <View style={styles.tableRow}>
                    <Text style={styles.tableHeaderCell}>Field</Text>
                    <Text style={styles.tableHeaderCell}>Value</Text>
                </View>
                {
                    users.map((user: any) => (
                        <View style={styles.tableRow} key={user._id}>
                            <Text style={styles.tableCell}>{user.firstName}</Text>
                            <Text style={styles.tableCell}>{user.lastName}</Text>
                            <Text style={styles.tableCell}>{user.address.village}</Text>
                            <Text style={styles.tableCell}>{user.address.city}</Text>
                            <Text style={styles.tableCell}>{user.address.zipcode}</Text>
                            <TouchableOpacity onPress={() => deleteUser(user.firstName)}>
                                <FontAwesomeIcon icon={faTrashCan} size={24} color="gray" />
                            </TouchableOpacity>
                            <FontAwesomeIcon icon={faPenToSquare} size={24} color="gray" />
                        </View>
                    ))
                }
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>

                {renderUserTable()}

            </ScrollView>
        </SafeAreaView>
    );
};
export default UsersDetail;

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
