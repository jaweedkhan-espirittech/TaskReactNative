import { Button, ImageSelector, TextField } from '@/components';
import { supabase } from '@/lib';
import { getBlobFromUri } from '@/utils';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { v4 as uuidv4 } from 'uuid';

export default function CreateMemory() {
	const router = useRouter();
	const [title, setTitle] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [imageUri, setImageUri] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);

	async function handleUpload() {
		if (!imageUri) return Alert.alert('Please select an image');
		if (!title.trim()) return Alert.alert('Please enter a title');

		setLoading(true);
		try {
			const blob: string | Blob | null = await getBlobFromUri(imageUri);

			const id = uuidv4();
			const ext = imageUri.split('.').pop()?.split('?')[0] || 'jpg';
			const filePath = `memories/${id}.${ext}`;

			const { error: uploadError } = await supabase.storage
				.from('memories')
				.upload(filePath, blob, { cacheControl: '3600', upsert: false });

			if (uploadError) throw uploadError;

			const { data: publicData } = await supabase.storage
				.from('memories')
				.getPublicUrl(filePath);
			const publicUrl = publicData.publicUrl;

			const { error: insertError } = await supabase.from('memories').insert([
				{
					id,
					title: title.trim(),
					description: description.trim() || null,
					image_url: publicUrl,
					created_at: new Date().toISOString(),
				},
			]);

			if (insertError) throw insertError;

			router.push({ pathname: '/confirmation', params: { image: publicUrl } });
		} catch (e) {
			console.error('Upload error', e);
			Alert.alert('Upload failed', (e as Error).message || String(e));
		} finally {
			setLoading(false);
		}
	}

	return (
		<View style={styles.container}>
			<Text style={styles.header}>Create Memory</Text>
			<ImageSelector imageUri={imageUri} onImageSelected={setImageUri} />

			<TextField value={title} onChange={setTitle} placeholder="Title" />
			<TextField
				value={description}
				onChange={setDescription}
				placeholder="Description"
				multiline
			/>

			<Button
				title={loading ? 'Uploading...' : 'Upload'}
				onPress={handleUpload}
				disabled={loading}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, padding: 16 },
	header: { fontSize: 24, fontWeight: '700', marginBottom: 12 },
});
