import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, Text, TouchableOpacity } from 'react-native';
import { View, StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Button } from 'react-native-elements';
import { enableScreens } from 'react-native-screens';

export default function RNCameraImageQRScannerExample({ nav }: any): JSX.Element {

    enableScreens();

    if (!nav)
        nav = useNavigation();

    const handleNavigation = (path: any) => {
        nav.navigate(path);
    };

    const [itemsDetail, setItemsDetail] = useState([]);
    useEffect(() => { }, [itemsDetail]);

    const cameraRef = useRef<RNCamera>(null);
    const [isCameraOpen, setIsCameraOpen] = useState(false);

    const startCamera = () => {
        setIsCameraOpen(true);
        if (cameraRef.current) {
            cameraRef.current.recordAsync().then((data: any) => {
                //console.log('Video recorded:', data);
                // Process the recorded video data
            }).catch((error: any) => {
                console.log('Error recording video:', error);
            });
        }
    };

    const handleItemScan = () => {
        setIsCameraOpen(true);
    };

    const stopScanner = () => {
        setIsCameraOpen(false);
        if (cameraRef.current && cameraRef.current.stopRecording) {
            cameraRef.current.stopRecording();
        }
    };

    const handleBarcodeScanned = ({ data }: any) => {
        console.log('Scanned QR code:', data);
        //Stop Scanner
        stopScanner();

        const itemArray = data.split("##");

        const itemObject = itemArray.reduce((obj: any, item: any) => {
            const [key, value] = item.split(":");
            obj[key] = value;
            return obj;
        }, {});

        //setItemsDetail(itemObject);
        // Set unique items
        setItemsDetail((prevItems: any) => {
            const existingItems = new Set(prevItems.map((item: any) => Object.values(item)[0]));
            const identifier = Object.values(itemObject)[0];
            if (!existingItems.has(identifier)) {
                return [...prevItems, itemObject];
            }
            return prevItems;
        });
    };

    const removeItem = (id: any) => {
        setItemsDetail((prevItems: any) => {
            const updatedItems = prevItems.filter((item: any) => item.id !== id);
            return updatedItems;
        });
    };

    return (
        <View style={styles.container}>
            {!isCameraOpen && (
                <Button title="Scan Item" onPress={handleItemScan} />
            )}
            {isCameraOpen && (
                <View style={styles.cameraContainer}>
                    <RNCamera
                        ref={cameraRef}
                        style={styles.camera}
                        type={RNCamera.Constants.Type.back}
                        flashMode={RNCamera.Constants.FlashMode.auto}
                        captureAudio={false}
                        barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
                        onBarCodeRead={handleBarcodeScanned}
                    />
                </View>
            )}

            <View style={styles.table}>
                <View style={styles.tableRow}>
                    <Text style={styles.tableHeaderCell}>Name</Text>
                    <Text style={styles.tableHeaderCell}>Price</Text>
                    <Text style={styles.tableHeaderCell}>Desc</Text>
                    <Text style={styles.tableHeaderCell}>Code</Text>
                </View>
                {
                    itemsDetail.map((item: any, index: number) => {
                        console.log(item); // Log the item object
                        return (
                            <View style={styles.tableRow} key={item.id}>
                                <Text>{item.name}</Text>
                                <View style={styles.tableCell}>
                                    <Text>{item.price}</Text>
                                </View>
                                <View style={styles.tableCell}>
                                    <Text>{item.desc}</Text>
                                </View>
                                <View style={styles.tableCell}>
                                    <Text>{item.code}</Text>
                                </View>
                                <TouchableOpacity onPress={() => removeItem(item.id)}>
                                    <FontAwesomeIcon icon={faTrashCan} size={24} color="gray" />
                                </TouchableOpacity>
                                <FontAwesomeIcon icon={faPenToSquare} size={24} color="gray" />
                            </View>
                        );
                    })
                }

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    camera: {
        flex: 1,
        width: 250,//Dimensions.get('window').width,
        height: 250//Dimensions.get('window').height,
    },
    cameraContainer: {
        width: 250,//Dimensions.get('window').width,
        height: 250,//Dimensions.get('window').height,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        marginVertical: 20,
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
        padding: 10
    },
    tableHeaderCell: {
        flex: 1,
        fontWeight: 'bold',
    },
    tableCell: {
        width: 'auto',
        borderWidth: 1
    }
});
