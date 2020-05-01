import * as React from 'react'
import { useState } from 'react'
import { KeyboardAvoidingView, Animated, Platform, Dimensions, TextInput, StyleSheet, View, TouchableOpacity } from 'react-native'
import SortableList, { RowProps } from 'react-native-sortable-list'
import { useKeyboard } from '@react-native-community/hooks'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { Colors } from '../../styles'
import { ImageDataView } from '../components/ImageDataView'
import { ImageData } from '../../models/ImageData'
import { TouchableView, TOUCHABLE_VIEW_DEFAULT_HIT_SLOP } from '../components/TouchableView'
import { GRID_SPACING } from '../components/GridCard'
import { launchCamera, launchImageLibrary } from '../../asyncImagePicker'
import { FloatingButton } from '../components/FloatingButton'
import { NavigationProp } from '../../navigationTypes'
import { ScreenHeader } from '../components/ScreenHeader'
import { HeaderPlaceholder } from '../components/Placeholder'

const ImagePreviewGrid = (props: {
    images: ImageData[],
    imageSize: number,
    onRemoveImage: (image: ImageData) => void,
    onReleaseRow?: (key: number, currentOrder: number[]) => void,
}) => {
    if (props.images.length === 0) {
        return null;
    }
    const doublePadding = 10
    console.log('ImagePreviewGrid', {images: props.images})
    return (
        <SortableList
            style={[{flexDirection: 'column'}, { height: props.imageSize + doublePadding }]}
            contentContainerStyle={{ padding: 5 }}
            horizontal={true}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false}
            data={props.images}
            renderRow={(rowProps: RowProps) => (
                <Item
                    data={rowProps.data}
                    active={rowProps.active}
                    imageSize={props.imageSize}
                    onRemoveImage={props.onRemoveImage}
                />
            )}
            onReleaseRow={props.onReleaseRow}
        />
    );
}

function notGreaterThan(value: number | undefined, maxValue: number) {
    return value != null && value > maxValue ? maxValue : value;
}

interface ItemProps {
    data: ImageData;
    active: boolean;
    imageSize: number;
    onRemoveImage: (image: ImageData) => void;
}

const Item = (props: ItemProps) => {
    const active = new Animated.Value(0);
    const itemStyle = {
        ...Platform.select({
            ios: {
                transform: [{
                    scale: active.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 1.1],
                    }),
                }],
            },
            android: {
                transform: [{
                    scale: active.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 1.07],
                    }),
                }],
                elevation: active.interpolate({
                    inputRange: [0, 1],
                    outputRange: [2, 6],
                }),
            },
        }),
    };

    return (
        <Animated.View
            style={[
                styles.item,
                itemStyle,
            ]}
        >
            <ImageDataView
                source={props.data}
                style={{
                    width: notGreaterThan(props.data.width, props.imageSize),
                    height: notGreaterThan(props.data.height, props.imageSize),
                }}
                // background={true}
            >
                <TouchableView
                    style={styles.delete}
                    onPress={() => props.onRemoveImage(props.data)}
                    hitSlop={{
                        top: 5,
                        left: 5,
                        bottom: 5,
                        right: 5,
                    }}
                >
                    <Icon name={'close-circle'} size={24}/>
                </TouchableView>
            </ImageDataView>
        </Animated.View>
    );
}

const PhotoWidget = React.memo((props: { onPressCamera: () => void, onPressInsert: () => void }) => {
    return (
        <View style={styles.photoWidget}
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
    );
});

const isEnabled = (enabled?: boolean) => enabled !== false

export const PostEditor = (props: {
    text: string,
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
    const onRemoveImage = () => {
    }
    const focusTextEditor = () => textEditorRef.current?.focus()
    const isPhotoWidgetEnabled = isEnabled(props.imagesEnabled)
    const floatingButtonExtraBottom = isPhotoWidgetEnabled
        ? PHOTO_WIDGET_HEIGHT + keyboard.keyboardHeight
        : keyboard.keyboardHeight
    return (
        <>
            <ScreenHeader
                title='CREATE POST'
                navigation={props.navigation}
            />
            <HeaderPlaceholder/>
            <KeyboardAvoidingView
                enabled={Platform.OS === 'ios'}
                behavior='padding'
                style={styles.container}
            >
                <ImagePreviewGrid
                    images={images}
                    imageSize={Math.floor((windowWidth - GRID_SPACING * 4) / 3)}
                    onRemoveImage={onRemoveImage}
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
                />
                {isPhotoWidgetEnabled &&
                    <PhotoWidget
                        onPressCamera={async () => {
                            const imageData = await launchCamera();
                            if (imageData != null) {
                                onAddImage(imageData)
                            }
                            focusTextEditor()
                        }}
                        onPressInsert={async () => {
                            const imageData = await launchImageLibrary();
                            if (imageData != null) {
                                onAddImage(imageData)
                            }
                            focusTextEditor()
                        }}
                    />
                }
                <FloatingButton
                    iconName='share'
                    iconSize={48}
                    onPress={() => props.onDonePress(text, images)}
                    enabled={isPostingEnabled}
                    extraBottom={floatingButtonExtraBottom}
                />
            </KeyboardAvoidingView>
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
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: Colors.WHITE,
        top: 2,
        right: 2,
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
