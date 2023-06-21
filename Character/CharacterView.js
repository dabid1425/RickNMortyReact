import React, { useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';

const CharacterView = ({ characterViewModel }) => {
  useEffect(() => {
    characterViewModel.fetchCharacters();
  }, []);

  const handleLoadMore = () => {
    characterViewModel.fetchCharacters();
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={characterViewModel.characters}
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
          characterViewModel.isLoading ? (
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
