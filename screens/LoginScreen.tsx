import { useEffect, useState } from 'react';
import { NativeSyntheticEvent, StyleSheet, TextInput, TextInputChangeEventData } from 'react-native';
import { Button, RadioButton } from 'react-native-paper';

import { Text, View } from '../components/Themed';

export default function LoginScreen(props: any) {
  const [userGender, setUserGender] = useState<string>('male'),
    [userName, setUserName] = useState<string>(''),
    [userAge, setUserAge] = useState<number>(0),
    [isValidName, setIsValidName] = useState<boolean>(false),
    [isValidAge, setIsValidAge] = useState<boolean>(false);

  useEffect(() => {
    setIsValidName(userName.length > 2)
    setIsValidAge(userAge > 6 && userAge < 100)

    userName.split('').forEach((v) => {
      if(v.charCodeAt(0) < 65 || v.charCodeAt(0) > 122) setIsValidName(false)
    })
  }, [userAge, userName])

  function isInvalid(): boolean {return !(isValidAge && isValidName)}

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ввведите ваше имя:</Text>
      <TextInput style={ styles.input } placeholder="Введите имя"
        onChange={(text: NativeSyntheticEvent<TextInputChangeEventData>) => 
          setUserName(text.nativeEvent.text)} />
      <Text style={styles.title}>Введите ваш возраст:</Text>
      <TextInput style={ styles.input } placeholder="Введите возраст"
        keyboardType="numeric"
        onChange={(text: NativeSyntheticEvent<TextInputChangeEventData>) => 
          setUserAge(+text.nativeEvent.text)} />
      <Text style={styles.title}>Выберите пол:</Text>
      <RadioButton.Item
        label='Мужской'
        color='#194bff'
        value="male"
        status={ userGender === 'male' ? 'checked' : 'unchecked' }
        onPress={() => {
          setUserGender('male')
        }}
      />
      <RadioButton.Item
        label='Женский'
        color='#194bff'
        value="female"
        status={ userGender === 'female' ? 'checked' : 'unchecked' }
        onPress={() => setUserGender('female')}
      />
      <Button
        onPress={() => {
          props.navigation.navigate('Root', { userName, userAge, userGender })          
        }}
        disabled={isInvalid()}
        style={isInvalid() ? styles.buttonDisabled : styles.button}>
        <Text style={{ fontSize: 20, color: '#fff' }}>Войти</Text>
      </Button>
      <Text style={isValidName ? styles.hidden : styles.error}>Имя должно быть длиннее 2х символов без использования ". , ; : -" и тд.</Text>
      <Text style={isValidAge ? styles.hidden : styles.error}>Возраст должен быть больше 6 и меньше 100 лет.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    padding: 10,
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
  button: {
    marginTop: 10,
    backgroundColor: '#194bff',
  },
  buttonDisabled: {
    marginTop: 10,
    backgroundColor: '#757575',
  },
  hidden: {
    display: 'none',
  },
  error: {
    paddingTop: 10,
    color: 'red',
  }
});
