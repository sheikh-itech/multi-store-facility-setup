import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useRef } from 'react';
import { Alert } from 'react-native';
import { Dimensions } from 'react-native';
import { View, StyleSheet } from 'react-native';
import { EncDecUtil } from '../../common/utils/EncDecUtil';
import { RNCamera } from 'react-native-camera';

export default function RNCameraVideoQRScanner({ nav, route }: any): JSX.Element {

    if (!route)
        route = useRoute();

    if (!nav)
        nav = useNavigation();

    const { callback } = route.params as any;

    const handleNavigation = (path: any) => {
        nav.navigate(path);
    };

    const cameraRef = useRef<RNCamera>(null);

    const stopScanner = () => {
        if (cameraRef.current && cameraRef.current.stopRecording)
            cameraRef.current.stopRecording();
    };

    const handleBarcodeScanned = ({ data }: any) => {

        stopScanner();  //Stop Scanner
        data += '##total:0';

        const itemArray = data.split("##");

        const itemObject = itemArray.reduce((obj: any, item: any) => {
            
            const [key, value] = item.split(":");
            if(encKeyFields.includes(key))
                obj[key] = EncDecUtil.decrypt(value);
            else
                obj[key] = value;

            return obj;
        }, {});

        if (Object.keys(itemObject).length < 4) {
            data = '';
            Object.keys(itemObject).forEach(key => { data = data + key });

            showAlert(data);

            if (typeof callback === 'function') {
                callback({});
                handleNavigation("RNCameraMSFItemsCart");
            }
        }

        if (typeof callback === 'function') {
            callback(itemObject);
            handleNavigation("RNCameraMSFItemsCart");
        }
    };

    const showAlert = (data: any) => {
        Alert.alert(
            'Incomplete Data',
            data,
            [
                { text: 'Close', onPress: () => console.log('Closing Info') },
                /*{ text: 'Button 2', onPress: () => console.log('Button 2 pressed') },*/
            ]
        );
    };

    return (
        <View style={styles.container}>

            {
                <View style={styles.cameraContainer}>
                    <RNCamera
                        ref={cameraRef}
                        style={styles.camera}
                        type={RNCamera.Constants.Type.back}
                        flashMode={RNCamera.Constants.FlashMode.auto}
                        captureAudio={false}
                        barCodeTypes={[
                            RNCamera.Constants.BarCodeType.qr,
                            RNCamera.Constants.BarCodeType.ean8,
                            RNCamera.Constants.BarCodeType.ean13,
                            RNCamera.Constants.BarCodeType.code39,
                            RNCamera.Constants.BarCodeType.code128,
                            RNCamera.Constants.BarCodeType.code128
                        ]}
                        onBarCodeRead={handleBarcodeScanned}
                    />
                </View>
            }
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
    }
});

const encKeyFields = ['name', 'desc', 'code', 'category'];