import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Platform, StyleSheet, Image, ImageProps, TextInput, TouchableOpacity, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { Button } from 'react-native-paper';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';

export default function ProfileScreen({navigation, route}: RootStackScreenProps<'Profile'>) {
  const { userName, userAge, userGender } = route.params;

  const [isLightTheme, setIsLightTheme] = useState<boolean>(true),
    [isValidName, setIsValidName] = useState<boolean>(false),
    [name, setName] = useState<string>(userName),
    [isChangeName, setIsChangeName] = useState<boolean>(false);

  useEffect(() => {
    setIsValidName(name.length > 2)

    name.split('').forEach((v) => {
      if(v.charCodeAt(0) < 65 || v.charCodeAt(0) > 122) setIsValidName(false)
    })
  }, [name])

  return (
    <View style={ isLightTheme ? styles.container : styles.containerDark}>
      <Image source={require('../assets/images/userImage.jpg')} 
        style={{ width: 100, height: 100, borderRadius: 100, marginTop: 30 }} />

      <View style={isLightTheme ? undefined : styles.darkBackground}>
        <Text style={!isChangeName ? (isLightTheme ? styles.title : styles.titleDark) : styles.hidden}>
          {name}
        </Text>

        
      <TextInput style={ isChangeName ? styles.input : styles.hidden } placeholder="Введите имя" value={name}
        onChange={(text: NativeSyntheticEvent<TextInputChangeEventData>) => 
          setName(text.nativeEvent.text)} />

        <Button
          onPress={() => {
            setIsChangeName(!isChangeName)
          }}
          disabled={!isValidName}
          style={!isValidName ? styles.buttonDisabled : styles.button}>
          <Text style={{ fontSize: 20, color: '#fff' }}>Сменить имя</Text>
        </Button>

        <Button
          onPress={() => {
            setIsLightTheme(!isLightTheme)
          }}
          style={styles.button}>
          <Text style={{ fontSize: 20, color: '#fff' }}>Сменить фон</Text>
        </Button>
      </View>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    display: 'flex',
    flexDirection: 'row',
  },
  containerDark: {
    backgroundColor: '#111',
    flex: 1,
    justifyContent: 'space-around',
    display: 'flex',
    flexDirection: 'row',
  },
  darkBackground: {
    backgroundColor: '#111',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
  },
  titleDark: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
    color: 'white',
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
    backgroundColor: 'white',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#194bff',
  },
  hidden: {
    display: 'none',
  },
  buttonDisabled: {
    marginTop: 10,
    backgroundColor: '#757575',
  },
  error: {
    paddingTop: 10,
    color: 'red',
  }
});
