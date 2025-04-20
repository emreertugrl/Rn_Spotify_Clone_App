import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
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
import {ModalContent} from 'react-native-modals';

const LikedSongScreen = () => {
  const navigation = useNavigation();
  const [searchedTracks, setSearchedTracks] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <LinearGradient colors={['#614385', '#516395']} style={{flex: 1}}>
        <ScrollView style={{flex: 1, marginTop: 10}}>
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
                flex: 1,
                backgroundColor: '#42275a',
                borderRadius: 3,
                height: 40,
              }}>
              <SearchNormal1 size="20" color="white" />
              <TextInput
                placeholderTextColor={'white'}
                style={{fontWeight: '500', color: 'white'}}
                placeholder="Find in liked songs"
              />
            </Pressable>
            <Pressable
              style={{
                marginHorizontal: 10,
                backgroundColor: '#42275a',
                padding: 10,
                borderRadius: 3,
                height: 40,
              }}>
              <Text style={{color: 'white'}}>Sort</Text>
            </Pressable>
          </Pressable>

          <View style={{height: 50}} />

          <View style={{marginHorizontal: 10}}>
            <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>
              Liked Songs
            </Text>
            <Text style={{color: 'white', fontSize: 13, marginTop: 5}}>
              430 Songs
            </Text>
          </View>

          <Pressable
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginHorizontal: 10,
            }}>
            <Pressable
              style={{
                width: 30,
                height: 30,
                backgroundColor: '#1db954',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 15,
              }}>
              <ArrowDown size="20" color="white" />
            </Pressable>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
              }}>
              <ShieldCross size="30" color="#1db954" />
              <Pressable
                style={{
                  width: 60,
                  height: 60,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 30,
                  backgroundColor: '#1db954',
                }}>
                <Play size={24} color="white" variant="Bold" />
              </Pressable>
            </View>
          </Pressable>
          {/* {searchedTracks.length === 0 ? (
            <ActivityIndicator size={'large'} color={'gray'} />
          ) : (
            <FlatList
              data={searchedTracks}
              renderItem={({item}) => <SongItem />}
            />
          )} */}
        </ScrollView>
      </LinearGradient>
      <Pressable
        onPress={() => setModalVisible(!modalVisible)}
        style={{
          backgroundColor: '#5072a7',
          padding: 10,
          marginLeft: 'auto',
          marginRight: 'auto',
          position: 'absolute',
          left: 20,
          bottom: 10,
          borderRadius: 6,
          marginBottom: 15,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 10,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
          <Image
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZy8-ZQYRePXWhoUH0F4Ugr7pL1lMSIJUWbQ&s',
            }}
            style={{width: 50, height: 50}}
          />
          <Text
            style={{
              fontSize: 13,
              width: 220,
              color: 'white',
              fontWeight: 'bold',
            }}>
            name
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
          <Heart size="24" color="#1db954" variant="Bold" />
          <Pressable>
            <PauseCircle size="24" color="white" variant="Bold" />
          </Pressable>
        </View>
      </Pressable>
      {/* <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        swipeDirection="down" // modalın hangi yöne kaydırılacağını belirler
        onSwipeComplete={() => setModalVisible(false)}
        style={{margin: 0}}>
        <ModalContent
          style={{backgroundColor: '#5072a7', width: '100%', height: '100%'}}>
          <View style={{marginTop: 40}}>
            <Pressable
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <ArrowDown2 size="24" color="white" />
              <Text style={{fontSize: 14, fontWeight: 'bold', color: 'white'}}>
                Song Name
              </Text>
              <More size="24" color="white" />
            </Pressable>

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
        </ModalContent>
      </Modal> */}
    </>
  );
};

export default LikedSongScreen;

const styles = StyleSheet.create({
  progressbar: {
    height: '100%',
    backgroundColor: 'white',
  },
});
