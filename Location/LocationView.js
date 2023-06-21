import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';

const LocationView = ({ viewModel, isActive }) => {
  const [shouldFetch, setShouldFetch] = useState(false);

  useEffect(() => {
    if (isActive && shouldFetch) {
      viewModel.fetchLocations();
      setShouldFetch(false);
    }
  }, [isActive, shouldFetch]);

  useEffect(() => {
    if (isActive) {
      setShouldFetch(false);
    }
  }, [isActive]);

  useEffect(() => {
    if (isActive && viewModel.locations.length === 0) {
      setShouldFetch(true);
    }
  }, [isActive, viewModel.locations]);

  const handleLoadMore = () => {
    viewModel.fetchLocations();
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
    <View style={styles.locationContainer}>
      <Text style={styles.locationName}>{item.name}</Text>
      <Text>Type: {item.type}</Text>
      <Text>Dimension: {item.dimension}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={viewModel.locations}
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
  },
  locationContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  locationName: {
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

export default LocationView;
