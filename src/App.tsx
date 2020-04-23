import React from 'react'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { PersistGate } from 'redux-persist/integration/react'

import configureStore from './store'
import { RootStackNavigatorParams } from './navigationTypes'
import { Colors } from './styles'

import { HomeScreen } from './ui/screens/HomeScreen'
import { WelcomeScreen } from './ui/screens/WelcomeScreen'
import { InitialScreen } from './ui/screens/InitialScreen'

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
                        }}
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
                    </Stack.Navigator>
                </NavigationContainer>
            </PersistGate>
        </Provider>
    )
}

export default App
