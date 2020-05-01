import * as React from 'react'
import { Text, TextInput, View, Dimensions } from 'react-native'
import { Colors } from '../../styles'
import { useState } from 'react'
import { NavigationProp } from '../../navigationTypes'
import { setIdentity } from '../../reducers'
import { useDispatch } from 'react-redux'
import { generateSecureRandom } from 'react-native-securerandom'
import { byteArrayToHex, HexString } from '../../hex'
import { Identity, defaultImage } from '../../state'
import { ec } from 'elliptic'
import { keccak256 } from 'js-sha3'
import { ScreenHeader } from '../components/ScreenHeader'
import { HeaderPlaceholder } from '../components/Placeholder'
import { TouchableView } from '../components/TouchableView'
import { Button } from '../components/Button'
import { RegularText } from '../components/Text'
import { showImagePicker } from '../../asyncImagePicker'
import { ImageData } from '../../models/ImageData'
import { ImageDataView } from '../components/ImageDataView'

function publicKeyToAddress(pubKey: any) {
    const pubBytes = pubKey.encode()
    return keccak256.array(pubBytes.slice(1)).slice(12)
}

interface PrivateIdentity {
    privateKey: HexString
    publicKey: HexString
    address: HexString
}

export const generateSecureIdentity = async (generateRandom: (length: number) => Promise<Uint8Array>): Promise<PrivateIdentity> => {
    const secureRandomUint8Array = await generateRandom(32)
    const secureRandom = byteArrayToHex(secureRandomUint8Array).substring(2)
    const curve = new ec('secp256k1')
    const keyPair = curve.genKeyPair({
        entropy: secureRandom,
        entropyEnc: 'hex',
        pers: undefined,
    })
    const privateKey = '0x' + keyPair.getPrivate('hex') as HexString
    const publicKey = '0x' + keyPair.getPublic(true, 'hex') as HexString
    const address = byteArrayToHex(publicKeyToAddress(keyPair.getPublic()))
    return {
        privateKey,
        publicKey,
        address,
    }
}

const createRandomIdentity = async (name: string): Promise<PrivateIdentity> => {
    return await generateSecureIdentity(generateSecureRandom)
}

const openImagePicker = async (onUpdatePicture: (imageData: ImageData) => void) => {
    const imageData = await showImagePicker();
    if (imageData != null) {
        onUpdatePicture(imageData)
    }
}

export const WelcomeScreen = (props: {navigation: NavigationProp<'Welcome'>}) => {
    const windowWidth = Dimensions.get('window').width
    const [name, setName] = useState('')
    const [image, setImage] = useState(defaultImage)
    const dispatch = useDispatch()
    const onDonePressed = async () => {
        const privateIdentity = await createRandomIdentity(name)
        const identity = {
            ...privateIdentity,
            name,
            image,
        }
        dispatch(setIdentity(identity))
        props.navigation.replace('Home')
    }
    const onUpdatePicture = (updatedImage: ImageData) => {
        setImage(updatedImage)
    }
    return (
        <>
            <ScreenHeader
                title='CREATE ACCOUNT'
            />
            <HeaderPlaceholder/>
            <TouchableView
                style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    alignSelf: 'center',
                }}
                onPress={async () => {
                    await openImagePicker(onUpdatePicture);
                }}
            >
                <ImageDataView
                    source={image}
                    style={{
                        width: windowWidth * 0.5,
                        height: windowWidth * 0.5,
                        borderRadius: windowWidth * 0.5,
                        resizeMode: 'cover',
                    }}
                />
                <Button
                    label='CHOOSE PICTURE'
                    onPress={async () => {
                        await openImagePicker(onUpdatePicture);
                    }}
                    style={{
                        marginVertical: 18,
                    }}
                />
            </TouchableView>

            <View
                style={{
                    padding: 18,
                    width: '100%',
                    height: 83,
                    backgroundColor: Colors.WHITE,
                    borderBottomColor: Colors.BLACK + '33',
                    borderBottomWidth: 1,
                    marginBottom: 60,
                }}
            >
                <RegularText
                    style={{
                        fontSize: 12,
                        color: Colors.GRAY,
                    }}
                >Your name or nickname</RegularText>
                <TextInput
                    placeholder='e.g. “John” or “Daddy”'
                    style={{
                        paddingTop: 9,
                        fontSize: 18,
                    }}
                    autoFocus={true}
                    autoCapitalize='none'
                    autoCorrect={false}
                    autoCompleteType='off'
                    onSubmitEditing={onDonePressed}
                    onChangeText={text => setName(text)}
                    returnKeyType='done'
                    enablesReturnKeyAutomatically={true}
                />
            </View>
        </>
    )
}
