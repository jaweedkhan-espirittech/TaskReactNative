export async function getBlobFromUri(uri: string): Promise<Blob | null> {
	try {
		const response = await fetch(uri);

		if (!response.ok) {
			return null;
		}

		return await response.blob();
	} catch (error) {
		console.error('Error in getBlobFromUri:', error);
		return null;
	}
}
