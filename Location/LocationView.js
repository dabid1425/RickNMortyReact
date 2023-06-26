import React, { useEffect, useRef } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, ActivityIndicator} from 'react-native';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';

function LocationView({ viewModel, navigation }) {
  const flatListRef = useRef(null);

  useEffect(() => {
    const focusListener = navigation.addListener('didFocus', () => {
      viewModel.setPageNumber(1); // Reset the page number to 1 when the screen is focused
      viewModel.fetchLocations(true); // Pass `true` to clear the list when reloading
      resetFlatList();
    });

    return () => {
      focusListener.remove();
    };
  }, []);

  const handleEndReached = () => {
    viewModel.fetchLocations();
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
        ref={flatListRef}
        data={viewModel.locations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </SafeAreaView>
  );
};
LocationView.propTypes = {
  viewModel: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
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

export default withNavigation(LocationView);
