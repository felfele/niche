import * as React from 'react'
import { Modal as ReactModal, View, Text, StatusBar, Platform } from 'react-native'
import ImageViewer from 'react-native-image-zoom-viewer'

import { ImageData } from '../../models/ImageData'
import { getImageDataURI } from './ImageDataView'
import { TouchableView } from './TouchableView'
import { CloseIcon } from './CustomIcon'
import { Colors } from '../../styles'
import { useSafeArea } from 'react-native-safe-area-context'
import { useDeviceOrientation } from '@react-native-community/hooks'

interface BottomMenuItem {
    label: string
    onPress: () => void
}

const BottomMenu = (props: {safeAreaBottom: number, items: BottomMenuItem[]}) => (
    <View
        style={{
            position: 'absolute',
            left: 0,
            bottom: 0,
            height: props.safeAreaBottom + 60,
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            borderTopColor: 'rgba(255, 255, 255, 0.14)',
            borderTopWidth: 1,
        }}
    >
        <View
            style={{
                width: '100%',
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                height: 60,
                paddingTop: 12,
            }}
        >
            {props.items.map((item, index) =>
                <TouchableView
                    onPress={item.onPress}
                    key={index}
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                    }}
                >
                    <Text
                        style={{
                            fontWeight: 'bold',
                            fontSize: 16,
                            color: Colors.WHITE,
                        }}
                    >{item.label}</Text>
                </TouchableView>

            )}
        </View>
    </View>

)

export const FullscreenImageViewer = (props: {
    visible: boolean,
    index: number,
    onCancel: () => void,
    images: ImageData[],
    menuItems: BottomMenuItem[],
}) => {
    const imageUrls = props.images.map(image => ({
        url: getImageDataURI(image.location),
        width: image.width,
        height: image.height,
    }))
    const safeArea = useSafeArea()
    const orientation = useDeviceOrientation()
    console.log('FullscreenImageViewer', {orientation})
    return (
        <ReactModal
            visible={props.visible}
            transparent={Platform.OS === 'ios' ? true : false}
            animationType='fade'
        >
            <StatusBar
                hidden={Platform.OS === 'ios' ? true : false}
                backgroundColor={Colors.BLACK}
                animated={true}
            />
            <ImageViewer
                imageUrls={imageUrls}
                enableSwipeDown={true}
                onCancel={props.onCancel}
                index={props.index}
                renderIndicator={() => (<View></View>)}
                saveToLocalByLongPress={false}
            />
            {orientation.portrait &&
                <BottomMenu
                    safeAreaBottom={safeArea.bottom}
                    items={props.menuItems}
                />
            }
            <TouchableView
                onPress={props.onCancel}
                style={{
                    position: 'absolute',
                    left: 0,
                    top: safeArea.top,
                }}
            >
                <CloseIcon size={48} color={Colors.WHITE}/>
            </TouchableView>
        </ReactModal>
    )
}
