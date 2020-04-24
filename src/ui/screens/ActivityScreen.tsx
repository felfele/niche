import * as React from 'react'
import { View } from 'react-native'
import { NavigationProp } from '../../navigationTypes'
import { ScreenHeader } from '../components/ScreenHeader'

export const ActivityScreen = (props: {navigation: NavigationProp<'Home'>}) => {
    return (
        <ScreenHeader
            title='ACTIVITY'
        />
    )
}
