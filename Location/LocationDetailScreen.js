import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const LocationDetailScreen = ({ navigation }) => {
  const location = navigation.getParam('location');
  const [residents, setResidents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResidents = async () => {
      try {
        const residentRequests = location.residents.map(async (residentUrl) => {
          const response = await fetch(residentUrl);
          const data = await response.json();
          return data;
        });
        const fetchedResidents = await Promise.all(residentRequests);
        setResidents(fetchedResidents);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching residents:', error);
      }
    };

    fetchResidents();
  }, [location]);


  const handleCharacterPress = (character) => {
    navigation.navigate('CharacterDetail', { character });
  };


  return (
    <View style={{ flex: 1 }}>
      <View style={{ marginTop: 50, flexDirection: 'row', alignItems: 'center', padding: 10 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Location Details</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ padding: 10 }}>
        <View style={{ marginBottom: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 5 }}>{location.name}</Text>
          <Text>Type: {location.type}</Text>
          <Text>Dimension: {location.dimension}</Text>
        </View>
        
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Residents</Text>
        {loading ? (
          <ActivityIndicator size="large" color="gray" />
        ) : (
          <FlatList
            horizontal
            data={residents}
            keyExtractor={(item, index) => `${item.id}_${index}`}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleCharacterPress(item)}>
                <View style={{ marginRight: 10 }}>
                  <Image source={{ uri: item.image }} style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 5 }} />
                  <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
                  <Text>Status: {item.status}</Text>
                  <Text>Species: {item.species}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </ScrollView>
    </View>
  );
};

export default LocationDetailScreen;
