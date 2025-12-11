import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface ButtonProps {
	title: string;
	onPress: () => void;
	disabled?: boolean;
}

export function Button(props: ButtonProps) {
	const { title, onPress, disabled } = props;
	return (
		<TouchableOpacity
			onPress={onPress}
			disabled={disabled}
			style={[styles.btn, disabled && { opacity: 0.6 }]}
		>
			<Text style={styles.text}>{title}</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	btn: {
		padding: 12,
		borderRadius: 8,
		backgroundColor: '#0066ff',
		alignItems: 'center',
		marginTop: 12,
	},
	text: { color: '#fff', fontWeight: '600' },
});
