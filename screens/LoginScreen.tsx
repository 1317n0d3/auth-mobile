import { useState } from 'react';
import { NativeSyntheticEvent, StyleSheet, TextInput, TextInputChangeEventData } from 'react-native';
import { Button, RadioButton } from 'react-native-paper';

import { Text, View } from '../components/Themed';

export default function LoginScreen(props: any) {
  const [userGender, setUserGender] = useState<string>('male'),
    [userName, setUserName] = useState<string>(),
    [userAge, setUserAge] = useState<string>();

  return (
    <View style={styles.container}>
      <Text>Ввведите ваше имя:</Text>
      <TextInput style={ styles.input } placeholder="input name"
        onChange={(text: NativeSyntheticEvent<TextInputChangeEventData>) => setUserName(text.nativeEvent.text)} />
      <Text>Введите ваш возраст:</Text>
      <TextInput style={ styles.input } placeholder="input age"
        keyboardType="numeric"
        onChange={(text: NativeSyntheticEvent<TextInputChangeEventData>) => setUserAge(text.nativeEvent.text)} />
      <Text>Выберите пол:</Text>
      <Text>Мужской</Text>
      <RadioButton
        value="male"
        status={ userGender === 'male' ? 'checked' : 'unchecked' }
        onPress={() => setUserGender('male')}
      />
      <Text>Женский</Text>
      <RadioButton
        value="female"
        status={ userGender === 'female' ? 'checked' : 'unchecked' }
        onPress={() => setUserGender('female')}
      />
      <Button
        onPress={() => {
          props.navigation.navigate('Root', { userName, userAge, userGender })
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
