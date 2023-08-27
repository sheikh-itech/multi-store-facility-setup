import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCirclePlus, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Float } from 'react-native/Libraries/Types/CodegenTypes';

function MSFItemsCart({ nav, route }: MSFItemsCartProps): JSX.Element {

    if (!nav)
        nav = useNavigation();

    if (!route)         
        route = useRoute();

    const [cartItems, setCartItems] = useState<ItemObject[]>([]);
    const [grandTotal, updateTotal] = useState<Float>(0.0);

    useEffect(() => { }, [cartItems, grandTotal]);
    useEffect(() => { handleItemObject(route.params.itemObject) }, [route.params.itemObject]);

    const handleItemScan = () => {
        nav.navigate("NativeVideoScanner");
    }

    const handleItemObject = (itemObject: ItemObject) => {
        console.log('handleItemObject called')
        // Handle the itemObject received from NativeVideoScanner screen
        if (!itemObject || Object.keys(itemObject).length < 4 )
            return;

        if (itemObject.price)
            itemObject.price = parseFloat(parseFloat(itemObject.price.toString()).toFixed(2));
        addItem(itemObject);
    };

    const updateGrandTotal = (price: Float) => {
        updateTotal(parseFloat((grandTotal - price).toFixed(2)));
    }

    const addGrandTotal = (price: Float) => {
        updateTotal(parseFloat((grandTotal + price).toFixed(2)));
    }

    const addItem = (itemObject: ItemObject) => {

        if (!cartItems.length || cartItems.length == 0)
            updateGrandTotal(grandTotal);

        const existingItem = cartItems.find((item: ItemObject) => item.id === itemObject.id);
        
        if (existingItem) {
            // Item already exists in the cart, update the quantity by 1
            existingItem.qty += 1;
            existingItem.total += parseFloat(itemObject.price.toString());
            existingItem.total = parseFloat(parseFloat(existingItem.total.toString()).toFixed(2));
            setCartItems([...cartItems]); // Trigger re-render
        } else {
            // Item doesn't exist in the cart, add it
            itemObject.qty = 1;
            //itemObject.price = parseFloat(itemObject.price);
            itemObject.total = parseFloat(parseFloat(itemObject.price.toString()).toFixed(2));
            setCartItems([...cartItems, itemObject]);
        }

        addGrandTotal(parseFloat(itemObject.price.toString()));
    }

    const removeItem = (id: string, price: number, qty: number) => {

        updateGrandTotal(price * qty);

        setCartItems((prevItems: ItemObject[]) => {
            const updatedItems = prevItems.filter((item: ItemObject) => item.id !== id);
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
                                    cartItems.map((item: ItemObject, index: number) => {

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
                                        <Text style={styles.tableHeader}>{ grandTotal}</Text>
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
export default MSFItemsCart;

interface ItemObject {
    id: string;
    name: string;
    price: number;
    qty: number;
    total: number;
}

interface MSFItemsCartProps {
    nav?: any;
    route?: any;
}

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
