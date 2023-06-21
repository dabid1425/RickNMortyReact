import React, { useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';

const CharacterView = ({ viewModel }) => {
  useEffect(() => {
    viewModel.fetchCharacters();
  }, []);

  const handleLoadMore = () => {
    viewModel.fetchCharacters();
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={viewModel.characters}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.characterContainer}>
          <Image source={{ uri: item.image }} style={styles.characterImage} />
            <Text style={styles.characterName}>{item.name}</Text>
            <Text>Status: {item.status}</Text>
            <Text>Species: {item.species}</Text>
          </View>
        )}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() =>
          viewModel.isLoading ? (
            <ActivityIndicator size="large" color="gray" />
          ) : null
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

export default CharacterView;
