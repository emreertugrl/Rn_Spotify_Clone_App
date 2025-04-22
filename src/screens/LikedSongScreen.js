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
  Backward,
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
import axios from 'axios';
import ReactNativeModal from 'react-native-modal';
import TrackPlayer, {Capability, useProgress} from 'react-native-track-player';

const LikedSongScreen = () => {
  const progress = useProgress();
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('Türkiye de Popüler Müzikler');
  const [selectedTrack, setSelectedTrack] = useState(null);
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

  const setupPlayer = async () => {
    try {
      /*
       * `TrackPlayer` kütüphanesinin oynatıcıyı kurmasını sağlar.Bu işlem, oynatıcıyı başlatmak için
       * gerekli olan yapılandırmayı sağlar.
       */
      await TrackPlayer.setupPlayer();
      TrackPlayer.updateOptions({
        //* Oynatıcının sahip olacağı özellikleri belirler
        capabilities: [
          TrackPlayer.CAPABILITY_PLAY, // Oynatma işlemi yapabilmesi için kullanırız
          TrackPlayer.CAPABILITY_PAUSE, // Oynatıcıda duraklatma işlemi için kullanırız
          TrackPlayer.CAPABILITY_STOP, // Oynatıcıda durdurma işlemi için kullanırız
          TrackPlayer.CAPABILITY_SKIP_TO_NEXT, // Oynatıcıda bir sonraki müziği geçiş yapabilmesi için kullanılır
          TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS, // Oynatıcıda bir önceki müziğe geçiş yapabilmesi için kullanılır
          TrackPlayer.CAPABILITY_SEEK_TO, // Belirli bir zamana atlama
        ],
        compactCapabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE,
          TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
          TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
        ],
      });
    } catch (error) {
      console.log('Error setting up player:', error);
    }
  };

  const handlePlay = async track => {
    console.log('Tıklandı', track);
    const trackData = {
      id: track.track.key,
      url: track.track.hub.actions.find(action => action.type === 'uri').uri, // ses dosyasının urli
      title: track.track.title,
      artist: track.track.subtitle,
      artwork: track.track.images.coverart,
    };
    try {
      await TrackPlayer.reset(); // önce kaydedilen veri varsa resetlenir
      await TrackPlayer.add(trackData); // çalacak olan müzik eklenir
      await TrackPlayer.play(); // oynatmaya başlanır ( ilk başta setupPlayer oluşturulur)
      setSelectedTrack(track.track);
      setModalVisible(true);
      setIsPlaying(true);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleSearch();
    setupPlayer();
  }, []);

  const formatTime = seconds => {
    // toplam saniyeyi dakikaya çevir
    const mins = Math.floor(seconds / 60);
    // toplam saniye sayısından geriye kalan saniyeyi hesaplar
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const togglePlayback = async () => {
    if (isPlaying) {
      //* Müzik oynatılıyorsa durdur
      await TrackPlayer.pause();
    } else {
      //* Müzik duruyorsa oynat
      await TrackPlayer.play();
    }
    //* isPlaying değerini oynatma ve durdurma butonuna basıldığında tam tersi değerine çevir
    setIsPlaying(!isPlaying);
  };
  //* Oynatılan müziği 10 saniye positiona göre geri aldık
  const seekBackward = async () => {
    const position = await TrackPlayer.getPosition();
    await TrackPlayer.seekTo(position - 10);
  };
  const seekForward = async () => {
    const position = await TrackPlayer.getPosition();
    await TrackPlayer.seekTo(position + 10);
  };

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
              <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
                {selectedTrack?.title}
              </Text>
              <More size="24" color="white" />
            </View>

            <View style={{padding: 10, marginTop: 30}}>
              <Image
                source={{
                  uri: selectedTrack?.images.coverart,
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
                    {selectedTrack?.title}
                  </Text>
                  <Text style={{color: '#d3d3d3', marginTop: 4}}>
                    {selectedTrack?.subtitle}
                  </Text>
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
                  <View
                    style={[
                      styles.progressbar,
                      {
                        width: `${
                          (progress.position / progress.duration) * 100
                        }%`,
                      },
                    ]}
                  />
                  <View
                    style={{
                      position: 'absolute',
                      top: -4,
                      width: 10,
                      height: 10,
                      backgroundColor: 'white',
                      borderRadius: 5,
                      left: `${(progress.position / progress.duration) * 100}%`,
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
                  <Text style={{color: 'white', fontSize: 15}}>
                    {' '}
                    {formatTime(progress.position)}
                  </Text>
                  <Text style={{color: 'white', fontSize: 15}}>
                    {' '}
                    {formatTime(progress.duration)}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 17,
                  }}>
                  <Pressable onPress={seekBackward}>
                    <Backward size="30" color="white" variant="Bold" />
                  </Pressable>
                  <Pressable>
                    <BackSquare size="30" color="white" variant="Bold" />
                  </Pressable>

                  <Pressable onPress={togglePlayback}>
                    {isPlaying ? (
                      <PauseCircle size="60" color="white" variant="Bold" />
                    ) : (
                      <Play size="60" color="white" variant="Bold" />
                    )}
                  </Pressable>

                  <Pressable>
                    <ArrowForwardSquare
                      size="30"
                      color="white"
                      variant="Bold"
                    />
                  </Pressable>

                  <Pressable onPress={seekForward}>
                    <Forward size="30" color="white" variant="Bold" />
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
