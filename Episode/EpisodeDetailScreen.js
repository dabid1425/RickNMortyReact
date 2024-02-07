import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const EpisodeDetailScreen = ({ navigation }) => {
  const episode = navigation.getParam('episode');
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const characterRequests = episode.characters.map(async (characterUrl) => {
          const response = await fetch(characterUrl);
          const data = await response.json();
          return data;
        });
        const fetchedCharacters = await Promise.all(characterRequests);
        setCharacters(fetchedCharacters);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    };

    fetchCharacters();
  }, [episode]);

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
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Episode Details</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ padding: 10 }}>
        <View style={{ marginBottom: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 5 }}>{episode.name}</Text>
          <Text>Episode: {episode.episode}</Text>
          <Text>Air Date: {episode.air_date}</Text>
        </View>
        
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Characters</Text>
        {loading ? (
          <ActivityIndicator size="large" color="gray" />
        ) : (
          <FlatList
            horizontal
            data={characters}
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

export default EpisodeDetailScreen;
