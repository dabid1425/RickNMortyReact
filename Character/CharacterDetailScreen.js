import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

const CharacterDetailScreen = ({ navigation }) => {
  const character = navigation.getParam('character');
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const episodeRequests = character.episode.map(async (episodeUrl) => {
          const response = await fetch(episodeUrl);
          const data = await response.json();
          return data;
        });
        const fetchedEpisodes = await Promise.all(episodeRequests);
        setEpisodes(fetchedEpisodes);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching episodes:', error);
      }
    };

    fetchEpisodes();
  }, [character]);

  const handleEpisodePress = (episode) => {
    navigation.navigate('EpisodeDetail', { episode });
  };
  
  return (
    <View style={{ flex: 1 }}>
      <View style={{ marginTop: 50, flexDirection: 'row', alignItems: 'center', padding: 10 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Character Details</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ padding: 10 }}>
        <Image source={{ uri: character.image }} style={{ width: '100%', height: 200, marginBottom: 10 }} />
        <View style={{ marginBottom: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 5 }}>{character.name}</Text>
          <Text>Status: {character.status}</Text>
          <Text>Species: {character.species}</Text>
        </View>
        
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Episodes</Text>
        {loading ? (
          <ActivityIndicator size="large" color="gray" />
        ) : (
          <FlatList
            horizontal
            data={episodes}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleEpisodePress(item)}>
                <View style={{ marginRight: 10, borderWidth: 1, borderColor: 'black', padding: 10 }}>
                  <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
                  <Text>Air Date: {item.air_date}</Text>
                </View>
              </TouchableOpacity>

            )}
          />
        )}
      </ScrollView>
    </View>
  );
};

export default CharacterDetailScreen;
