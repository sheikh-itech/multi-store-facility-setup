import { useNavigation } from '@react-navigation/native';
import React, { useRef, useEffect } from 'react';
import { Dimensions, PermissionsAndroid, Platform } from 'react-native';
import { View, StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';

export default function RNCameraImageQRScanner_Bkp({ nav }: any): JSX.Element {

    if (!nav)
        nav = useNavigation();

    const handleNavigation = (path: any) => {
        nav.navigate(path);
    };

    const cameraRef = useRef<RNCamera>(null) as any;

    useEffect(() => {
        scanQRCode();
    }, []);

    const scanQRCode = async (): Promise<void> => {
        try {
            const granted = await requestCameraPermission();
            if (!granted) {
                console.log('Camera permission not granted');
                return;
            }
            console.log('--1')
            if (cameraRef.current) {
                console.log('--2')
                cameraRef.current.onBarCodeRead = (event: any) => {
                    console.log('--3')
                    if (event.data) {
                        console.log('QR code detected:', event.data);
                        // Stop further scanning or perform any other action
                    }
                    console.log('--4')
                };
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    const handleBarcodeScanned = ({ data }: any) => {
        console.log('Scanned QR code:', data);
        // Process the scanned QR code data
    };
    const requestCameraPermission = async (): Promise<boolean> => {
        if (Platform.OS === 'android') {
            const permission = PermissionsAndroid.PERMISSIONS.CAMERA;
            const granted = await PermissionsAndroid.check(permission);
            if (granted) {
                return true;
            } else {
                const status = await PermissionsAndroid.request(permission);
                return status === PermissionsAndroid.RESULTS.GRANTED;
            }
        } else {
            const permission = Platform.select({
                ios: PERMISSIONS.IOS.CAMERA,
                android: PERMISSIONS.ANDROID.CAMERA,
            }) as any;
            const status = await check(permission);
            if (status === RESULTS.GRANTED) {
                return true;
            } else {
                const result = await request(permission);
                return result === RESULTS.GRANTED;
            }
        }
    };

    return (
        <View style={styles.container}>
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
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    cameraContainer: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
