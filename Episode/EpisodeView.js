import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, ActivityIndicator} from 'react-native';

const EpisodeView = ({ viewModel }) => {
  useEffect(() => {
    viewModel.fetchEpisodes();
  }, []);

  const handleLoadMore = () => {
    viewModel.fetchEpisodes();
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
  const renderItem = ({ item }) => (
    <View style={styles.episodeContainer}>
      <Text style={styles.episodeName}>{item.name}</Text>
      <Text>Air Date: {item.airDate}</Text>
      <Text>Episode: {item.episode}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={viewModel.episodes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
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
  footerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
});

export default EpisodeView;
