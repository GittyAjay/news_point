import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './page/Home'
import NewsComponent from './page/News'
const Stack = createNativeStackNavigator();

function AppNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="NewsHeadline"
                    options={{
                        title: 'News Headline',
                        headerStyle: {
                            backgroundColor: '#f4511e',

                        },
                        headerTitleAlign: "center",
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',

                        },
                    }}
                    component={HomeScreen} />

                <Stack.Screen
                    name="NewsItem"
                    options={{
                        title: '',
                        headerShown: true,
                        headerShadowVisible: false,
                    }}
                    component={NewsComponent} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigation;