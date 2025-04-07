import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  useEffect(() => {
    console.log('✅ WelcomeScreen Yüklendi');
  }, []);

  const handlePress = () => {
    console.log('👆 Gardıroba Git butonuna basıldı');
    navigation.navigate('Wardrobe');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Lina Style!</Text>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Gardıroba Git</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  button: { backgroundColor: '#FF69B4', padding: 15, borderRadius: 10 },
  buttonText: { color: '#fff', fontSize: 16 }
});
