import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';

const EpisodeView = ({ viewModel }) => {
  useEffect(() => {
    viewModel.fetchEpisodes();
  }, []);

  const handleLoadMore = () => {
    viewModel.fetchEpisodes();
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={viewModel.episodes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.episodeContainer}>
            <Text style={styles.episodeName}>{item.name}</Text>
            <Text>Air Date: {item.airDate}</Text>
            <Text>Episode: {item.episode}</Text>
          </View>
        )}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  episodeContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  episodeName: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EpisodeView;
