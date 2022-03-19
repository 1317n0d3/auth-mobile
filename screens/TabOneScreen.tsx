import { useState } from 'react';
import { Image, ImageProps, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function TabOneScreen({ navigation, route }: RootTabScreenProps<'TabOne'>) {

  const { userName, userAge, userGender } = route.params;

  console.log(route);
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Здравствуйте, {userName}</Text>
      <Image source={require('../assets/images/userImage.jpg')} style={{ width: 100, height: 100, borderRadius: 100 }} />
      <Button
        onPress={() => alert('message')}
        style={{ backgroundColor: 'blue' }}>
        <Text style={{ fontSize: 20, color: '#fff' }}>Сменить фон</Text>
      </Button>
      <Button
        onPress={() => alert('message')}
        style={{ backgroundColor: 'blue' }}>
        <Text style={{ fontSize: 20, color: '#fff' }}>Сменить имя</Text>
      </Button>
      <Button
        onPress={() => alert('message')}
        style={{ backgroundColor: 'blue' }}>
        <Text style={{ fontSize: 20, color: '#fff' }}>Перейти</Text>
      </Button>
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
