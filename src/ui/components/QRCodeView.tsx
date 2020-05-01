import * as React from 'react'
import { Dimensions, View } from 'react-native'
import QRCode from 'react-native-qrcode-svg';
import { WideButton } from './WideButton';
import { ComponentColors } from '../../styles';

export const QRCodeView = (props: {onDonePress?: () => void, qrCodeValue: string}) => {
    const qrCodeSize = Dimensions.get('window').width;
    return (
        <>
            <View
                style={{
                    width: '100%',
                    height: qrCodeSize,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                }}
            >
                <QRCode
                    value={props.qrCodeValue}
                    size={qrCodeSize * 0.9}
                    backgroundColor={ComponentColors.BACKGROUND_COLOR}
                />
            </View>
            {props.onDonePress &&
                <WideButton
                    label='Done'
                    onPress={props.onDonePress}
                />
            }
        </>
    )
}
