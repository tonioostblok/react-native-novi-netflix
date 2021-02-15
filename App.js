import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Login from './src/pages/Login';
import Home from './src/pages/Home';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';

import rootReducer from './src/store/rootReducer';
import {createStore, applyMiddleware} from "redux";

export const store = createStore(rootReducer, applyMiddleware(thunk));
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default function App() {
    const Stack = createStackNavigator();

    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Login">
                    <Stack.Screen
                        name="Login"
                        component={Login}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Home"
                        component={Home}
                        options={{ headerShown: false }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}
