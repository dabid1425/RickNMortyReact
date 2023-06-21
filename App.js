import React from 'react';
import CharacterViewModel from './Character/CharacterViewModel';
import CharacterView from './Character/CharacterView';
import EpisodeViewModel from './Episode/EpisodeViewModel';
import EpisodeView from './Episode/EpisodeView';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
const characterViewModel = new CharacterViewModel();
const episodeViewModel = new EpisodeViewModel();
const TabNavigator = createBottomTabNavigator(
  {
    Characters: {
      screen: () => <CharacterView characterViewModel={characterViewModel} />,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Icon name="user" size={20} color={tintColor} />,
      },
    },
    Episodes: {
      screen: () => <EpisodeView viewModel={episodeViewModel} />,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Icon name="video-camera" size={20} color={tintColor} />,
      },
    },
    // Add more tabs here if needed
  },
  {
    tabBarOptions: {
      activeTintColor: 'black',
      inactiveTintColor: 'gray',
    },
  }
);
const AppContainer = createAppContainer(TabNavigator)
export default function App() {
  return <AppContainer />;
}
