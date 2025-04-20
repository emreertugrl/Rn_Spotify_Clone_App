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
import {useNavigation} from '@react-navigation/native';

const SongInfoScreen = () => {
  const navigation = useNavigation();
  return (
    <LinearGradient colors={['#040306', '#131624']} style={{flex: 1}}>
      <ScrollView style={{marginTop: 20}}>
        <View style={{padding: 12}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft color="white" size={24} />
          </TouchableOpacity>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Image
              source={{uri: 'https://picsum.photos/200/300'}}
              style={{width: 200, height: 200, borderRadius: 5}}
            />
          </View>
          <Text
            style={{
              color: 'white',
              marginHorizontal: 12,
              marginTop: 10,
              fontSize: 22,
              fontWeight: 'bold',
            }}>
            Name
          </Text>
          <View
            style={{
              marginHorizontal: 12,
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: 7,
              marginTop: 10,
            }}>
            <Text style={{color: '#909090', fontSize: 13, fontWeight: 'bold'}}>
              name
            </Text>
          </View>
        </View>

        <Pressable
          style={{
            marginHorizontal: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Pressable
            style={{
              backgroundColor: '#1db954',
              width: 30,
              height: 30,
              borderRadius: 15,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ArrowDown size={24} color="white" />
          </Pressable>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
            }}>
            <ShieldCross size="24" color="#1db954" />
            <Pressable
              style={{
                backgroundColor: '#1db954',
                justifyContent: 'center',
                alignItems: 'center',
                width: 60,
                height: 60,
                borderRadius: 30,
              }}>
              <Play size="24" color="white" variant="Bold" />
            </Pressable>
          </View>
        </Pressable>

        <View>
          <View style={{marginHorizontal: 12, marginTop: 10}}>
            <Pressable
              style={{
                marginVertical: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View>
                <Text style={{color: 'white', fontWeight: '500', fontSize: 16}}>
                  name
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 5,
                    gap: 8,
                  }}>
                  <Text
                    style={{color: 'white', fontWeight: '500', fontSize: 16}}>
                    artist
                  </Text>
                </View>
              </View>
              <More size={30} color="white" />
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default SongInfoScreen;

const styles = StyleSheet.create({});
