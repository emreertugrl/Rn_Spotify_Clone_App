import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  ArrowDown,
  ArrowLeft,
  More,
  Play,
  ShieldCross,
} from 'iconsax-react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

const SongInfoScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {album} = route?.params || {};
  const {artist, coverArt, name, year} = album;
  return (
    <LinearGradient colors={['#040306', '#131624']} style={{flex: 1}}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.paddingView}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft color="white" size={24} />
          </TouchableOpacity>
          <View style={styles.imageView}>
            <Image source={{uri: coverArt}} style={styles.coverImage} />
          </View>
          <Text style={styles.albumNameText}>{name}</Text>
          <View style={styles.artistView}>
            <Text style={styles.artistText}>{artist}</Text>
          </View>
        </View>

        <Pressable style={styles.controlView}>
          <Pressable style={styles.downloadButton}>
            <ArrowDown size={24} color="white" />
          </Pressable>
          <View style={styles.playButtonView}>
            <ShieldCross size="24" color="#1db954" />
            <Pressable style={styles.playButton}>
              <Play size="24" color="white" variant="Bold" />
            </Pressable>
          </View>
        </Pressable>

        <View>
          <View style={styles.infoView}>
            <View>
              <Text style={styles.infoText}>Album: {name}</Text>
              <Text style={styles.infoText}>Artist: {artist}</Text>
              <Text style={styles.infoText}>Year: {year}</Text>
            </View>

            <More size={30} color="white" />
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default SongInfoScreen;

const styles = StyleSheet.create({
  scrollView: {marginTop: 50},
  paddingView: {padding: 10},
  imageView: {flex: 1, alignItems: 'center'},
  coverImage: {
    width: 200,
    height: 200,
  },
  albumNameText: {
    color: 'white',
    marginHorizontal: 12,
    marginTop: 10,
    fontSize: 22,
    fontWeight: 'bold',
  },
  artistView: {
    marginHorizontal: 12,
    marginTop: 10,
  },
  artistText: {
    color: '#909090',
    fontSize: 13,
    fontWeight: 'bold',
  },
  controlView: {
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  downloadButton: {
    backgroundColor: '#1DB954',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButtonView: {flexDirection: 'row', gap: 10, alignItems: 'center'},
  playButton: {
    backgroundColor: '#1DB954',
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  infoView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 12,
    marginTop: 10,
  },
  infoText: {color: 'white', fontWeight: '500', fontSize: 16},
  infoContainer: {
    gap: 5,
  },
});
