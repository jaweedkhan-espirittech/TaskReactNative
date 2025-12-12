export async function uriToUint8Array(uri: string): Promise<Uint8Array> {
	try {
		// For Expo ImagePicker or local files, fetch works
		const response = await fetch(uri);
		const arrayBuffer = await response.arrayBuffer();
		return new Uint8Array(arrayBuffer);
	} catch (error) {
		console.error('uriToUint8Array error', error);
		throw error;
	}
}
