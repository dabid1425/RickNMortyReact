import React, { useEffect, useRef } from 'react';
import { View, Text, FlatList, Image, StyleSheet, SafeAreaView, ActivityIndicator} from 'react-native';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';

function CharacterView({ viewModel, navigation }) {
  const flatListRef = useRef(null);

  useEffect(() => {
    const focusListener = navigation.addListener('didFocus', () => {
      viewModel.setPageNumber(1); // Reset the page number to 1 when the screen is focused
      viewModel.fetchCharacters(true); // Pass `true` to clear the list when reloading
      resetFlatList();
    });

    return () => {
      focusListener.remove();
    };
  }, []);

  const handleLoadMore = () => {
    viewModel.fetchCharacters();
  };
  const resetFlatList = () => {
    flatListRef.current.scrollToOffset({ animated: false, offset: 0 });
  };
  const renderFooter = () => {
    if (viewModel.isLoading) {
      return (
        <View style={styles.footerContainer}>
          <ActivityIndicator size="large" color="gray" />
        </View>
      );
    } else {
      return null;
    }
  };
  const renderItem = ({ item }) => {
    let borderColor = '';
    const status = item.species.toLowerCase(); // Convert status to lowercase
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
      <View style={[styles.characterContainer, characterBorderStyle]}>
        <Image source={{ uri: item.image }} style={styles.characterImage} />
        <Text style={styles.characterName}>{item.name}</Text>
        <Text>Status: {item.species}</Text>
        <Text>Species: {item.status}</Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={viewModel.characters}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </SafeAreaView>
  );
};

CharacterView.propTypes = {
  viewModel: PropTypes.object.isRequired,
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
    borderRadius: 50,
  },
  characterName: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default withNavigation(CharacterView);
