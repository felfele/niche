import * as React from 'react'
import { View } from 'react-native'

import { FloatingButton } from '../../components/FloatingButton'
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
        props.navigation.navigate('Home')
        const id = byteArrayToHex(await generateSecureRandom(32))
        dispatch(addSpace({id, name, description, coverImage: image, posts: []}))
    }
    return (
        <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
            <ScreenHeader
                title='DONE'
                navigation={props.navigation}
            />
            <HeaderPlaceholder extraHeight={25} />
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
            <FloatingButton
                iconName='arrow2_right3'
                iconSize={48}
                onPress={onDonePressed}
            />

        </View>
    )
}

