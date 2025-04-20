import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Facebook, Google, Mobile, Spotify} from 'iconsax-react-native';

const LoginScreen = () => {
  return (
    <LinearGradient colors={['#040306', '#131624']} style={{flex: 1}}>
      <SafeAreaView>
        <View style={{height: 80}} />
        <View style={{alignItems: 'center'}}>
          <Spotify size="80" color="white" variant="Bold" />
        </View>
        <Text style={styles.loginTitle}>
          Millions of Songs Free on Spofify!
        </Text>

        <View style={{height: 80}} />
        <Pressable style={styles.loginButton}>
          <Text>Sign In with Spotift</Text>
        </Pressable>
        <Pressable style={styles.phoneButton}>
          <Mobile size="24" color="white" />
          <Text style={styles.phoneButtonText}>Continue with phone number</Text>
        </Pressable>
        <Pressable style={styles.phoneButton}>
          <Google size="24" color="white" variant="Bold" />

          <Text style={styles.phoneButtonText}>Continue with Google</Text>
        </Pressable>

        <Pressable style={styles.phoneButton}>
          <Facebook size="24" color="white" />
          <Text style={styles.phoneButtonText}>Continue with Facebook</Text>
        </Pressable>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  loginTitle: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 40,
  },
  loginButton: {
    backgroundColor: '#1DB954',
    padding: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 25,
  },
  phoneButton: {
    backgroundColor: '#131624',
    padding: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    flexDirection: 'row',
    marginVertical: 10,
    borderWidth: 0.8,
    borderColor: '#C0C0C0',
    width: 300,
    borderRadius: 25,
    alignItems: 'center',
  },
  phoneButtonText: {
    color: 'white',
    textAlign: 'center',
    flex: 1,
  },
});
