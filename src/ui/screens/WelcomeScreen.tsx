import * as React from 'react'
import { Text, TextInput } from 'react-native'
import { Colors } from '../../styles'
import { useState } from 'react'
import { NavigationProp } from '../../navigationTypes'
import { setIdentity } from '../../reducers'
import { useDispatch } from 'react-redux'
import { generateSecureRandom } from 'react-native-securerandom'
import { byteArrayToHex, HexString } from '../../hex'
import { Identity } from '../../state'
import { ec } from 'elliptic'
import { keccak256 } from 'js-sha3'

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

const createRandomIdentity = async (name: string): Promise<Identity> => {
    const identity = await generateSecureIdentity(generateSecureRandom)
    return {
        name,
        ...identity,
    }
}

export const WelcomeScreen = (props: {navigation: NavigationProp<'Welcome'>}) => {
    console.debug('WelcomeScreen', {props})
    const [name, setName] = useState('')
    const dispatch = useDispatch()
    const onDonePressed = async () => {
        const identity = await createRandomIdentity(name)
        dispatch(setIdentity(identity))
        props.navigation.replace('Home')
    }
    return (
        <>
            <Text
                style={{
                    paddingTop: 20,
                    paddingLeft: 10,
                    color: Colors.GRAY,
                }}
            >Enter your name:</Text>
            <TextInput
                style={{
                    width: '100%',
                    backgroundColor: Colors.WHITE,
                    height: 40,
                    marginTop: 10,
                    paddingHorizontal: 10,
                    fontSize: 18,
                }}
                onChangeText={text => setName(text)}
                autoFocus={true}
                autoCapitalize='none'
                autoCorrect={false}
                autoCompleteType='off'
                onSubmitEditing={onDonePressed}
                returnKeyType='done'
                enablesReturnKeyAutomatically={true}
            />
        </>
    )
}
