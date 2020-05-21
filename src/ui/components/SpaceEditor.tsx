import * as React from 'react'
import { useState, useRef } from 'react'
import { StyleSheet, View, TextInput, Dimensions } from 'react-native'
import InputScrollView from 'react-native-input-scroll-view'

import { FullscreenFloatingButton } from './FloatingButton'
import { NavigationProp } from '../../navigationTypes'
import { TouchableView } from './TouchableView'
import { RegularText, BoldText } from './Text'
import { Colors, ComponentColors } from '../../styles'
import { ScreenHeader } from './ScreenHeader'
import { CustomIcon, CloseIcon } from './CustomIcon'
import { HeaderPlaceholder } from './Placeholder'
import { showImagePicker } from '../../asyncImagePicker'
import { ImageData } from '../../models/ImageData'
import { ImageDataView, isImageLocationPath } from './ImageDataView'
import { useKeyboard } from '@react-native-community/hooks'

interface StateProps {
    navigation: NavigationProp<'Home'>
    mode: 'create' | 'update'
    title: string
    name: string
    description: string
    coverImage?: ImageData
    editable?: boolean
    onDonePressed?: (title: string, description: string, image: ImageData) => void
}

const isEditable = (editable?: boolean) => editable !== false

export const SpaceEditor = (props: StateProps) => {
    const [name, setName] = useState(props.name)
    const [description, setDescription] = useState(props.description)
    const [imageData, setImageData] = useState<ImageData | undefined>(props.coverImage)
    const isValid = name !== '' && imageData != null
    const descriptionInputRef = useRef<TextInput>(null)
    const keyboard = useKeyboard()
    const onDonePressed = () => {
        if (imageData != null && props.onDonePressed != null && isValid) {
            props.onDonePressed(name, description, imageData)
        }
    }
    const floatingButtonIconName = props.mode === 'create'
        ? 'right-arrow4'
        : 'check'
    return (
        <View style={{flex: 1, flexDirection: 'column', height: '100%'}}>
            <ScreenHeader
                title={props.title}
                navigation={props.navigation}
                leftButton={{
                    label: <CloseIcon size={40} />,
                    onPress: () => props.navigation.goBack(),
                }}
                rightButton={props.onDonePressed != null
                    ? {
                        label: 'Done',
                        onPress: onDonePressed,
                        disabled: !isValid,
                    }
                    : undefined
                }
            />
            <InputScrollView
                style={styles.scrollContainer}
                keyboardDismissMode='interactive'
                keyboardShouldPersistTaps='handled'
            >
                <HeaderPlaceholder/>
                <TouchableView
                    style={styles.coverImagePickerContainer}
                    onPress={async () => {
                        if (!isEditable(props.editable)) {
                            return
                        }
                        const imageData = await showImagePicker()
                        if (imageData != null) {
                            setImageData(imageData)
                        }
                    }}
                >
                    { imageData != null && isImageLocationPath(imageData.location)
                    ?
                        <ImageDataView
                            source={imageData}
                            style={{
                                width: windowWidth,
                                height: windowWidth,
                                resizeMode: 'cover',
                            }}
                        />
                    :
                        <>
                            <View style={styles.coverImagePickerIconContainer}>
                                <CustomIcon name='picture' size={48} color={Colors.LIGHTISH_GRAY} />
                            </View>
                            <BoldText style={styles.coverImagePickerLabel}>Add cover image</BoldText>
                        </>
                    }
                </TouchableView>
                <View style={styles.pageTitleContainer}>
                    <RegularText style={styles.pageTitleLabel}>Page title</RegularText>
                    <TextInput
                        editable={isEditable(props.editable)}
                        defaultValue={name}
                        style={styles.pageTitleInput}
                        placeholder='Your title'
                        enablesReturnKeyAutomatically={true}
                        returnKeyType='next'
                        blurOnSubmit={false}
                        onChangeText={text => setName(text)}
                        onSubmitEditing={() => descriptionInputRef.current?.focus()}
                        autoCorrect={false}
                        autoCompleteType='off'
                    ></TextInput>
                </View>
                <View style={styles.pageDescriptionContainer}>
                    <RegularText style={styles.pageDescriptionLabel}>Description (optional)</RegularText>
                    <TextInput
                        editable={isEditable(props.editable)}
                        defaultValue={description}
                        style={styles.pageDescriptionInput}
                        placeholder='What is this page about?'
                        multiline={true}
                        numberOfLines={4}
                        returnKeyType='done'
                        blurOnSubmit={true}
                        onChangeText={text => setDescription(text)}
                        onSubmitEditing={onDonePressed}
                        ref={descriptionInputRef}
                    ></TextInput>
                </View>
            </InputScrollView>
            {isValid && props.onDonePressed != null && !keyboard.keyboardShown &&
                <FullscreenFloatingButton
                    iconName={floatingButtonIconName}
                    onPress={onDonePressed}
                />
            }
        </View>
    )
}

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: ComponentColors.BACKGROUND_COLOR,
    },
    scrollContainer: {
        flex: 1,
        flexDirection: 'column',
        shadowColor: Colors.BLACK,
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 0,
            height: 0.2,
        },
        shadowRadius: 0.5,
    },
    coverImagePickerContainer: {
        width: windowWidth,
        height: windowWidth,
        backgroundColor: Colors.LIGHT_GRAY,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    coverImagePickerIconContainer: {
        width: 48,
        height: 48,
    },
    coverImagePickerLabel: {
        fontSize: 14,
        color: Colors.LIGHTISH_GRAY,
    },
    pageTitleContainer: {
        backgroundColor: Colors.WHITE,
        borderBottomColor: Colors.LIGHTER_GRAY,
        borderBottomWidth: 0.5,
    },
    pageTitleLabel: {
        paddingTop: 18,
        paddingLeft: 9,
        fontSize: 12,
        color: ComponentColors.LABEL_COLOR,
    },
    pageTitleInput: {
        paddingTop: 10,
        paddingLeft: 9,
        paddingBottom: 18,
        fontSize: 18,
        color: ComponentColors.TEXT_COLOR,
    },
    pageDescriptionContainer: {
        backgroundColor: Colors.WHITE,
        borderBottomColor: Colors.LIGHTER_GRAY,
        borderBottomWidth: 0.5,
    },
    pageDescriptionLabel: {
        paddingTop: 18,
        paddingLeft: 9,
        fontSize: 12,
        color: ComponentColors.LABEL_COLOR,
    },
    pageDescriptionInput: {
        paddingTop: 10,
        paddingLeft: 9,
        paddingBottom: 18,
        fontSize: 18,
        color: ComponentColors.TEXT_COLOR,
        height: 160,
    },

});
