import { enableScreens } from 'react-native-screens';
import { PermissionsAndroid, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRef } from 'react';
import { Platform } from 'react-native';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import { View } from 'react-native';
import { RNCamera } from 'react-native-camera';

export default function RNCameraImageQRScanner({ nav }: any): JSX.Element {

    enableScreens();

    if (!nav)
        nav = useNavigation();

    const handleNavigation = (path: any) => {
        nav.navigate(path);
    };

    const cameraRef = useRef(null) as any;

    const handleBarcodeScanned = ({ data }: any) => {
        console.log('Scanned QR code:', data);
        // Process the scanned QR code data
    };

    //Below code Returns Base64 Code Of Image
    const handleCapturebase64Code = async () => {
        if (Platform.OS === 'android') {
            const permission = PermissionsAndroid.PERMISSIONS.CAMERA;
            const hasPermission = await PermissionsAndroid.check(permission);

            if (!hasPermission) {
                const status = await PermissionsAndroid.request(permission);
                if (status !== PermissionsAndroid.RESULTS.GRANTED) {
                    // Permission denied, handle accordingly
                    return;
                }
            }
        } else {
            const permission = Platform.select({
                ios: PERMISSIONS.IOS.CAMERA,
                android: PERMISSIONS.ANDROID.CAMERA,
            }) as any;

            const status = await check(permission);
            if (status !== RESULTS.GRANTED) {
                const result = await request(permission);
                if (result !== RESULTS.GRANTED) {
                    // Permission denied, handle accordingly
                    return;
                }
            }
        }

        if (cameraRef.current) {
            const options = { quality: 0.5, base64: true };
            const data = await cameraRef.current.takePictureAsync(options);

            // Process the captured image data [Base 64 Image Code]
            console.log(data);
        }
    };

    return (
        <View style={styles.container}>
            <RNCamera
                ref={cameraRef}
                style={styles.preview}
                type={RNCamera.Constants.Type.back}
                flashMode={RNCamera.Constants.FlashMode.auto}
                captureAudio={false}
                onBarCodeRead={handleBarcodeScanned}
            />
            <View style={styles.captureContainer}>
                <TouchableOpacity style={styles.captureButton} onPress={() => handleBarcodeScanned} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    preview: {
        width: 200,
        height: 100,
        borderRadius: 5,
    },
    captureContainer: {
        position: 'absolute',
        bottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    captureButton: {
        width: 70,
        height: 70,
        borderRadius: 35,
        borderWidth: 5,
        borderColor: '#FFFFFF',
        backgroundColor: '#FFFFFF',
    }
});
