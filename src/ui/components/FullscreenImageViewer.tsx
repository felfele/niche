import * as React from 'react'
import { View, Text, StatusBar, Platform } from 'react-native'
import ImageViewer from 'react-native-image-zoom-viewer'
import Orientation from 'react-native-orientation-locker'
import Modal from 'react-native-modal'
import PhotoView from "@merryjs/photo-viewer";

import { ImageData } from '../../models/ImageData'
import { getImageDataURI } from './ImageDataView'
import { TouchableView } from './TouchableView'
import { Colors } from '../../styles'
import { useSafeArea } from 'react-native-safe-area-context'
import { useDeviceOrientation, useDimensions } from '@react-native-community/hooks'
import { useState, useEffect } from 'react'
import { OverlayIcon } from './OverlayIcon'

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

export const FullscreenImageViewerWithPhotoView = (props: {
    visible: boolean,
    index: number,
    onCancel: () => void,
    images: ImageData[],
    menuItems: BottomMenuItem[],
}) => {
    const imageUrls = props.images.map(image => ({
        source: {
            uri: getImageDataURI(image.location),
            width: image.width,
            height: image.height,
        }
    }))
    const onDismiss = () => {
        console.log('FullscreenImageViewerWithPhotoView', 'onDismiss')
        Orientation.lockToPortrait()
        props.onCancel()
    }
    useEffect(() => {
        console.log('FullscreenImageViewerWithPhotoView', 'useEffect', {props})
        if (props.visible) {
            Orientation.unlockAllOrientations()
        }
    }, [props.visible])
    return (
        <PhotoView
            visible={props.visible}
            data={imageUrls}
            hideStatusBar={true}
            initial={props.index}
            onDismiss={onDismiss}
            hideShareButton={true}
        />
    )
 }

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
    const orientation = useDeviceOrientation()
    const imageUrls = props.images.map(image => ({
        url: getImageDataURI(image.location),
        width: image.width,
        height: image.height,
    }))
    const safeArea = useSafeArea()
    const dimensions = useDimensions()
    const [areControlsVisible, setControlsVisible] = useState(orientation.portrait)
    const [index, setIndex] = useState(props.index)
    const onLeft = () => setIndex(index - 1)
    const onRight = () => setIndex(index + 1)
    const hasLeftButton = index > 0
    const hasRightButton = index < imageUrls.length - 1
    const onCancel = () => {
        Orientation.lockToPortrait()
        props.onCancel()
    }
    useEffect(() => {
        if (props.visible) {
            Orientation.unlockAllOrientations()
        }
    }, [props.visible])
    useEffect(() => {
        setIndex(props.index)
    }, [props.index])
    useEffect(() => {
        if (orientation.landscape) {
            setControlsVisible(false)
        }
    }, [orientation])
    console.log('FullscreenImageViewer', {index, props, images: props.images, orientation})
    return (
        <Modal
            isVisible={props.visible}
            animationIn='fadeIn'
            style={{
                flex: 1,
                margin: 0,
                padding: 0,
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                backgroundColor: Colors.BLACK,
                zIndex: 1000,
            }}
        >
            <StatusBar
                hidden={Platform.OS === 'ios' ? true : false}
                backgroundColor={Colors.BLACK}
                animated={true}
            />
            <ImageViewer
                imageUrls={imageUrls}
                enableSwipeDown={true}
                onCancel={onCancel}
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
                    <OverlayIcon
                        name='no'
                        size={32}
                        color='rgba(255, 255, 255, 0.9)'
                        onPress={onCancel}
                        style={{
                            position: 'absolute',
                            left: safeArea.left + 10,
                            top: safeArea.top + 10,
                            paddingLeft: 1,
                            backgroundColor: 'rgba(0, 0, 0, 0)',
                        }}
                    />

                    {hasLeftButton &&
                        <OverlayIcon
                            name='left-arrow2'
                            size={32}
                            color='rgba(255, 255, 255, 0.7)'
                            onPress={onLeft}
                            style={{
                                position: 'absolute',
                                left: safeArea.left + 10,
                                top: dimensions.screen.height / 2,
                            }}
                        />
                    }

                    {hasRightButton &&
                        <OverlayIcon
                            name='right-arrow2'
                            size={32}
                            color='rgba(255, 255, 255, 0.7)'
                            onPress={onRight}
                            style={{
                                position: 'absolute',
                                right: safeArea.right + 10,
                                top: dimensions.screen.height / 2,
                            }}
                        />
                    }

                </>
            }
        </Modal>
    )
}
