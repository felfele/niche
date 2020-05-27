import * as React from 'react'
import { Modal as ReactModal, View, Text, StatusBar, Platform, StyleProp, ViewStyle } from 'react-native'
import ImageViewer from 'react-native-image-zoom-viewer'

import { ImageData } from '../../models/ImageData'
import { getImageDataURI } from './ImageDataView'
import { TouchableView } from './TouchableView'
import { CloseIcon, CustomIcon } from './CustomIcon'
import { Colors } from '../../styles'
import { useSafeArea } from 'react-native-safe-area-context'
import { useDeviceOrientation, useDimensions } from '@react-native-community/hooks'
import { useState, useEffect } from 'react'

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
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
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

const TouchableIcon = (props: {
    onPress: () => void,
    name: string,
    color: string,
    size: number,
    style?: StyleProp<ViewStyle>,
}) => (
    <TouchableView
        onPress={props.onPress}
        style={[{
            width: 30,
            height: 30,
            borderRadius: 15,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 1,
        }, props.style]}
    >
        <CustomIcon name={props.name} size={props.size} color={props.color} />
    </TouchableView>

)

export const FullscreenImageViewer = (props: {
    visible: boolean,
    index: number,
    onCancel: () => void,
    images: ImageData[],
    menuItems: BottomMenuItem[],
}) => {
    if (!props.visible) {
        return null
    }
    const imageUrls = props.images.map(image => ({
        url: getImageDataURI(image.location),
        width: image.width,
        height: image.height,
    }))
    const safeArea = useSafeArea()
    const orientation = useDeviceOrientation()
    const dimensions = useDimensions()
    const [areControlsVisible, setControlsVisible] = useState(true)
    const [index, setIndex] = useState(props.index)
    const onLeft = () => setIndex(index - 1)
    const onRight = () => setIndex(index + 1)
    const hasLeftButton = index > 0
    const hasRightButton = index < imageUrls.length - 1
    useEffect(() => {
        setIndex(props.index)
    }, [props.index])
    console.log('FullscreenImageViewer', {index, props, images: props.images})
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
                index={index}
                renderIndicator={() => (<View></View>)}
                saveToLocalByLongPress={false}
                onMove={() => setControlsVisible(false)}
                onChange={(index) => {
                    setControlsVisible(true)
                    if (index != null) {
                        setIndex(index)
                    }
                }}
                onClick={() => setControlsVisible(true)}
                flipThreshold={dimensions.window.width}
            />
            {areControlsVisible &&
                <>
                    {orientation.portrait &&
                        <BottomMenu
                            safeAreaBottom={safeArea.bottom}
                            items={props.menuItems}
                        />
                    }
                    <TouchableIcon
                        name='no2'
                        size={32}
                        color='rgba(255, 255, 255, 0.7)'
                        onPress={props.onCancel}
                        style={{
                            position: 'absolute',
                            left: 10,
                            top: safeArea.top + 10,
                            paddingLeft: 1,
                        }}
                    />

                    {hasLeftButton &&
                        <TouchableIcon
                            name='left-arrow2'
                            size={32}
                            color='rgba(255, 255, 255, 0.7)'
                            onPress={onLeft}
                            style={{
                                position: 'absolute',
                                left: 10,
                                top: dimensions.window.height / 2,
                            }}
                        />
                    }

                    {hasRightButton &&
                        <TouchableIcon
                            name='right-arrow2'
                            size={32}
                            color='rgba(255, 255, 255, 0.7)'
                            onPress={onRight}
                            style={{
                                position: 'absolute',
                                right: 10,
                                top: dimensions.window.height / 2,
                            }}
                        />
                    }

                </>
            }
        </ReactModal>
    )
}
