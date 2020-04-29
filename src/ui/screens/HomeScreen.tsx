import * as React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import { NavigationProp } from '../../navigationTypes'
import { Colors, ComponentColors } from '../../styles'
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
                style: {
                    backgroundColor: ComponentColors.BACKGROUND_COLOR,
                }
            }}
        >
            <Tab.Screen
                name="Activity"
                component={ActivityScreen}
                options={{
                    tabBarIcon: ({focused, color, size}) =>
                        <MaterialCommunityIcon
                            name={'bell-outline'}
                            size={size}
                            color={color}
                        />,
                }}
            />
            <Tab.Screen
                name="Spaces"
                component={SpacesScreen}
                options={{
                    tabBarIcon: ({focused, color, size}) =>
                        <MaterialCommunityIcon
                            name={'earth'}
                            size={size}
                            color={color}
                        />,
                }}
            />
            <Tab.Screen
                name="Account"
                component={AccountScreen}
                options={{
                    tabBarIcon: ({focused, color, size}) =>
                        <MaterialCommunityIcon
                            name={'fingerprint'}
                            size={size}
                            color={color}
                        />,
                }}
            />
        </Tab.Navigator>
    )
}
