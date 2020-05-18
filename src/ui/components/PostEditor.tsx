import * as React from 'react'
import { useState } from 'react'
import { KeyboardAvoidingView, Platform, Dimensions, TextInput, StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
// @ts-ignore
import PhotoGrid from 'react-native-thumbnail-grid'

import { Colors } from '../../styles'
import { getImageDataURI } from '../components/ImageDataView'
import { ImageData } from '../../models/ImageData'
import { TOUCHABLE_VIEW_DEFAULT_HIT_SLOP } from '../components/TouchableView'
import { launchCamera, launchImageLibrary } from '../../asyncImagePicker'
import { FloatingButton, FullscreenFloatingButton } from '../components/FloatingButton'
import { NavigationProp } from '../../navigationTypes'
import { ScreenHeader } from '../components/ScreenHeader'
import { HeaderPlaceholder } from '../components/Placeholder'
import { CloseIcon } from './CustomIcon'
import { useSafeArea } from 'react-native-safe-area-view'

const PhotoWidget = (props: { onPressCamera: () => void, onPressInsert: () => void }) => {
    const paddingBottom = useSafeArea().bottom
    return (
        <View style={{
            ...styles.photoWidget,
            height: paddingBottom + PHOTO_WIDGET_HEIGHT,
            paddingBottom,
        }}
        >
            <TouchableOpacity
                onPress={props.onPressCamera}
                hitSlop={TOUCHABLE_VIEW_DEFAULT_HIT_SLOP}
            >
                <Icon
                    name={'camera'}
                    size={24}
                    color={Colors.BLACK}
                />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={props.onPressInsert}
                hitSlop={TOUCHABLE_VIEW_DEFAULT_HIT_SLOP}
            >
                <Icon
                    name={'image-multiple'}
                    size={24}
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
    const isPostingEnabled = text !== '' || images.length > 0
    const onAddImage = (image: ImageData) => {
        const updatedImages = [...images, image]
        setImages(updatedImages)
    }
    const isPhotoWidgetEnabled = isEnabled(props.imagesEnabled)
    const rightButtonLabel = props.mode === 'create'
        ? 'Post'
        : 'Edit'
    return (
        <>
            <ScreenHeader
                title={props.title}
                navigation={props.navigation}
                leftButton={{
                    label: <CloseIcon size={40} />,
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
                style={styles.container}
            >
                <ScrollView>

                    <PhotoGrid
                        source={images.map(image => getImageDataURI(image.location))}
                        width={windowWidth}
                        style={{
                            paddingHorizontal: 9,
                        }}
                        imageStyle={{
                            borderWidth: 3,
                        }}
                        textStyles={{
                            fontSize: 18,
                            fontWeight: 'bold',
                        }}
                        onPressImage={() => {}}
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
            {isPostingEnabled &&
                <FullscreenFloatingButton
                    iconName='share'
                    iconSize={48}
                    onPress={() => props.onDonePress(text, images)}
                    extraBottom={PHOTO_WIDGET_HEIGHT}
                />
            }
        </>
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
