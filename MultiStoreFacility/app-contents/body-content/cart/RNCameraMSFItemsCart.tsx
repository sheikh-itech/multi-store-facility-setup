import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCirclePlus, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import { Float } from 'react-native/Libraries/Types/CodegenTypes';

export default function RNCameraMSFItemsCart({ nav }: any): JSX.Element {

    if (!nav)
        nav = useNavigation();

    const [cartItems, setCartItems] = useState<any[]>([]);
    const [grandTotal, updateTotal] = useState<Float>(0.0);

    useEffect(() => { }, [cartItems, grandTotal]);

    const handleItemScan = () => {
        nav.navigate("RNCameraVideoQRScanner", { callback: handleItemObject });
    }

    const handleItemObject = (itemObject: any) => {
        // Handle the itemObject received from the ZXingVideoQRScanner screen
        if (Object.keys(itemObject).length < 4)
            return;
        console.log('Name: ' + itemObject.name)
        if (itemObject.price)
            itemObject.price = parseFloat(itemObject.price).toFixed(2);
        addItem(itemObject);
    };

    const updateGrandTotal = (price: Float) => {
        updateTotal(parseFloat((grandTotal - price).toFixed(2)));
    }

    const addGrandTotal = (price: Float) => {
        updateTotal(parseFloat((grandTotal + price).toFixed(2)));
    }

    const addItem = (itemObject: any) => {

        if (!cartItems.length || cartItems.length == 0)
            updateGrandTotal(grandTotal);

        const existingItem = cartItems.find((item: any) => item.id === itemObject.id) as any;

        if (existingItem) {
            // Item already exists in the cart, update the quantity by 1
            existingItem.qty += 1;
            existingItem.total += parseFloat(itemObject.price);
            existingItem.total = parseFloat(parseFloat(existingItem.total).toFixed(2));
            setCartItems([...cartItems]); // Trigger re-render
        } else {
            // Item doesn't exist in the cart, add it
            itemObject.qty = 1;
            //itemObject.price = parseFloat(itemObject.price);
            itemObject.total = parseFloat(parseFloat(itemObject.price).toFixed(2));
            setCartItems([...cartItems, itemObject]);
        }

        addGrandTotal(parseFloat(itemObject.price));
    }

    const removeItem = (id: any, price: any, qty: any) => {

        updateGrandTotal(parseFloat(price) * parseFloat(qty));

        setCartItems((prevItems: any) => {
            const updatedItems = prevItems.filter((item: any) => item.id !== id);
            return updatedItems;
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={styles.bodyContainer}>

                    {
                        (cartItems.length > 0 &&
                            <View style={styles.table}>
                                <View style={styles.tableRow}>
                                    <View style={styles.tableCell}>
                                        <Text style={styles.tableHeader}>Name</Text>
                                    </View>
                                    <View style={styles.tableCell}>
                                        <Text style={styles.tableHeader}>Price</Text>
                                    </View>
                                    <View style={styles.tableCell}>
                                        <Text style={styles.tableHeader}>Qty</Text>
                                    </View>
                                    <View style={styles.tableCell}>
                                        <Text style={styles.tableHeader}>Total</Text>
                                    </View>
                                    <View style={styles.tableCell}>
                                        <Text style={styles.tableHeader}>Delete</Text>
                                    </View>
                                    <View style={styles.tableCell}>
                                        <Text style={styles.tableHeader}>Edit</Text>
                                    </View>
                                </View>
                                {
                                    cartItems.map((item: any, index: number) => {

                                        return (
                                            <View style={styles.tableRow} key={item.id}>
                                                <View style={styles.tableCell}>
                                                    <Text>{item.name}</Text>
                                                </View>
                                                <View style={styles.tableCell}>
                                                    <Text>{item.price}</Text>
                                                </View>
                                                <View style={styles.tableCell}>
                                                    <Text>{item.qty}</Text>
                                                </View>
                                                <View style={styles.tableCell}>
                                                    <Text>{item.total}</Text>
                                                </View>
                                                <View style={styles.tableCell}>
                                                    <TouchableOpacity onPress={() => removeItem(item.id, item.price, item.qty)}>
                                                        <FontAwesomeIcon icon={faTrashCan} size={24} color="gray" />
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={styles.tableCell}>
                                                    <TouchableOpacity>
                                                        <FontAwesomeIcon icon={faPenToSquare} size={24} color="gray" />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        );
                                    })
                                }
                                <View style={styles.tableRow}>
                                    <View>
                                        <Text style={styles.tableHeader}>Grand Total :</Text>
                                    </View>
                                    <View style={styles.tableCell}></View>
                                    <View style={styles.tableCell}></View>
                                    <View style={styles.tableCell}>
                                        <Text style={styles.tableHeader}>{grandTotal}</Text>
                                    </View>
                                </View>
                            </View>
                        )
                    }
                </View>
            </ScrollView>
            <View style={styles.fixedScanner}>
                <TouchableOpacity onPress={() => handleItemScan()}>
                    <FontAwesomeIcon icon={faCirclePlus} size={30} color="red" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        position: 'relative'
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
        width: '100%'
    },
    tableHeader: {
        fontWeight: 'bold'
    },
    tableCell: {
        flex: 1,
        width: '20%'
    },
    bodyContainer: {
        marginTop: 20
    },
    fixedScanner: {
        bottom: 5,
        left: '49.5%',
        zIndex: 2,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
