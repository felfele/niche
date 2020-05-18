import * as React from 'react'
import { View } from 'react-native'

import { FullscreenFloatingButton } from '../../components/FloatingButton'
import { NavigationProp, RouteProp } from '../../../navigationTypes'
import { RegularText, BoldText } from '../../components/Text'
import { ScreenHeader } from '../../components/ScreenHeader'
import { HeaderPlaceholder } from '../../components/Placeholder'
import { GridCard, calculateGridCardSize } from '../../components/GridCard'
import { useDispatch } from 'react-redux'
import { addSpace } from '../../../reducers'
import { generateSecureRandom } from 'react-native-securerandom'
import { byteArrayToHex } from '../../../hex'

interface StateProps {
    navigation: NavigationProp<'Home'>
    route: RouteProp<'CreateSpaceDone'>
}

export const CreateSpaceDoneScreen = (props: StateProps) => {
    const { name, description, image } = props.route.params
    const dispatch = useDispatch()
    const onDonePressed = async () => {
        const id = byteArrayToHex(await generateSecureRandom(32))
        dispatch(addSpace({id, name, description, coverImage: image, posts: []}))
        // Not nice, but this is what's recommended by the documentation
        // in case you want to go back to the parent navigator:
        // https://reactnavigation.org/docs/navigation-prop/#dangerouslygetparent
        props.navigation.dangerouslyGetParent()?.goBack()
    }
    return (
        <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
            <ScreenHeader
                title='Create Space'
                navigation={props.navigation}
                rightButton={{
                    label: 'Done',
                    onPress: onDonePressed,
                }}
            />
            <HeaderPlaceholder/>
            <BoldText style={{
                fontSize: 18,
                marginTop: 18,
            }}
            >All set!</BoldText>
            <RegularText
                style={{
                    fontSize: 14,
                    marginTop: 5,
                    marginBottom: 18,
                }}
            >You can go your space and post something nice.</RegularText>
            <GridCard
                title={name}
                onPress={onDonePressed}
                isSelected={false}
                size={calculateGridCardSize()}
                image={image}
            />
            <FullscreenFloatingButton
                iconName='check'
                iconSize={48}
                onPress={onDonePressed}
            />

        </View>
    )
}

