
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

export default function AddItemScreen({ navigation }) {
  const [itemType, setItemType] = useState('üst');
  const [itemName, setItemName] = useState('');
  const [image, setImage] = useState(null);
  const [color, setColor] = useState('');
  const [season, setSeason] = useState('');
  const [category, setCategory] = useState('');

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert('Galeriye erişim izni gerekli.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      alert('Kamera izni gerekli.');
      return;
    }
    const result = await ImagePicker.launchCameraAsync();
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleAdd = async () => {
    if (!itemName) {
      alert('Lütfen bir isim girin.');
      return;
    }

    const newItem = { type: itemType, name: itemName, image, color, season, category };
    const key = itemType === 'takı' ? 'accessories' : 'clothes';

    try {
      const stored = await AsyncStorage.getItem(key);
      const parsed = stored ? JSON.parse(stored) : [];
      parsed.push(newItem);
      await AsyncStorage.setItem(key, JSON.stringify(parsed));
    } catch (error) {
      console.error('Ekleme hatası:', error);
    }

    alert(`${itemType} eşyası "${itemName}" eklendi.`);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Yeni Kıyafet/Takı Ekle</Text>

      <TextInput style={styles.input} placeholder="Tür (üst / alt / takı)" value={itemType} onChangeText={setItemType} />
      <TextInput style={styles.input} placeholder="İsim" value={itemName} onChangeText={setItemName} />
      <TextInput style={styles.input} placeholder="Renk" value={color} onChangeText={setColor} />
      <TextInput style={styles.input} placeholder="Mevsim" value={season} onChangeText={setSeason} />
      <TextInput style={styles.input} placeholder="Kategori" value={category} onChangeText={setCategory} />

      {image && <Image source={{ uri: image }} style={styles.imagePreview} />}

      <TouchableOpacity style={styles.secondaryButton} onPress={pickImage}>
        <Text>📁 Galeriden Seç</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryButton} onPress={takePhoto}>
        <Text>📷 Kamera ile Çek</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleAdd}>
        <Text style={styles.buttonText}>Ekle</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 10, padding: 10, marginBottom: 10 },
  imagePreview: { width: '100%', height: 200, marginBottom: 15, borderRadius: 10 },
  secondaryButton: { padding: 10, backgroundColor: '#eee', borderRadius: 10, alignItems: 'center', marginBottom: 10 },
  button: { backgroundColor: '#FF69B4', padding: 15, borderRadius: 25, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' }
});
