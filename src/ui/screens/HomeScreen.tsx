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
import { CustomIcon } from '../components/CustomIcon'

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
                name="Spaces"
                component={SpacesStack}
                options={{
                    tabBarIcon: ({focused, color, size}) =>
                        <CustomIcon
                            name={'windows'}
                            size={size + 12}
                            color={color}
                        />,
                }}
            />
            <Tab.Screen
                name="Activity"
                component={ActivityScreen}
                options={{
                    tabBarIcon: ({focused, color, size}) =>
                        <CustomIcon
                            name={'bell'}
                            size={size + 12}
                            color={color}
                        />,
                }}
            />
            <Tab.Screen
                name="Account"
                component={AccountScreen}
                options={{
                    tabBarIcon: ({focused, color, size}) =>
                        <CustomIcon
                            name={'fingerprint'}
                            size={size + 12}
                            color={color}
                        />,
                }}
            />
        </Tab.Navigator>
    )
}
