import { useState } from 'react';
import { Image, ImageProps, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function NewsScreen({ navigation, route }: RootTabScreenProps<'News'>) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.newsCard}>
        <Image source={{ uri: 'https://resize.indiatvnews.com/en/resize/newbucket/715_-/2021/04/breaking-1618535752.jpg' }} style={ styles.image } />
        <Text style={styles.title}>
          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
        </Text>
      </View>
      
      <View style={styles.newsCard}>
        <Image source={{ uri: 'https://resize.indiatvnews.com/en/resize/newbucket/715_-/2021/04/breaking-1618535752.jpg' }} style={ styles.image } />
        <Text style={styles.title}>
          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
        </Text>
      </View>
      
      <View style={styles.newsCard}>
        <Image source={{ uri: 'https://resize.indiatvnews.com/en/resize/newbucket/715_-/2021/04/breaking-1618535752.jpg' }} style={ styles.image } />
        <Text style={styles.title}>
          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
        </Text>
      </View>
      
      <View style={styles.newsCard}>
        <Image source={{ uri: 'https://resize.indiatvnews.com/en/resize/newbucket/715_-/2021/04/breaking-1618535752.jpg' }} style={ styles.image } />
        <Text style={styles.title}>
          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
        </Text>
      </View>
      
      <View style={styles.newsCard}>
        <Image source={{ uri: 'https://resize.indiatvnews.com/en/resize/newbucket/715_-/2021/04/breaking-1618535752.jpg' }} style={ styles.image } />
        <Text style={styles.title}>
          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
        </Text>
      </View>
      
      <View style={styles.newsCard}>
        <Image source={{ uri: 'https://resize.indiatvnews.com/en/resize/newbucket/715_-/2021/04/breaking-1618535752.jpg' }} style={ styles.image } />
        <Text style={styles.title}>
          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
        </Text>
      </View>
      
      <View style={styles.newsCard}>
        <Image source={{ uri: 'https://resize.indiatvnews.com/en/resize/newbucket/715_-/2021/04/breaking-1618535752.jpg' }} style={ styles.image } />
        <Text style={styles.title}>
          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
        </Text>
      </View>
      
      <View style={styles.newsCard}>
        <Image source={{ uri: 'https://resize.indiatvnews.com/en/resize/newbucket/715_-/2021/04/breaking-1618535752.jpg' }} style={ styles.image } />
        <Text style={styles.title}>
          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
        </Text>
      </View>
      
      <View style={styles.newsCard}>
        <Image source={{ uri: 'https://resize.indiatvnews.com/en/resize/newbucket/715_-/2021/04/breaking-1618535752.jpg' }} style={ styles.image } />
        <Text style={styles.title}>
          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  newsCard: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderColor: 'black',
    borderWidth: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'normal',
    width: 250,
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
  image: {
    width: 100,
    height: 100,
  },
});
