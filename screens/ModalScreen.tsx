import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Image, ImageProps, TextInput, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function ModalScreen({navigation, route}: RootTabScreenProps<'TabOne'>) {

  const { userName, userAge, userGender } = route.params;
  const name: string = userName.nativeEvent.text;
  console.log(route, name);

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Modal</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/ModalScreen.tsx" /> */}

      
      <Text style={styles.title}>Здравствуйте, {name}</Text>
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

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
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
