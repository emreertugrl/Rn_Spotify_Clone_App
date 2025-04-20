import {View, Text, Pressable, Image} from 'react-native';
import React from 'react';

export default function RecentlyPlayedCard() {
  return (
    <Pressable>
      <Image
        source={{uri: 'https://picsum.photos/200/300'}}
        style={{width: 130, height: 130, borderRadius: 5}}
      />
      <Text
        style={{
          color: 'white',
          fontSize: 13,
          fontWeight: '500',
          marginTop: 10,
        }}>
        Name
      </Text>
    </Pressable>
  );
}
