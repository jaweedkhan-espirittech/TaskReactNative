import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

interface TextFieldProps {
	value: string;
	onChange: (v: string) => void;
	placeholder?: string;
	multiline?: boolean;
}

export function TextField(props: TextFieldProps) {
	const { value, onChange, placeholder, multiline } = props;
	return (
		<TextInput
			value={value}
			onChangeText={onChange}
			placeholder={placeholder}
			multiline={multiline}
			style={[styles.input, multiline && { height: 100 }]}
		/>
	);
}

const styles = StyleSheet.create({
	input: {
		width: '100%',
		borderWidth: 1,
		borderRadius: 8,
		padding: 10,
		marginVertical: 8,
		textAlignVertical: 'top',
	},
});
