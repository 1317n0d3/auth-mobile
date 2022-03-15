import { useState } from 'react';
import { NativeSyntheticEvent, StyleSheet, TextInput, TextInputChangeEventData } from 'react-native';
import { Button, RadioButton } from 'react-native-paper';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function Login(props: any) {
  const [checked, setChecked] = useState('first'),
    [userName, setUserName] = useState(),
    [userAge, setUserAge] = useState(0);

  return (
    <View style={styles.container}>
      <Text>Ввведите ваше имя:</Text>
      <TextInput style={ styles.input } placeholder="input name"
        /*onChange={(text: NativeSyntheticEvent<TextInputChangeEventData>) => setUserName()}*/ />
      <Text>Введите ваш возраст:</Text>
      <TextInput style={ styles.input } placeholder="input age"
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
          props.navigation.navigate('Root')
        }}
        style={{ backgroundColor: 'blue' }}>
        <Text style={{ fontSize: 20, color: '#fff' }}>Войти</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
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
