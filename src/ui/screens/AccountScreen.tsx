import * as React from 'react'
import { StyleSheet, ScrollView, Linking, Dimensions, View, TextInput } from 'react-native'
import { ScreenHeader } from '../components/ScreenHeader'
import { Colors, ComponentColors } from '../../styles'

import { RowItem } from '../components/RowButton'
import { RegularText } from '../components/Text'
import { TabBarPlaceholder, HeaderPlaceholder } from '../components/Placeholder'
import { NavigationProp } from '../../navigationTypes'
import { TouchableView } from '../components/TouchableView'
import { Button } from '../components/Button'
import { showImagePicker } from '../../asyncImagePicker'
import { ImageData } from '../../models/ImageData'
import { useDispatch, useSelector } from 'react-redux'
import { State } from '../../state'
import { setIdentity } from '../../reducers'
import { ImageDataView } from '../components/ImageDataView'

const openImagePicker = async (onUpdatePicture: (imageData: ImageData) => void) => {
    const imageData = await showImagePicker();
    if (imageData != null) {
        onUpdatePicture(imageData)
    }
}

export interface StateProps {
    navigation: NavigationProp<'Home'>
}

type Props = StateProps

export const AccountScreen = (props: Props) => {
    const windowWidth = Dimensions.get('window').width
    const dispatch = useDispatch()
    const identity = useSelector((state: State) => state.identity)
    const onUpdatePicture = (image: ImageData) => {
        const updatedIdentity = {
            ...identity,
            image,
        }
        dispatch(setIdentity(updatedIdentity))
    }
    const onUpdateName = (name: string) => {
        const updatedIdentity = {
            ...identity,
            name,
        }
        dispatch(setIdentity(updatedIdentity))
    }
    return (
        <>
            <ScreenHeader
                title='ACCOUNT'
            />
            <ScrollView style={{
                backgroundColor: ComponentColors.BACKGROUND_COLOR,
                paddingTop: 18,
            }}>
                <HeaderPlaceholder />



                <TouchableView style={styles.imagePickerContainer}
                    onPress={async () => {
                        await openImagePicker(onUpdatePicture);
                    }}
                >
                    <ImageDataView
                        source={identity.image}
                        style={{
                            width: windowWidth * 0.5,
                            height: windowWidth * 0.5,
                            borderRadius: windowWidth * 0.5,
                        }}
                    />
                    <Button
                        label='CHOOSE PICTURE'
                        onPress={async () => {
                            await openImagePicker(onUpdatePicture);
                        }}
                        style={styles.imagePickerButton}
                    />
                </TouchableView>

                <View style={styles.nameContainer}>
                    <RegularText style={styles.nameLabel}>Your name or nickname</RegularText>
                    <TextInput
                        defaultValue={identity.name}
                        style={styles.nameInput}
                        onChangeText={text => onUpdateName(text)}
                    />
                </View>

                <RowItem
                    title='View Terms & Privacy Policy'
                    buttonStyle='navigate'
                    onPress={() => Linking.openURL('https://felfele.org/legal')}
                />
                <RowItem
                    title='Send bug report'
                    buttonStyle='navigate'
                    onPress={() => props.navigation.navigate('Home')}
                />
                <RowItem
                    title='Debug'
                    buttonStyle='navigate'
                    onPress={() => props.navigation.navigate('Debug')}
                />

                <TabBarPlaceholder/>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    label: {
        paddingHorizontal: 9,
        paddingTop: 9,
        paddingBottom: 18,
        color: Colors.GRAY,
    },
    versionLabel: {
        color: ComponentColors.HINT_TEXT_COLOR,
        paddingTop: 8,
        paddingBottom: 10,
        paddingLeft: 10,
        fontSize: 14,
    },
    imagePickerContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        alignSelf: 'center',
    },
    imagePickerButton: {
        marginVertical: 18,
    },
    nameContainer: {
        padding: 18,
        width: '100%',
        height: 83,
        backgroundColor: Colors.WHITE,
        borderBottomColor: Colors.BLACK + '33',
        borderBottomWidth: 1,
        marginBottom: 60,
    },
    nameLabel: {
        fontSize: 12,
        color: Colors.GRAY,
    },
    nameInput: {
        paddingTop: 9,
        fontSize: 18,
    },

});
