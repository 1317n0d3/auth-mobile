import { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { Button, RadioButton } from 'react-native-paper';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function Login({ navigation }: RootTabScreenProps<'Login'>) {
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
        value="male"
        status={ checked === 'first' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('first')}
      />
      <Text>Женский</Text>
      <RadioButton
        value="female"
        status={ checked === 'second' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('second')}
      />
      <Button
        onPress={() => {
          navigation.navigate('Root')
        }}
        style={{ backgroundColor: 'blue' }}>
        <Text style={{ fontSize: 20, color: '#fff' }}>Войти</Text>
      </Button>
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
    color: 'white',
    borderColor: 'white',
  },
});
