import React, { useState } from 'react';
import { View, Button, Image, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

export default function ImageUploader() {
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<string>('');

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      uploadImage(result.uri);
    }
  };

  const uploadImage = async (uri: string) => {
    const formData = new FormData();
    formData.append('file', {
      uri,
      name: 'animal.jpg',
      type: 'image/jpeg',
    } as unknown as Blob);

    try {
      const response = await axios.post('http://YOUR_PC_IP:5000/predict', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResult(response.data.animal_disease + '\n' + response.data.medicine);
    } catch (error: any) {
      setResult('Error uploading image: ' + error.message);
    }
  };

  return (
    <View style={{ margin: 10 }}>
      <Button title="Pick Animal Image" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 250, height: 250, marginTop: 10 }} />}
      <Text style={{ marginTop: 10 }}>{result}</Text>
    </View>
  );
}

