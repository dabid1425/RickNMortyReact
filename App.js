import React, { useEffect } from 'react';
import CharacterViewModel from './Character/CharacterViewModel';
import CharacterView from './Character/CharacterView';
import EpisodeViewModel from './Episode/EpisodeViewModel';
import EpisodeView from './Episode/EpisodeView';
import LocationViewModel from './Location/LocationViewModel';
import LocationView from './Location/LocationView';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer, withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';


const TabNavigator = createBottomTabNavigator(
  {
    Characters: {
      screen: withNavigation(CharacterScreen),
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Icon name="user" size={20} color={tintColor} />,
      },
    },
    Episodes: {
      screen: withNavigation(EpisodeScreen),
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Icon name="video-camera" size={20} color={tintColor} />,
      },
    },
    Locations: {
      screen: withNavigation(LocationScreen),
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Icon name="globe" size={20} color={tintColor} />,
      },
    },
    // Add more tabs here if needed
  },
  {
    tabBarOptions: {
      activeTintColor: 'black',
      inactiveTintColor: 'gray',
    },
    tabBarOnPress: ({ navigation, defaultHandler }) => {
      const episodeViewModel = navigation.state.routes.find(route => route.routeName === 'Episodes').params?.viewModel;
      if (episodeViewModel) {
        episodeViewModel.fetchEpisodes();
      }
      const characterViewModel = navigation.state.routes.find(route => route.routeName === 'Characters').params?.viewModel;
      if (characterViewModel) {
        characterViewModel.fetchCharacters();
      }
      const locationViewModel = navigation.state.routes.find(route => route.routeName === 'Locations').params?.viewModel;
      if (locationViewModel) {
        locationViewModel.fetchLocations();
      }
      defaultHandler();
    },
  }
);

const AppContainer = createAppContainer(TabNavigator);

export default function App() {
  return <AppContainer />;
}

function EpisodeScreen({ navigation }) {
  const episodeViewModel = new EpisodeViewModel();

  useEffect(() => {
    const focusListener = navigation.addListener('willFocus', () => {
      episodeViewModel.fetchEpisodes();
    });

    return () => {
      focusListener.remove();
    };
  }, []);

  return <EpisodeView viewModel={episodeViewModel} />;
}

function CharacterScreen({ navigation }) {
  const characterViewModel = new CharacterViewModel();

  useEffect(() => {
    const focusListener = navigation.addListener('willFocus', () => {
      characterViewModel.fetchCharacters();
    });

    return () => {
      focusListener.remove();
    };
  }, []);

  return <CharacterView viewModel={characterViewModel} />;
}
function LocationScreen({ navigation }) {
  const locationViewModel = new LocationViewModel();

  useEffect(() => {
    const focusListener = navigation.addListener('willFocus', () => {
      locationViewModel.fetchLocations();
    });

    return () => {
      focusListener.remove();
    };
  }, []);

  return <LocationView viewModel={locationViewModel} />;
}
