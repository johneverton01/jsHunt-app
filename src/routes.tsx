import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Header from './components/Header'

const { Navigator, Screen } = createStackNavigator();

import Main from './pages/Main';
import Products from './pages/Products';

export default function Routes() {
    return (
        <NavigationContainer>
            <Navigator screenOptions={{
                headerShown: true,
                cardStyle: { backgroundColor: '#f2f3f5' },
                headerStyle:{ backgroundColor: "#DA552F" },
                headerTintColor: "#fff"
                }}>

                <Screen
                    name="JSHunter"
                    component={Main}
                />
                <Screen
                    name="Products"
                    component={Products}
                    options={{
                        headerShown: true,
                        header: () => <Header showCancel={false} title="Products"/>
                    }}
                />
            </Navigator>
        </NavigationContainer>
    );
}