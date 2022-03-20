import { useState } from 'react';
import { Image, ImageProps, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function NewsScreen({ navigation, route }: RootTabScreenProps<'News'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Здравствуйте</Text>
      <Image source={require('../assets/images/userImage.jpg')} style={{ width: 100, height: 100, borderRadius: 100 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
