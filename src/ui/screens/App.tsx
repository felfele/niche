import React from 'react'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { PersistGate } from 'redux-persist/integration/react'
// @ts-ignore
import { setCustomText } from 'react-native-global-props'
import Orientation from 'react-native-orientation-locker';

import configureStore from '../../store'
import { RootStackNavigatorParams } from '../../navigationTypes'
import { Colors, defaultTextProps } from '../../styles'

import { HomeScreen } from './HomeScreen'
import { WelcomeScreen } from './WelcomeScreen'
import { InitialScreen } from './InitialScreen'
import { CreatePostScreen } from './CreatePostScreen'
import { ViewPostScreen } from './ViewPostScreen'
import { CreateCommentScreen } from './CreateCommentScreen'
import { EditPostScreen } from './EditPostScreen'
import { EditCommentScreen } from './EditCommentScreen'
import { AboutSpaceScreen } from './AboutSpaceScreen'
import { CreateSpaceNavigator } from './create-space/CreateSpaceNavigator'

setCustomText(defaultTextProps);
Orientation.lockToPortrait()

const App = () => {
    const Stack = createStackNavigator<RootStackNavigatorParams>()
    const { store, persistor } = configureStore()
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <NavigationContainer>
                    <Stack.Navigator
                        initialRouteName={'Init'}
                        screenOptions={{
                            headerTintColor: Colors.BLACK,
                            headerBackTitleVisible: false,
                            headerTitleStyle: {
                                fontFamily: 'NunitoSans-Bold',
                                fontSize: 14,
                            },
                            headerShown: false,
                            gestureEnabled: false,
                        }}
                        mode='modal'
                    >
                        <Stack.Screen
                            name='Init'
                            component={InitialScreen}
                        />
                        <Stack.Screen
                            name='Home'
                            component={HomeScreen}
                            options={{
                                animationEnabled: false,
                            }}
                        />
                        <Stack.Screen
                            name='Welcome'
                            component={WelcomeScreen}
                            options={{
                                animationEnabled: false,
                            }}
                        />
                        <Stack.Screen
                            name='CreateSpace'
                            component={CreateSpaceNavigator}
                        />
                        <Stack.Screen
                            name='CreatePost'
                            component={CreatePostScreen}
                        />
                        <Stack.Screen
                            name='ViewPost'
                            component={ViewPostScreen}
                        />
                        <Stack.Screen
                            name='CreateComment'
                            component={CreateCommentScreen}
                        />
                        <Stack.Screen
                            name='EditPost'
                            component={EditPostScreen}
                        />
                        <Stack.Screen
                            name='EditComment'
                            component={EditCommentScreen}
                        />
                        <Stack.Screen
                            name='AboutSpace'
                            component={AboutSpaceScreen}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </PersistGate>
        </Provider>
    )
}

export default App
