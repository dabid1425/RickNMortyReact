import React, { useEffect, useRef } from 'react';
import { View, Text, FlatList, Image, StyleSheet, SafeAreaView, ActivityIndicator, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import useCharacterViewModel from './CharacterViewModel';

function CharacterView({ navigation }) {
  const { characters, loading, fetchCharacters } = useCharacterViewModel();
  const flatListRef = useRef(null);

  const handleLoadMore = () => {
    fetchCharacters();
  };

  const renderFooter = () => {
    if (loading) {
      return (
          <View style={styles.footerContainer}>
            <ActivityIndicator size="large" color="gray" />
          </View>
      );
    } else {
      return null;
    }
  };

  const handleCellPress = (character) => {
    navigation.navigate('CharacterDetail', { character });
  };

  const renderItem = ({ item }) => {
    let borderColor = '';
    const status = item.species.toLowerCase();
    switch (status) {
      case 'alive':
        borderColor = 'green';
        break;
      case 'dead':
        borderColor = 'red';
        break;
      case 'unknown':
        borderColor = 'yellow';
        break;
    }

    const characterBorderStyle = {
      borderWidth: 2,
      borderRadius: 10,
      borderColor: borderColor,
    };

    return (
        <TouchableOpacity onPress={() => handleCellPress(item)}>
          <View style={[styles.characterContainer, characterBorderStyle]}>
            <Image source={{ uri: item.image }} style={styles.characterImage} />
            <Text style={styles.characterName}>{item.name}</Text>
            <Text>Status: {item.species}</Text>
            <Text style={styles.characteSpecies}>Species: {item.status}</Text>
          </View>
        </TouchableOpacity>
    );
  };
  return (
      <SafeAreaView style={styles.container}>
        <FlatList
            ref={flatListRef}
            data={characters}
            keyExtractor={(item, index) => `${item.id}_${index}`}
            renderItem={renderItem}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooter}
        />
      </SafeAreaView>
  );
}

CharacterView.propTypes = {
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  characterContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  characterImage: {
    width: 100,
    height: 100,
    marginTop: 10,
    borderRadius: 50,
  },
  characterName: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  characteSpecies: {
    marginBottom: 10,
  },
});

export default withNavigation(CharacterView);