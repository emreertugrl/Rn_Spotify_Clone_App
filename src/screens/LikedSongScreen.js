import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  ArrowCircleDown,
  ArrowCircleUp,
  ArrowDown,
  ArrowDown2,
  ArrowForwardSquare,
  ArrowLeft,
  ArrowSquare,
  BackSquare,
  Forward,
  Heart,
  More,
  PauseCircle,
  Play,
  Repeat,
  SearchNormal1,
  ShieldCross,
} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';
import SongItem from '../components/SongItem';
import axios from 'axios';
import ReactNativeModal from 'react-native-modal';

const LikedSongScreen = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('Türkiye de Popüler Müzikler');
  const [searchedTracks, setSearchedTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    const options = {
      method: 'GET',
      url: 'https://shazam.p.rapidapi.com/search',
      params: {
        term: searchText,
        locale: 'tr-TR',
        offset: '0',
        limit: '5',
      },
      headers: {
        'x-rapidapi-key': 'eed126f9bcmshc5525da323f2af8p1ab61fjsn34753381407b',
        'x-rapidapi-host': 'shazam.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      setSearchedTracks(response.data.tracks.hits);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handlePlay = async track => {
    console.log('Tıklandı', track);
    console.log(modalVisible);
    const trackData = {
      id: track.track.key,
      url: track.track.hub.actions.find(action => action.type === 'uri').uri, // ses dosyasının urli
      title: track.track.title,
      artist: track.track.subtitle,
      artwork: track.track.images.coverart,
    };
    try {
      // await TrackPlayer.reset();
      // await TrackPlayer.add(trackData);
      // await TrackPlayer.play();
      // setSelectedTrack(track.track);
      setModalVisible(true);
      setIsPlaying(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <>
      <LinearGradient colors={['#614385', '#516395']} style={{flex: 1}}>
        <ScrollView style={{flex: 1, marginTop: 10}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Pressable
              onPress={() => navigation.goBack()}
              style={{marginHorizontal: 10}}>
              <ArrowLeft size="24" color="white" />
            </Pressable>

            <Pressable
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginHorizontal: 10,
                marginTop: 10,
              }}>
              <Pressable
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                  paddingHorizontal: 9,
                  backgroundColor: '#42275a',
                  borderRadius: 3,
                  height: 40,
                }}>
                <SearchNormal1 size="20" color="white" />
                <TextInput
                  placeholderTextColor={'white'}
                  style={{fontWeight: '500', width: '85%', color: 'white'}}
                  placeholder="Find in liked songs"
                  onChangeText={setSearchText}
                  onSubmitEditing={handleSearch}
                />
              </Pressable>
            </Pressable>
          </View>

          <View style={{height: 20}} />

          <View style={{marginHorizontal: 10}}>
            <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>
              Liked Songs
            </Text>
            <Text style={{color: 'white', fontSize: 13, marginTop: 5}}>
              {searchedTracks.length} Songs
            </Text>
          </View>

          {loading ? (
            <ActivityIndicator size={'large'} color={'gray'} />
          ) : (
            <FlatList
              data={searchedTracks}
              keyExtractor={item => item.track.key}
              style={{marginTop: 10}}
              renderItem={({item}) => (
                <Pressable onPress={() => handlePlay(item)}>
                  <View style={styles.trackContainer}>
                    <Image
                      source={{uri: item.track.images.coverart}}
                      style={styles.albumCover}
                    />
                    <View style={styles.trackInfo}>
                      <Text style={styles.trackName}>{item.track.title}</Text>
                      <Text style={styles.albumName}>
                        {item.track.subtitle}
                      </Text>
                    </View>
                    <Play size={24} color="white" variant="Bold" />
                  </View>
                </Pressable>
              )}
            />
          )}
        </ScrollView>
      </LinearGradient>

      <ReactNativeModal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        swipeDirection="down" // modalın hangi yöne kaydırılacağını belirler
        onSwipeComplete={() => setModalVisible(false)} //swipe ile yapılacak işlem
        style={{margin: 0}}>
        <View
          style={{backgroundColor: '#5072a7', width: '100%', height: '100%'}}>
          <View style={{marginTop: 40}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <ArrowDown2 size="24" color="white" />
              </TouchableOpacity>
              <Text style={{fontSize: 14, fontWeight: 'bold', color: 'white'}}>
                Song Name
              </Text>
              <More size="24" color="white" />
            </View>

            <View style={{padding: 10, marginTop: 30}}>
              <Image
                source={{
                  uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZy8-ZQYRePXWhoUH0F4Ugr7pL1lMSIJUWbQ&s',
                }}
                style={{
                  borderRadius: 20,
                  width: '100%',
                  height: 330,
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 20,
                }}>
                <View>
                  <Text
                    style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>
                    Name
                  </Text>
                  <Text style={{color: '#d3d3d3', marginTop: 4}}>Singer</Text>
                </View>
                <Heart size={24} color="#1db954" variant="Bold" />
              </View>
              <View
                style={{
                  marginTop: 10,
                }}>
                <View
                  style={{
                    width: '100%',
                    marginTop: 10,
                    height: 3,
                    backgroundColor: 'gray',
                    borderRadius: 5,
                  }}>
                  <View style={[styles.progressbar, {width: 1 * 100}]} />
                  <View
                    style={{
                      position: 'absolute',
                      top: -4,
                      width: 10,
                      height: 10,
                      backgroundColor: 'white',
                      borderRadius: 5,
                      left: 100,
                    }}
                  />
                </View>
                <View
                  style={{
                    marginTop: 12,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text style={{color: 'white', fontSize: 15}}>00:00</Text>
                  <Text style={{color: 'white', fontSize: 15}}>00:00</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 17,
                  }}>
                  <Pressable>
                    <ArrowSquare size="30" color="#03c03c" />
                  </Pressable>
                  <Pressable>
                    <BackSquare size="30" color="white" variant="Bold" />
                  </Pressable>

                  <Pressable>
                    {isPlaying ? (
                      <PauseCircle size="60" color="white" variant="Bold" />
                    ) : (
                      <Pressable
                        style={{
                          backgroundColor: 'white',
                          width: 60,
                          height: 60,
                          borderRadius: 30,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Play size="30" color="black" variant="Bold" />
                      </Pressable>
                    )}
                  </Pressable>

                  <Pressable>
                    <ArrowForwardSquare
                      size="30"
                      color="white"
                      variant="Bold"
                    />
                  </Pressable>

                  <Pressable>
                    <Repeat size="30" color="#03c03c" />
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ReactNativeModal>
    </>
  );
};

export default LikedSongScreen;

const styles = StyleSheet.create({
  progressbar: {
    height: '100%',
    backgroundColor: 'white',
  },
  trackContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  albumCover: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  trackInfo: {
    flex: 1,
    marginLeft: 10,
  },
  trackName: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  albumName: {
    fontSize: 14,
    color: '#758694',
  },
});
