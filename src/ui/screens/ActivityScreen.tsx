import * as React from 'react'
import { View, ScrollView } from 'react-native'
import { NavigationProp } from '../../navigationTypes'
import { ScreenHeader } from '../components/ScreenHeader'
import { HeaderPlaceholder, TabBarPlaceholder } from '../components/Placeholder'
import { ComponentColors } from '../../styles'

export const ActivityScreen = (props: {navigation: NavigationProp<'Home'>}) => {
    return (
        <>
            <ScreenHeader
                title='Activity'
            />
            <ScrollView style={{
                backgroundColor: ComponentColors.BACKGROUND_COLOR,
                paddingTop: 18,
            }}>
                <HeaderPlaceholder />


                <TabBarPlaceholder/>
            </ScrollView>
        </>
    )
}
