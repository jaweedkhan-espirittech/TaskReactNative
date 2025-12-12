import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function Confirmation() {
	const { image } = useLocalSearchParams();
	console.log(image);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Memory created successfully!</Text>
			{image ? (
				<Image source={{ uri: String(image) }} style={styles.image} />
			) : null}
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, padding: 16, alignItems: 'center' },
	title: { fontSize: 20, fontWeight: '700', marginVertical: 20 },
	image: { width: '100%', height: 300, borderRadius: 8 },
});
