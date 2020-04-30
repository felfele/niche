import * as React from 'react'
import { useState, useRef } from 'react'
import { StyleSheet, Image, View, TextInput, Dimensions, Platform } from 'react-native'
import InputScrollView from 'react-native-input-scroll-view'

import { FloatingButton } from '../../components/FloatingButton'
import { NavigationProp } from '../../../navigationTypes'
import { TouchableView } from '../../components/TouchableView'
import { RegularText, BoldText } from '../../components/Text'
import { Colors, ComponentColors } from '../../../styles'
import { ScreenHeader } from '../../components/ScreenHeader'
import Icon, { CloseIcon } from '../../components/CustomIcon'
import { HeaderPlaceholder } from '../../components/Placeholder'
import { showImagePicker } from '../../../asyncImagePicker'
import { ImageData } from '../../../models/ImageData'
import { ImageDataView, isImageLocationPath } from '../../components/ImageDataView'

interface StateProps {
    navigation: NavigationProp<'Home'>
}

export const CreateSpaceScreen = (props: StateProps) => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [imageData, setImageData] = useState<ImageData | undefined>(undefined)
    const isValid = name !== '' && imageData != null
    const descriptionInputRef = useRef<TextInput>(null)
    const onDonePressed = () => {
        if (imageData != null) {
            props.navigation.navigate('CreateSpaceDone', { name, description, image: imageData })
        }
    }
    return (
        <View style={{flex: 1, flexDirection: 'column', height: '100%'}}>
            <ScreenHeader
                title='CREATE SPACE'
                navigation={props.navigation}
                leftButton={{
                    label: <CloseIcon size={40} />,
                    onPress: () => props.navigation.goBack(),
                }}
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
                        const imageData = await showImagePicker()
                        if (imageData != null) {
                            setImageData(imageData)
                        }
                    }}
                >
                    { imageData != null && isImageLocationPath(imageData.location)
                    ?
                        <ImageDataView source={imageData} style={{width: windowWidth, height: windowWidth }} />
                    :
                        <>
                            <View style={styles.coverImagePickerIconContainer}>
                                <Icon name='picture' size={48} color={Colors.LIGHTISH_GRAY} />
                            </View>
                            <BoldText style={styles.coverImagePickerLabel}>Add cover image</BoldText>
                        </>
                    }
                </TouchableView>
                <View style={styles.pageTitleContainer}>
                    <RegularText style={styles.pageTitleLabel}>Page title</RegularText>
                    <TextInput
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
                        style={styles.pageDescriptionInput}
                        placeholder='What is this page about?'
                        multiline={true}
                        numberOfLines={4}
                        returnKeyType='done'
                        blurOnSubmit={true}
                        onChangeText={text => setDescription(text)}
                        ref={descriptionInputRef}
                    ></TextInput>
                </View>
                <FloatingButton
                    iconName='arrow2_right3'
                    iconSize={48}
                    onPress={onDonePressed}
                    enabled={isValid}
                />
            </InputScrollView>
        </View>
    )
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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
