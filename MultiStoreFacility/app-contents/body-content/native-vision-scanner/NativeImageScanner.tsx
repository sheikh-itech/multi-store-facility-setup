import * as React from 'react';
import { View } from 'react-native';

import { StyleSheet, Text } from 'react-native';
import { useCameraDevices } from 'react-native-vision-camera';
import { Camera } from 'react-native-vision-camera';
import { useScanBarcodes, BarcodeFormat } from 'vision-camera-code-scanner';

export default function NativeImageScanner({ nav, route }: any): JSX.Element {

    const [hasPermission, setHasPermission] = React.useState(false);
    const devices = useCameraDevices();
    const device = devices.back;

    const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
        checkInverted: true,
    });

    React.useEffect(() => {
        (async () => {
            const status = await Camera.requestCameraPermission();
            setHasPermission(status === 'authorized');
        })();
    }, []);

    return (
        <View style={styles.container}>
            {
                device != null &&
                hasPermission && (
                    <>
                        <Camera
                            style={StyleSheet.absoluteFill}
                            device={device}
                            isActive={true}
                            frameProcessor={frameProcessor}
                            frameProcessorFps={5}
                        />
                        {barcodes.map((barcode: any, idx: any) => (
                            <Text key={idx} style={styles.barcodeTextURL}>
                                {barcode.displayValue}
                            </Text>
                        ))}
                    </>
                )
            }
        </View>
    );
}

const styles = StyleSheet.create({
    barcodeTextURL: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },
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
