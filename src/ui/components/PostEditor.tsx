import * as React from 'react'
import { useState } from 'react'
import {
    KeyboardAvoidingView,
    Platform,
    Dimensions,
    TextInput,
    StyleSheet,
    View,
    TouchableOpacity,
    ScrollView,
    Image,
    ImageProps,
    ImageSourcePropType,
} from 'react-native'

import { Colors } from '../../styles'
import { getImageDataURI } from '../components/ImageDataView'
import { ImageData } from '../../models/ImageData'
import { TOUCHABLE_VIEW_DEFAULT_HIT_SLOP } from '../components/TouchableView'
import { launchCamera, launchImageLibrary } from '../../asyncImagePicker'
import { FloatingButton, FullscreenFloatingButton } from '../components/FloatingButton'
import { NavigationProp } from '../../navigationTypes'
import { ScreenHeader } from '../components/ScreenHeader'
import { HeaderPlaceholder } from '../components/Placeholder'
import { CloseIcon, CustomIcon } from './CustomIcon'
import { useSafeArea } from 'react-native-safe-area-view'
import { useKeyboard } from '@react-native-community/hooks'
import { PhotoGrid } from './PhotoGrid'
import { OverlayIcon } from './OverlayIcon'

const PhotoWidget = (props: { onPressCamera: () => void, onPressInsert: () => void }) => {
    return (
        <View style={styles.photoWidget}
        >
            <TouchableOpacity
                onPress={props.onPressCamera}
                hitSlop={TOUCHABLE_VIEW_DEFAULT_HIT_SLOP}
            >
                <CustomIcon
                    name={'camera'}
                    size={32}
                    color={Colors.BLACK}
                />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={props.onPressInsert}
                hitSlop={TOUCHABLE_VIEW_DEFAULT_HIT_SLOP}
            >
                <CustomIcon
                    name={'picture'}
                    size={32}
                    color={Colors.BLACK}
                />
            </TouchableOpacity>
        </View>
    )
}

const isEnabled = (enabled?: boolean) => enabled !== false

export const PostEditor = (props: {
    title: string,
    text: string,
    mode: 'create' | 'update',
    images: ImageData[],
    imagesEnabled?: boolean,
    navigation: NavigationProp<'Home'>,
    onDonePress: (text: string, images: ImageData[]) => void,
}) => {
    const [text, setText] = useState(props.text)
    const [images, setImages] = useState(props.images)
    const windowWidth = Dimensions.get('window').width
    const textEditorRef = React.useRef<TextInput>(null)
    const keyboard = useKeyboard()
    const isPostingEnabled = text !== '' || images.length > 0
    const onAddImage = (image: ImageData) => {
        const updatedImages = [...images, image]
        setImages(updatedImages)
    }
    const onRemoveImage = (source: ImageSourcePropType) => {
        const uri = (source as {uri: string}).uri
        const imageIndex = images.findIndex(image => uri === getImageDataURI(image.location))
        if (imageIndex >= 0) {
            const updatedImages = [...images]
            updatedImages.splice(imageIndex, 1)
            setImages(updatedImages)
        }
    }
    const isPhotoWidgetEnabled = isEnabled(props.imagesEnabled)
    const rightButtonLabel = props.mode === 'create'
        ? 'Post'
        : 'Edit'
    const paddingBottom = useSafeArea().bottom
    return (
        <View style={{flexDirection: 'column', height: '100%'}}>
            <ScreenHeader
                title={props.title}
                navigation={props.navigation}
                leftButton={{
                    label: <CloseIcon size={36} />,
                    onPress: () => props.navigation.goBack(),
                }}
                rightButton={{
                    label: rightButtonLabel,
                    onPress: () => props.onDonePress(text, images),
                    disabled: !isPostingEnabled,
                }}
            />
            <HeaderPlaceholder/>
            <KeyboardAvoidingView
                enabled={Platform.OS === 'ios'}
                behavior='padding'
                style={{
                    ...styles.container,
                }}
            >
                <ScrollView
                    keyboardShouldPersistTaps='handled'
                >

                    <PhotoGrid
                        source={images.map(image => getImageDataURI(image.location))}
                        width={windowWidth}
                        style={{
                            paddingHorizontal: 0,
                            margin: 0,
                        }}
                        imageStyle={{
                            padding: 0,
                            margin: 0,
                            borderWidth: 3,
                        }}
                        textStyles={{
                            fontSize: 18,
                            fontWeight: 'bold',
                        }}
                        onPressImage={() => {}}
                        ImageComponent={(props: ImageProps) =>
                            <>
                                <Image {...props} />
                                <OverlayIcon
                                    name='no2'
                                    size={32}
                                    color='rgba(255, 255, 255, 0.9)'
                                    onPress={() => onRemoveImage(props.source)}
                                    style={{
                                        position: 'absolute',
                                        right: 10,
                                        top: 10,
                                        paddingLeft: 1,
                                    }}
                                />
                            </>
                        }
                    />

                    <TextInput
                        style={styles.textInput}
                        multiline={true}
                        numberOfLines={4}
                        onChangeText={value => setText(value)}
                        defaultValue={text}
                        placeholder="What's up, Doc?"
                        placeholderTextColor='gray'
                        underlineColorAndroid='transparent'
                        autoFocus={true}
                        blurOnSubmit={false}
                        testID='PostEditor/TextInput'
                        ref={textEditorRef}
                        scrollEnabled={false}
                    >
                    </TextInput>
                    <View style={{height: PHOTO_WIDGET_HEIGHT}}></View>

                </ScrollView>
                {isPhotoWidgetEnabled &&
                    <PhotoWidget
                        onPressCamera={async () => {
                            const imageData = await launchCamera();
                            if (imageData != null) {
                                onAddImage(imageData)
                            }
                        }}
                        onPressInsert={async () => {
                            const imageData = await launchImageLibrary();
                            if (imageData != null) {
                                onAddImage(imageData)
                            }
                        }}
                    />
                }
            </KeyboardAvoidingView>
            <View style={{height: paddingBottom, backgroundColor: Colors.WHITE}}></View>
            {isPostingEnabled && !keyboard.keyboardShown &&
                <FullscreenFloatingButton
                    iconName='share'
                    onPress={() => props.onDonePress(text, images)}
                    extraBottom={PHOTO_WIDGET_HEIGHT}
                />
            }
        </View>
    )
}

const PHOTO_WIDGET_HEIGHT = 50

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.WHITE,
        flex: 1,
        flexDirection: 'column',
    },
    debug: {
        borderWidth: 1,
        borderColor: 'magenta',
    },
    gridContainer: {
        flexDirection: 'column',
    },
    delete: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        width: 23,
        height: 23,
        borderRadius: 12,
        borderWidth: 0,
        backgroundColor: Colors.WHITE,
        top: 8,
        right: 8,
    },
    item: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: Colors.WHITE,
        padding: 5,
    },
    textInput: {
        flex: 1,
        fontSize: 18,
        margin: 10,
        textAlignVertical: 'top',
        paddingBottom: PHOTO_WIDGET_HEIGHT * 2,
    },
    photoWidget: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: 'lightgray',
        height: PHOTO_WIDGET_HEIGHT,
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
    },
});
