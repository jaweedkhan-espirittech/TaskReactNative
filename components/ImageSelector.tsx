import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ImageSelectorProps {
	imageUri?: string | null;
	onImageSelected: (uri: string | null) => void;
}

export function ImageSelector(props: ImageSelectorProps) {
	const { imageUri, onImageSelected } = props;

	//  The following logic is implemented to fetch an image from the device’s gallery.
	async function pickImage() {
		try {
			// The app will ask for permission, and afterward, it will open the gallery for the first time.
			const permission =
				await ImagePicker.requestMediaLibraryPermissionsAsync();
			if (!permission.granted)
				return alert('Permission required to access photos');

			const result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ['images'],
				quality: 0.7,
				allowsEditing: true,
			});

			if (!result.canceled && result.assets?.length) {
				onImageSelected(result.assets[0].uri || null);
			}
		} catch (e) {
			console.error('pickImage error', e);
			alert('Error selecting image');
		}
	}

	return (
		<View style={styles.container}>
			{imageUri ? (
				<TouchableOpacity onPress={() => onImageSelected(null)}>
					<Image source={{ uri: imageUri }} style={styles.image} />
					<Text style={styles.small}>Tap image to remove</Text>
				</TouchableOpacity>
			) : (
				<TouchableOpacity onPress={pickImage} style={styles.placeholder}>
					<Text>Select an image</Text>
				</TouchableOpacity>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: { marginVertical: 12 },
	image: { width: '100%', height: 220, borderRadius: 8 },
	placeholder: {
		height: 220,
		borderRadius: 8,
		borderWidth: 1,
		borderStyle: 'dashed',
		alignItems: 'center',
		justifyContent: 'center',
	},
	small: { textAlign: 'center', marginTop: 6, color: '#666' },
});
