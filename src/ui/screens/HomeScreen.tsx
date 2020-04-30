import * as React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import { NavigationProp, RootStackNavigatorParams } from '../../navigationTypes'
import { Colors, ComponentColors } from '../../styles'
import { ActivityScreen } from './ActivityScreen'
import { SpacesScreen } from './SpacesScreen'
import { AccountScreen } from './AccountScreen'
import { createStackNavigator } from '@react-navigation/stack'
import { ViewSpaceScreen } from './ViewSpaceScreen'

const Tab = createBottomTabNavigator()

const SpacesStack = () => {
    const Stack = createStackNavigator<RootStackNavigatorParams>()
    return (
        <Stack.Navigator
            initialRouteName='Spaces'
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen
                name='Spaces'
                component={SpacesScreen}
            />
            <Stack.Screen
                name='ViewSpace'
                component={ViewSpaceScreen}
            />
        </Stack.Navigator>
    )
}

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
                component={SpacesStack}
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
