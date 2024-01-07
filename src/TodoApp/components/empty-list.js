import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../utils/constants';

const styles = StyleSheet.create({
	container: {
		gap: 8,
	},
	text: {
		color: COLORS.white,
		fontSize: 24,
		fontWeight: 'bold',
		alignSelf: 'center',
	},
	description: {
		color: COLORS.white,
		fontSize: 16,
		alignSelf: 'center',
	},
});

export const EmptyTodoList = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>No Todo found</Text>
			<Text style={styles.description}>
				Start adding to track your things to do.
			</Text>
		</View>
	);
};

export default EmptyTodoList;
