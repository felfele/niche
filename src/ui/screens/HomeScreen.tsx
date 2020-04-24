import * as React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { NavigationProp } from '../../navigationTypes'
import { Colors } from '../../styles'
import { ActivityScreen } from './ActivityScreen'
import { SpacesScreen } from './SpacesScreen'
import { AccountScreen } from './AccountScreen'

const Tab = createBottomTabNavigator();

export const HomeScreen = (props: {navigation: NavigationProp<'Home'>}) => {
    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: Colors.BLACK,
                inactiveTintColor: Colors.LIGHTISH_GRAY,
            }}
        >
            <Tab.Screen name="Activity" component={ActivityScreen} />
            <Tab.Screen name="Spaces" component={SpacesScreen} />
            <Tab.Screen name="Account" component={AccountScreen} />
        </Tab.Navigator>
    )
}
