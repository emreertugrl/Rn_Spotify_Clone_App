import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const ProfileScreen = () => {
  return (
    <LinearGradient colors={['#040306', '#131624']} style={{flex: 1}}>
      <ScrollView
        style={{marginTop: 50}}
        contentContainerStyle={{paddingBottom: 100}}>
        <View style={{padding: 12}}>
          <View style={styles.profileContainer}>
            <Image
              source={{uri: 'https://picsum.photos/200/300'}}
              style={styles.profileImage}
            />
            <View>
              <Text style={styles.profileName}>Emre</Text>
              <Text style={styles.profileFollowers}>5 followers</Text>
            </View>
          </View>
        </View>
        <Text style={styles.sectionTitle}>Your Playlists</Text>
        <View style={styles.playlistContainer}>
          <View
            style={{
              marginVertical: 10,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
            }}>
            <Image
              source={{uri: 'https://picsum.photos/200/300'}}
              style={styles.playlistImage}
            />
            <View>
              <Text style={styles.playlistName}>Duman</Text>
              <Text style={styles.playlistFollowers}>50 followers</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  profileContainer: {flexDirection: 'row', alignItems: 'center', gap: 10},
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: 'cover',
  },
  profileName: {color: 'white', fontSize: 16, fontWeight: 'bold'},
  profileFollowers: {color: 'gray', fontSize: 16, fontWeight: 'bold'},
  sectionTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
    marginHorizontal: 12,
  },
  playlistContainer: {padding: 15},
  playlistImage: {width: 50, height: 50, borderRadius: 4},
  playlistName: {color: 'white'},
  playlistFollowers: {color: 'white', marginTop: 7},
});
