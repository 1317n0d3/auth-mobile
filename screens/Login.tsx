import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { RadioButton } from 'react-native-paper';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function Login(props: any) {
  const [checked, setChecked] = useState('first');

  return (
    <View style={styles.container}>
      <Text>Ввведите ваше имя:</Text>
      <TextInput placeholder="useless placeholder"
        keyboardType="numeric" />
      <Text>Введите ваш возраст:</Text>
      <TextInput placeholder="useless placeholder"
        keyboardType="numeric" />
      <Text>Выберите пол:</Text>
      <Text>Мужской</Text>
      <RadioButton
        value="first"
        status={ checked === 'first' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('first')}
      />
      <Text>Женский</Text>
      <RadioButton
        value="second"
        status={ checked === 'second' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('second')}
      />
      <TouchableOpacity
        onPress={() => props.navigation.navigate('Root')}
        style={{ backgroundColor: 'blue' }}>
        <Text style={{ fontSize: 20, color: '#fff' }}>Войти</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
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
