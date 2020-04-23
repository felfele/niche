import * as React from 'react'
import { View, Dimensions, StyleSheet } from 'react-native'
import Clipboard from '@react-native-community/clipboard'
import QRCodeScanner from 'react-native-qrcode-scanner';
import { WideButton } from './WideButton';
import { ComponentColors } from '../../styles';

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
            {__DEV__ &&
                <WideButton
                    label='Fake scan from clipboard'
                    onPress={async () => {
                        const clipboardText = await Clipboard.getString()
                        props.onScanSuccess(clipboardText)
                    }}
                    style={{
                        backgroundColor: ComponentColors.DEBUG_COLOR,
                    }}
                />
            }
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
