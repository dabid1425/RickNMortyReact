import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // Import QueryClient and QueryClientProvider
import CharacterView from './Character/CharacterView';
import EpisodeView from './Episode/EpisodeView';
import LocationView from './Location/LocationView';

const queryClient = new QueryClient();

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName;

                            if (route.name === 'Characters') {
                                iconName = focused ? 'user' : 'user-o';
                            } else if (route.name === 'Episodes') {
                                iconName = focused ? 'video-camera' : 'video-camera';
                            } else if (route.name === 'Locations') {
                                iconName = focused ? 'globe' : 'globe';
                            }

                            return <Icon name={iconName} size={size} color={color} />;
                        },
                    })}
                    tabBarOptions={{
                        activeTintColor: 'black',
                        inactiveTintColor: 'gray',
                    }}
                >
                    <Tab.Screen name="Characters" component={CharacterView} />

                </Tab.Navigator>
            </NavigationContainer>
        </QueryClientProvider>
    );
}
