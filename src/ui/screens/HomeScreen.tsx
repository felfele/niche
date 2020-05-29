import * as React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { NavigationProp, RootStackNavigatorParams } from '../../navigationTypes'
import { Colors, ComponentColors } from '../../styles'
import { ActivityScreen } from './ActivityScreen'
import { SpacesScreen } from './SpacesScreen'
import { AccountScreen } from './AccountScreen'
import { createStackNavigator } from '@react-navigation/stack'
import { ViewSpaceScreen } from './ViewSpaceScreen'
import { CustomIcon } from '../components/CustomIcon'
import { DebugScreen } from './DebugScreen'
import { FeatureSwitcherScreen } from './FeatureSwitcherScreen'

const Tab = createBottomTabNavigator()

const SpacesStackNavigator = () => {
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

const AccountStackNavigator = () => {
    const Stack = createStackNavigator<RootStackNavigatorParams>()
    return (
        <Stack.Navigator
            initialRouteName='Account'
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen
                name='Account'
                component={AccountScreen}
            />
            <Stack.Screen
                name='Debug'
                component={DebugScreen}
            />
            <Stack.Screen
                name='FeatureSwitcher'
                component={FeatureSwitcherScreen}
            />

        </Stack.Navigator>
    )

}

export const HomeScreen = (props: {navigation: NavigationProp<'Home'>}) => {
    return (
        <Tab.Navigator
            initialRouteName='Spaces'
            tabBarOptions={{
                activeTintColor: Colors.BLACK,
                inactiveTintColor: Colors.LIGHTISH_GRAY,
                style: {
                    backgroundColor: ComponentColors.TAB_BAR_COLOR,
                    elevation: 1,
                }
            }}
        >
            <Tab.Screen
                name='Activity'
                component={ActivityScreen}
                options={{
                    tabBarIcon: ({focused, color, size}) =>
                        <CustomIcon
                            name={'bell'}
                            size={size + 10}
                            color={color}
                        />,
                }}
            />
            <Tab.Screen
                name='Spaces'
                component={SpacesStackNavigator}
                options={{
                    tabBarIcon: ({focused, color, size}) =>
                        <CustomIcon
                            name={'windows'}
                            size={size + 10}
                            color={color}
                        />,
                }}
            />
            <Tab.Screen
                name='Account'
                component={AccountStackNavigator}
                options={{
                    tabBarIcon: ({focused, color, size}) =>
                        <CustomIcon
                            name={'fingerprint'}
                            size={size + 10}
                            color={color}
                        />,
                }}
            />
        </Tab.Navigator>
    )
}
