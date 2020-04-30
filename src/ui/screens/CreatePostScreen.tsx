import * as React from 'react'
import { KeyboardAvoidingView, Animated, Platform, Dimensions, TextInput, StyleSheet, View, TouchableOpacity } from 'react-native'
import SortableList, { RowProps } from 'react-native-sortable-list'
import { Colors } from '../../styles'
import { ImageDataView } from '../components/ImageDataView'
import { ImageData } from '../../models/ImageData'
import { TouchableView, TOUCHABLE_VIEW_DEFAULT_HIT_SLOP } from '../components/TouchableView'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useState } from 'react'
import { GRID_SPACING } from '../components/GridCard'
import { launchCamera, launchImageLibrary } from '../../asyncImagePicker'
import { Post, State } from '../../state'
import { FloatingButton } from '../components/FloatingButton'
import { NavigationProp, RouteProp } from '../../navigationTypes'
import { ScreenHeader } from '../components/ScreenHeader'
import { HeaderPlaceholder } from '../components/Placeholder'
import { useDispatch, useSelector } from 'react-redux'
import { addPostToSpace } from '../../reducers'
import { HexString } from 'src/hex'

const ImagePreviewGrid = (props: {
    images: ImageData[],
    imageSize: number,
    onRemoveImage: (image: ImageData) => void,
    onReleaseRow: (key: number, currentOrder: number[]) => void,
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


export const CreatePostScreen = (props: {navigation: NavigationProp<'Home'>, route: RouteProp<'CreatePost'>}) => {
    const identity = useSelector((state: State) => state.identity)
    const [post, setPost] = useState<Post>({
        id: '' + Date.now() as HexString,
        text: '',
        createdAt: Date.now(),
        images: [],
        author: {
            name: identity.name,
            address: identity.address,
            image: identity.image,
        },
        comments: [],
    })
    const spaceId = props.route.params.spaceId
    const textEditorRef = React.useRef<TextInput>(null)
    const dispatch = useDispatch()
    const windowWidth = Dimensions.get('window').width
    const onRemoveImage = () => {

    }
    const addImage = (image: ImageData) => {
        const updatedPost = {
            ...post,
            images: [...post.images, image],
        }
        setPost(updatedPost)
        textEditorRef.current?.focus()
    }
    console.log('CreatePostScreen', {post})
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
                    images={post.images}
                    imageSize={Math.floor((windowWidth - GRID_SPACING * 4) / 3)}
                    onRemoveImage={onRemoveImage}
                    onReleaseRow={(_, order: number[]) => {
                        setPost({
                            ...post,
                            images: order.map(i => post.images[i]),
                        });
                        textEditorRef.current?.focus()
                    }}
                />
                <TextInput
                    style={styles.textInput}
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={text => { post.text = text; setPost(post)}}
                    defaultValue={post.text}
                    placeholder="What's up, Doc?"
                    placeholderTextColor='gray'
                    underlineColorAndroid='transparent'
                    autoFocus={true}
                    blurOnSubmit={false}
                    testID='PostEditor/TextInput'
                    ref={textEditorRef}
                />
                <PhotoWidget
                    onPressCamera={async () => {
                        const imageData = await launchCamera();
                        if (imageData != null) {
                            addImage(imageData)
                        }
                    }}
                    onPressInsert={async () => {
                        const imageData = await launchImageLibrary();
                        if (imageData != null) {
                            addImage(imageData)
                        }
                    }}
                />
                <FloatingButton
                    iconName='plus'
                    iconSize={48}
                    onPress={() => {
                        dispatch(addPostToSpace({spaceId, post}))
                        props.navigation.goBack()}
                    }
                />
            </KeyboardAvoidingView>
        </>
    )
}

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
        height: 50,
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
    },
});
