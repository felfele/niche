import * as React from 'react'
import { View, Dimensions, StyleSheet } from 'react-native'
import QRCodeScanner from 'react-native-qrcode-scanner';

const qrCodeScannerSize = Dimensions.get('window').width;

export const QRCodeScannerView = (props: {onScanSuccess: (data: string) => void}) => {
    return (
        <>
            <View
                style={{
                    width: qrCodeScannerSize,
                    height: qrCodeScannerSize,
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    flexDirection: 'column',
                }}
            >
                <QRCodeScanner
                    onRead={(e) => props.onScanSuccess(e.data)}
                    containerStyle={styles.qrCameraStyle}
                    cameraStyle={styles.qrCameraStyle}
                    fadeIn={false}
                    cameraProps={{ratio: '1:1'}}
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    qrCameraContainer: {
        width: qrCodeScannerSize,
        height: qrCodeScannerSize,
        padding: 0,
        alignSelf: 'center',
        flexDirection: 'column',
    },
    qrCameraStyle: {
        width: qrCodeScannerSize,
        height: qrCodeScannerSize,
    },
})
